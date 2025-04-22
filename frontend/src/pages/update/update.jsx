import React, { useState, useEffect } from "react";
import { Credits } from "../../App";

function LocationTable() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const fetchData = async () => {
    const url = "http://localhost:8080/api/locations";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      setLocations(data);
    } catch (err) {
      console.error('Error fetching locations:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredLocations = locations
    .filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

  const handleLocationClick = (locationId) => {
    setSelectedLocationId((prevId) =>
      prevId === locationId ? null : locationId
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "0.625em" }}
      />
      <table className="remove-table" style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Location Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map((location) => (
            <React.Fragment key={location.id}>
              <tr
                onClick={() => handleLocationClick(location.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{location.name}</td>
              </tr>
              {selectedLocationId === location.id && (
                <tr>
                  <td colSpan="1">
                    <UpdateForm
                      location={location}
                      onUpdateComplete={fetchData}
                      onClose={() => setSelectedLocationId(null)}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UpdateForm({ location, onUpdateComplete, onClose }) {
  // Initialize state, ensuring episodes is an object and seasons is an array
  const [updatedLocation, setUpdatedLocation] = useState({
    ...location,
    episodes: location?.episodes && typeof location.episodes === 'object' && !Array.isArray(location.episodes) ? location.episodes : {},
    seasons: Array.isArray(location?.seasons) ? location.seasons : [],
    biography: location?.biography || '',
    name: location?.name || '',
    address: location?.address || '',
    latitude: location?.latitude || '',
    longitude: location?.longitude || '',
    image: location?.image || '',
  });

  const [newEpisodeKey, setNewEpisodeKey] = useState('');
  const [newEpisodeValue, setNewEpisodeValue] = useState('');


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
     setUpdatedLocation({
        ...updatedLocation,
        [name]: value,
     });
     setUpdateError(null);
  };

  const handleAddEpisode = () => {
    if (!newEpisodeKey.trim()) {
      setUpdateError("Episode key cannot be empty.");
      return;
    }

  
    setUpdatedLocation(prevState => ({
      ...prevState,
      episodes: {
        ...prevState.episodes,
        [newEpisodeKey.trim()]: newEpisodeValue.trim()
      }
    }));

    setNewEpisodeKey('');
    setNewEpisodeValue('');
    setUpdateError(null);
  };

   const handleRemoveEpisode = (keyToRemove) => {
       setUpdatedLocation(prevState => {
           const updatedEpisodes = { ...prevState.episodes };
           delete updatedEpisodes[keyToRemove];
           return {
               ...prevState,
               episodes: updatedEpisodes
           };
       });
       setUpdateError(null);
   };


  const handleUpdateSeason = (seasonNumber) => {
    const currentSeasons = Array.isArray(updatedLocation.seasons) ? updatedLocation.seasons : [];

    const newSeasons = currentSeasons.includes(seasonNumber)
      ? currentSeasons.filter((s) => s !== seasonNumber)
      : [...currentSeasons, seasonNumber];

    setUpdatedLocation({ ...updatedLocation, seasons: newSeasons });
    setUpdateError(null);
  };


  const handleUpdateSubmit = async () => {
    setIsSubmitting(true);
    setUpdateError(null);

    if (typeof updatedLocation.episodes !== 'object' || updatedLocation.episodes === null || Array.isArray(updatedLocation.episodes)) {
       setUpdateError("Invalid episodes data structure.");
       setIsSubmitting(false);
       return;
    }
     if (!Array.isArray(updatedLocation.seasons)) {
       setUpdateError("Invalid seasons data structure.");
       setIsSubmitting(false);
       return;
    }

    const biographyCleaned = updatedLocation.biography.replace(/\s+/g, " ").trim();

    try {
      const response = await fetch(
        `http://localhost:8080/api/locations/${location.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
             ...updatedLocation,
             biography: biographyCleaned, // Use cleaned biography
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
         // Prefer the backend's error message if available
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData?.error || errorData?.message || "Failed to update location"
          }`
        );
      }
      // Assuming successful update, refetch data and close form
      onUpdateComplete();
      onClose();
    } catch (error) {
      console.error("Error updating location:", error);
      setUpdateError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  // Ensure updatedLocation is not null before rendering the form (should not happen with useState initializer)
  if (!updatedLocation) {
      return <div>Loading update form...</div>;
  }

  return (
    <div
      style={{ border: "1px solid red", padding: "10px", marginTop: "10px" }}
    >
      <h2>Update Location</h2>
      {updateError && <p style={{ color: "red" }}>{updateError}</p>}

      <div className="location-update-section">
        <label className="location-headers">Name:</label>
        <input
          type="text"
          name="name"
          value={updatedLocation.name}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div className="location-update-section">
        <label className="location-headers">Address:</label>
        <input
          type="text"
          name="address"
          value={updatedLocation.address}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div className="location-update-section">
        <label className="location-headers">Latitude:</label>
        <input
          type="text"
          name="latitude"
          value={updatedLocation.latitude}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div className="location-update-section">
        <label className="location-headers">Longitude:</label>
        <input
          type="text"
          name="longitude"
          value={updatedLocation.longitude}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div className="location-update-section">
        <label className="location-headers">Image:</label>
        <input
          type="text"
          name="image"
          value={updatedLocation.image}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div className="location-update-section">
        <label className="location-headers">Biography:</label>
        <textarea
          name="biography"
          value={updatedLocation.biography}
          onChange={handleInputChange}
          rows={5}
          cols={50}
          style={{ width: "100%", boxSizing: "border-box" }}
        />
      </div>
      <br />

      <div className="location-update-section">
        <label className="location-headers">Episodes:</label>
        <div style={{ border: "1px dashed #ccc", padding: "10px", marginBottom: "10px" }}>
           {Object.keys(updatedLocation.episodes).length > 0 ? (
               <ul>
                   {Object.entries(updatedLocation.episodes).map(([key, value]) => (
                       <li key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                           <span><strong>{key}:</strong> {value}</span>
                           <button onClick={() => handleRemoveEpisode(key)} style={{ marginLeft: '10px', cursor: 'pointer' }}>Remove</button>
                       </li>
                   ))}
               </ul>
           ) : (
               <p>No episodes added yet.</p>
           )}
        </div>
        <div className="location-update-section">
            <label className="location-headers">New Episode:</label>
            <input
                type="text"
                value={newEpisodeKey}
                onChange={(e) => setNewEpisodeKey(e.target.value)}
                placeholder="Italian Ice (2.16)"
            />
            <br />
             <label className="location-headers">New Link:</label>
            <input
                type="text"
                value={newEpisodeValue}
                onChange={(e) => setNewEpisodeValue(e.target.value)}
                placeholder="https://magnum-mania.com/Episodes/Season2/Italian_Ice.html"
            />
            <br />
        </div>
      </div>
        <button onClick={handleAddEpisode}>Add Episode</button>
      <br />
      <br />
      <div className="location-update-section">
        <label className="location-headers">Seasons:</label>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((season) => {
            const isChecked = (Array.isArray(updatedLocation.seasons) ? updatedLocation.seasons : []).includes(season);
            return (
              <div
                key={season}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                  marginBottom: "5px",
                }}
              >
                <input
                  type="checkbox"
                  id={`season-${season}`}
                  checked={isChecked}
                  onChange={() => handleUpdateSeason(season)}
                />
                <label htmlFor={`season-${season}`}>Season {season}</label>
              </div>
            );
          })}
        </div>
      </div>
      <br />

      <button onClick={handleUpdateSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Update"}
      </button>
      &nbsp;&nbsp;
      <button onClick={onClose}>Cancel</button>
      <br />
      <br />
    </div>
  );
}

function Update() {
  return (
    <>
      <Credits />
      <LocationTable />
    </>
  );
}

export default Update;
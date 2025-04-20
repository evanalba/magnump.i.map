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
      console.error(err.message);
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
            <>
              <tr
                key={location.id}
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
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UpdateForm({ location, onUpdateComplete, onClose }) {
  const [updatedLocation, setUpdatedLocation] = useState({ ...location });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "episodes" || name === "seasons") {
      try {
        newValue = JSON.parse(value);
      } catch (parseError) {
        setUpdateError(
          `Invalid ${name} format.  Must be a valid JSON array (e.g., [1,2,3] or ["a","b"]).`
        );
        return;
      }
    }
    setUpdatedLocation({
      ...updatedLocation,
      [name]: newValue,
    });
    setUpdateError(null);
  };

  const handleUpdateSeason = (seasonNumber) => {
    const newSeasons = updatedLocation.seasons.includes(seasonNumber)
      ? updatedLocation.seasons.filter((s) => s !== seasonNumber)
      : [...updatedLocation.seasons, seasonNumber];

    setUpdatedLocation({ ...updatedLocation, seasons: newSeasons });
  };

  const handleUpdateSubmit = async () => {
    setIsSubmitting(true);
    setUpdateError(null);
    try {
      const response = await fetch(
        `http://localhost:8080/api/locations/${location.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLocation),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData?.message || "Failed to update location"
          }`
        );
      }
      onUpdateComplete();
      onClose();
    } catch (error) {
      console.error("Error updating location:", error);
      setUpdateError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (location) {
      updatedLocation.biography = updatedLocation.biography.replace(
        /\s+/g,
        " "
      );
      updatedLocation.biography = updatedLocation.biography.replace(/\n/g, " ");

      setUpdatedLocation({ ...updatedLocation });
    }
  }, [location]);

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
        <input
          type="text"
          name="episodes"
          value={JSON.stringify(updatedLocation.episodes)}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div className="location-update-section">
        <label className="location-headers">Seasons:</label>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((season) => {
            const isChecked = updatedLocation.seasons.includes(season);
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
        {/* <input
          type="text"
          name="seasons"
          value={JSON.stringify(updatedLocation.seasons)}
          onChange={handleInputChange}
        /> */}
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

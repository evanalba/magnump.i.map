import { Credits } from '../../App';
import React, { useState, useEffect } from 'react';

function LocationTable() {
  const [locations, setLocations] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (locations) {
      setFilteredLocations(
        locations.filter((location) =>
          location.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [locations, searchTerm]);

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/locations';
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
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/locations/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting location:', error);
      });
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all locations?')) {
      fetch('http://localhost:8080/api/locations', {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          fetchData();
        })
        .catch((error) => {
          console.error('Error deleting all locations:', error);
        });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (locations === null) {
    return <div>Loading...</div>;
  }

  let tableHTML;
  const displayLocations = filteredLocations || locations;

  if (Array.isArray(displayLocations)) {
    tableHTML = (
      <table className="remove-table">
        <thead>
          <tr>
            <th>Location Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {displayLocations.map((location) => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>
                <button
                  type="button"
                  className="delete-button"
                  data-location-id={location.id}
                  onClick={() => handleDelete(location.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (displayLocations && typeof displayLocations === 'object') {
    tableHTML = (
      <table className="remove-table">
        <thead>
          <tr>
            <th>Location Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr key={displayLocations.id}>
            <td>{displayLocations.name}</td>
            <td>
              <button
                type="button"
                className="delete-button"
                data-location-id={displayLocations.id}
                onClick={() => handleDelete(displayLocations.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    tableHTML = (
      <table className="remove-table">
        <tbody>
          <tr>
            <td colSpan="2">Error: Data is not in the expected format.</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div style={{ textAlign: 'center'}}>
      <input
        type="text"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '0.625em' }}
      />
      {tableHTML}
      <button
        onClick={handleDeleteAll}
        style={{ backgroundColor: 'red', color: 'white', marginTop: '1.25em', marginBottom: '1.25em' }}
      >
        Delete All Locations
      </button>
    </div>
  );
}

function Remove() {
  return (
    <>
      <LocationTable />
      <Credits />
    </>
  );
}

export default Remove;
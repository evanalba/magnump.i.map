import { useEffect, useState } from "react";
// import "../style.css";

export function Credits() {
  const [isCreditsVisible, setIsCreditsVisible] = useState(false);

  function closeItem() {
    setIsCreditsVisible(false);
  }

  function openItem() {
    setIsCreditsVisible(true);
  }

  return (
    <>
      <div className="crud-icons">
        <a href="/">
          <i className="fa-solid fa-house crud-icon" />
        </a>
        <a href="/html/add.html">
          <i className="fa-solid fa-circle-plus crud-icon" />
        </a>
        <a href="/html/update.html">
          <i className="fa-solid fa-circle-check crud-icon" />
        </a>
        <a href="/html/remove.html">
          <i className="fa-solid fa-circle-minus crud-icon" />
        </a>
        <i className="fa-solid fa-circle-info crud-icon" onClick={openItem} />
      </div>

      {isCreditsVisible == true && (
        <>
          <div className="credits-overlay" />
          <div className="credits-box">
            <div className="credits-head">
              <span className="credits-bold">
                <b>Credits</b>
              </span>
              <i
                className="fa-solid fa-circle-xmark close-credits"
                style={{ float: "right" }}
                onClick={closeItem}
              />
            </div>
            <p>
              This Magnum P.I. map was created by{" "}
              <a href="https://www.evanalba.com/">Evan Alba</a>. All the Magnum
              P.I. television series referenced here on this map are
              copyrighted. You can view the source code for this map{" "}
              <a href="https://github.com/evanalba/magnump.i.map">here</a>.
              Also, I would like to give credit to{" "}
              <a href="https://magnum-mania.com/">Magnum Mania</a> for helping
              me by providing the locations in Magnum P.I..
            </p>
          </div>
        </>
      )}
    </>
  );
}

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

function get_seasons_file_name(seasons) {
  let fileName = "";
  for (let i = 0; i < seasons.length; i++) {
    fileName += `_${seasons[i]}`;
  }
  return fileName;
}

function getSeasonIcon(seasons, location) {
  if (isSorted(seasons) === false) {
    seasons.sort();
  }

  let iconPath = "/images/markers/";
  if (seasons.length === 1) {
    iconPath += "single";
    return new LeafIcon({
      iconUrl: iconPath + "/season" + get_seasons_file_name(seasons) + ".png",
    });
  } else if (seasons.length === 2) {
    iconPath += "double";
    return new LeafIcon({
      iconUrl: iconPath + "/season" + get_seasons_file_name(seasons) + ".png",
    });
  } else if (seasons.length === 3) {
    iconPath += "triple";
    return new LeafIcon({
      iconUrl: iconPath + "/season" + get_seasons_file_name(seasons) + ".png",
    });
  } else if (seasons.length === 4) {
    iconPath += "quadruple";
    return new LeafIcon({
      iconUrl: iconPath + "/season" + get_seasons_file_name(seasons) + ".png",
    });
  } else if (seasons.length === 5) {
    iconPath += "quintuple";
    return new LeafIcon({
      iconUrl: iconPath + "/season" + get_seasons_file_name(seasons) + ".png",
    });
  } else if (seasons.length === 6) {
    iconPath += "sextuple";
    return new LeafIcon({
      iconUrl: iconPath + "/season" + get_seasons_file_name(seasons) + ".png",
    });
  } else if (seasons.length === 7) {
    iconPath += "septuple";
    return new LeafIcon({
      iconUrl: iconPath + "/season" + get_seasons_file_name(seasons) + ".png",
    });
  } else if (seasons.length === 8) {
    return new LeafIcon({
      iconUrl: "/images/markers/octuple/season_1_2_3_4_5_6_7_8.png",
    });
  } else {
    console.error(
      `ERROR: Your ${location.toUpperCase()} seasons icon is not valid. Make sure your seasons array has at least one valid season element.`
    );
    return new LeafIcon({ iconUrl: "/images/magnum-cross.png" });
  }
}

function SidePanel() {
  const [isLegendVisible, setIsLegendVisible] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [locations, setLocations] = useState([]); // State to store locations
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [clickDisabled, setClickDisabled] = useState(false); // State to track click delay

  useEffect(() => {
    // Fetch locations when the component mounts
    fetch("http://localhost:8080/api/locations")
      .then((response) => response.json())
      .then((data) => {
        const sortedLocations = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setLocations(sortedLocations); // Store the sorted data in state
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Filter locations based on searchQuery
    const filtered = locations.filter((location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchQuery, locations]); // Re-run when searchQuery or locations changes

  const toggleLegend = () => {
    if (isLegendVisible == false) {
      setIsLegendVisible(true);
    } else {
      setIsLegendVisible(false);
    }
  };

  const toggleSidePanel = () => {
    if (isSidePanelOpen == false) {
      setIsSidePanelOpen(true);
    } else {
      setIsSidePanelOpen(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  function getPlacePanelStyle(isLegendVisible) {
    let placePanelStyle = {};
    if (isLegendVisible) {
      placePanelStyle.marginTop = "6.25em";
    } else {
      placePanelStyle.marginTop = "0em";
    }
    return placePanelStyle;
  }

  function getLocationsPlaylistStyle(isLegendVisible) {
    let locationsPlaylistStyle = {};
    if (isLegendVisible) {
      locationsPlaylistStyle.top = "14.88em";
    } else {
      locationsPlaylistStyle.top = "8.64em";
    }
    return locationsPlaylistStyle;
  }

  const placePanelStyle = getPlacePanelStyle(isLegendVisible);
  const locationsPlaylistStyle = getLocationsPlaylistStyle(isLegendVisible);

  function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  }

  function get_seasons_file_name(seasons) {
    let fileName = "";
    for (let i = 0; i < seasons.length; i++) {
      fileName += `_${seasons[i]}`;
    }
    return fileName;
  }

  function getSeasonIcon(seasons, location) {
    if (isSorted(seasons) === false) {
      seasons.sort();
    }

    let iconPath = "images/markers/";
    if (seasons.length === 1) {
      iconPath += "single";
      return iconPath + "/season" + get_seasons_file_name(seasons) + ".png";
    } else if (seasons.length === 2) {
      iconPath += "double";
      return iconPath + "/season" + get_seasons_file_name(seasons) + ".png";
    } else if (seasons.length === 3) {
      iconPath += "triple";
      return iconPath + "/season" + get_seasons_file_name(seasons) + ".png";
    } else if (seasons.length === 4) {
      iconPath += "quadruple";
      return iconPath + "/season" + get_seasons_file_name(seasons) + ".png";
    } else if (seasons.length === 5) {
      iconPath += "quintuple";
      return iconPath + "/season" + get_seasons_file_name(seasons) + ".png";
    } else if (seasons.length === 6) {
      iconPath += "sextuple";
      return iconPath + "/season" + get_seasons_file_name(seasons) + ".png";
    } else if (seasons.length === 7) {
      iconPath += "septuple";
      return iconPath + "/season" + get_seasons_file_name(seasons) + ".png";
    } else if (seasons.length === 8) {
      iconPath += "octuple";
      return iconPath + "/season" + get_seasons_file_name(seasons) + ".png";
    }
    console.error(
      `ERROR: Your ${location.toUpperCase()} is not valid in your side panel.`
    );
    return "";
  }

  return (
    <>
      {isSidePanelOpen == true && (
        <div className="side-panel">
          <div className="side-panel-controls">
            <i
              className="fa-solid fa-sliders side-panel-sliders"
              onClick={toggleLegend}
            ></i>
            <i
              className="fa-solid fa-arrow-left side-panel-open"
              onClick={toggleSidePanel}
            ></i>
          </div>
          {isLegendVisible == true && (
            <div className="legend-panel">
              <table className="legend-table">
                <tbody>
                  <tr className="legend-row">
                    <td>
                      <img
                        src="../images/magnum-cross.png"
                        alt="Magnum P.I."
                        width="21"
                        height="25"
                      />
                    </td>
                    <th className="legend-header">Magnum P.I. Seasons</th>
                  </tr>
                  <tr className="legend-row">
                    <td>
                      <img
                        src="images/markers/single/season_1.png"
                        alt="Magnum P.I. Season 1 Marker"
                        width="21"
                        height="25"
                      />
                    </td>
                    <td className="legend-season">Season One</td>
                  </tr>
                  <tr className="legend-row">
                    <td>
                      <img
                        src="images/markers/single/season_2.png"
                        alt="Magnum P.I. Season 2 Marker"
                        width="21"
                        height="25"
                      />
                    </td>
                    <td className="legend-season">Season Two</td>
                  </tr>
                  <tr className="legend-row">
                    <td>
                      <img
                        src="images/markers/single/season_3.png"
                        alt="Magnum P.I. Season 3 Marker"
                        width="21"
                        height="25"
                      />
                    </td>
                    <td className="legend-season">Season Three</td>
                  </tr>
                  <tr className="legend-row">
                    <td>
                      <img
                        src="images/markers/single/season_4.png"
                        alt="Magnum P.I. Season 4 Marker"
                        width="21"
                        height="25"
                      />
                    </td>
                    <td className="legend-season">Season Four</td>
                  </tr>
                  <tr className="legend-row">
                    <td>
                      <img
                        src="images/markers/single/season_5.png"
                        alt="Magnum P.I. Season 5 Marker"
                        width="21"
                        height="25"
                      />
                    </td>
                    <td className="legend-season">Season Five</td>
                  </tr>
                  <tr className="legend-row">
                    <td>
                      <img
                        src="images/markers/single/season_6.png"
                        alt="Magnum P.I. Season 6 Marker"
                        width="21"
                        height="25"
                      />
                    </td>
                    <td className="legend-season">Season Six</td>
                  </tr>
                  <tr className="legend-row">
                    <td>
                      <img
                        src="images/markers/single/season_7.png"
                        alt="Magnum P.I. Season 7 Marker"
                        width="21"
                        height="25"
                      />
                    </td>
                    <td className="legend-season">Season Seven</td>
                  </tr>
                  <tr className="legend-row">
                    <td>
                      <img
                        src="images/markers/single/season_8.png"
                        alt="Magnum P.I. Season 8 Marker"
                        width="21"
                        height="25"
                      />
                    </td>
                    <td className="legend-season">Season Eight</td>
                  </tr>
                  <tr className="legend-row">
                    <td>
                      <img
                        src="images/markers/double/season_1_2.png"
                        alt="Magnum P.I. Marker of Seasons 1 and 2."
                        width="21"
                        height="25"
                      />
                    </td>
                    <td className="legend-season">
                      Example: Season 1 and Season 2
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className="place-panel" style={placePanelStyle}>
            <input
              className="places-search-box"
              type="text"
              placeholder="Search places list"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className="fa-solid fa-magnifying-glass places-search"></i>
          </div>
          <div className="locations-playlist" style={locationsPlaylistStyle}>
            <table className="locations-table">
              <tbody>
                {filteredLocations.map(
                  (
                    location // Use filteredLocations here
                  ) => (
                    <tr key={location.id} className="locations-row">
                      <td>
                        <img
                          src={getSeasonIcon(location.seasons, location.name)}
                          alt="Magnum P.I. Season 8 Marker"
                          width="21"
                          height="25"
                        />
                      </td>
                      <td
                        className="locations-name"
                        onClick={() => {
                          if (clickDisabled) {
                            return;
                          }

                          setClickDisabled(true);

                          map.flyTo({
                            lat: location.latitude,
                            lng: location.longitude,
                          });

                          map.eachLayer((layer) => {
                            if (
                              layer instanceof L.Marker &&
                              layer.getLatLng().lat === location.latitude &&
                              layer.getLatLng().lng === location.longitude
                            ) {
                              layer.openPopup();
                            }
                          });

                          // After flyTo completes, move the map up slightly.
                          setTimeout(() => {
                            const currentCenter = map.getCenter();
                            // console.log(currentCenter);
                            map.setView(
                              [currentCenter.lat + 0.05, currentCenter.lng],
                              map.getZoom()
                            ); // TMP: Helps adjust postion so it can show the marker header at least after I fly to a given marker's center postion.
                            setClickDisabled(false); // Re-enable clicks after the delay
                          }, 1500); // Match the flyTo duration or slightly longer
                        }}
                      >
                        {location.name}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isSidePanelOpen == false && (
        <i
          className="fa-solid fa-arrow-right side-panel-close"
          onClick={toggleSidePanel}
        ></i>
      )}
    </>
  );
}

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* credits box pop-up  */}
      <Credits />

      {/* side panel */}
      <SidePanel />
    </>
  );
}

export default App;

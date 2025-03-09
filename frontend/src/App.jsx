import { useState } from "react";
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
                style={{ float: 'right' }}
                onClick={closeItem}
              />
            </div>
            <p>
              This Magnum P.I. map was created by{' '}
              <a href="https://www.evanalba.com/">Evan Alba</a>. All the
              Magnum P.I. television series referenced here on this map are
              copyrighted. You can view the source code for this map{' '}
              <a href="https://github.com/evanalba/magnump.i.map">here</a>. Also,
              I would like to give credit to{' '}
              <a href="https://magnum-mania.com/">Magnum Mania</a> for helping
              me by providing the locations in Magnum P.I..
            </p>
          </div>
        </>
      )}
    </>
  );
}


function SidePanel() {
  const [isLegendVisible, setIsLegendVisible] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

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

  function getPlacePanelStyle(isLegendVisible) {
    let placePanelStyle = {};
    if (isLegendVisible) {
      placePanelStyle.marginTop = '6.25em';
    } else {
      placePanelStyle.marginTop = '0em';
    }
    return placePanelStyle;
  }
  
  function getLocationsPlaylistStyle(isLegendVisible) {
    let locationsPlaylistStyle = {};
    if (isLegendVisible) {
      locationsPlaylistStyle.top = '14.88em';
    } else {
      locationsPlaylistStyle.top = '8.64em';
    }
    return locationsPlaylistStyle;
  }
  
  const placePanelStyle = getPlacePanelStyle(isLegendVisible);
  const locationsPlaylistStyle = getLocationsPlaylistStyle(isLegendVisible);

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
                      src="images/markers/1/season_1_marker.png"
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
                      src="images/markers/2/season_2_marker.png"
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
                      src="images/markers/3/season_3_marker.png"
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
                      src="images/markers/4/season_4_marker.png"
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
                      src="images/markers/5/season_5_marker.png"
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
                      src="images/markers/6/season_6_marker.png"
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
                      src="images/markers/7/season_7_marker.png"
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
                      src="images/markers/8/season_8_marker.png"
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
                      src="images/markers/1/season_1_mixed.png"
                      alt="Magnum P.I. Mixed Season Marker"
                      width="21"
                      height="25"
                    />
                  </td>
                  <td className="legend-season">Example: Season 1 & Season 2</td>
                </tr>
              </table>
            </div>
          )}
          <div className="place-panel" style={placePanelStyle}>
            <input
              className="places-search-box"
              type="text"
              placeholder="Search places list"
            />
            <i className="fa-solid fa-magnifying-glass places-search"></i>
          </div>
          <div className="locations-playlist" style={locationsPlaylistStyle}>
            <table className="locations-table"></table>
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

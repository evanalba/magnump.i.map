import { useState } from "react";
import "../style.css";


function Credits() {
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
        <a href="index.html">
          <i className="fa-solid fa-house crud-icon" />
        </a>
        <a href="html/create.html">
          <i className="fa-solid fa-circle-plus crud-icon" />
        </a>
        <a href="html/update.html">
          <i className="fa-solid fa-circle-check crud-icon" />
        </a>
        <a href="html/delete.html">
          <i className="fa-solid fa-circle-minus crud-icon" />
        </a>
        <i className="fa-solid fa-circle-info crud-icon" onClick={openItem} />
      </div>

      {isCreditsVisible && (
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


// function SidePanel() {
//   const [isLegendVisible, setIsLegendVisible] = useState(false);
//   const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

//   const toggleLegend = () => {
//     setIsLegendVisible(!isLegendVisible);
//   };

//   const toggleSidePanel = () => {
//     setIsSidePanelOpen(!isSidePanelOpen);
//   };

//   const placePanelStyle = {
//     marginTop: isLegendVisible ? '6.25em' : '0em',
//   };

//   const locationsPlaylistStyle = {
//     top: isLegendVisible ? '15em' : '8.75em',
//   };

//   return (
//     <>
//       {isSidePanelOpen && (
//         <div className="side-panel">
//           <div className="side-panel-controls">
//             <i
//               className="fa-solid fa-sliders side-panel-sliders"
//               onClick={toggleLegend}
//             ></i>
//             <i
//               className="fa-solid fa-arrow-left side-panel-open"
//               onClick={toggleSidePanel}
//             ></i>
//           </div>
//           {isLegendVisible && (
//             <div className="legend-panel">
//               <table className="legend-table">
//                 <tr className="legend-row">
//                   <td>
//                     <img
//                       src="../public/images/magnum-cross.png"
//                       alt="Magnum P.I."
//                       width="21"
//                       height="25"
//                     />
//                   </td>
//                   <th className="legend-header">Magnum P.I. Seasons</th>
//                 </tr>
//                 <tr className="legend-row">
//                   <td>
//                     <img
//                       src="public/images/markers/1/season_1_marker.png"
//                       alt="Magnum P.I. Season 1 Marker"
//                       width="21"
//                       height="25"
//                     />
//                   </td>
//                   <td className="legend-season">Season One</td>
//                 </tr>
//                 <tr className="legend-row">
//                   <td>
//                     <img
//                       src="public/images/markers/2/season_2_marker.png"
//                       alt="Magnum P.I. Season 2 Marker"
//                       width="21"
//                       height="25"
//                     />
//                   </td>
//                   <td className="legend-season">Season Two</td>
//                 </tr>
//                 <tr className="legend-row">
//                   <td>
//                     <img
//                       src="public/images/markers/3/season_3_marker.png"
//                       alt="Magnum P.I. Season 3 Marker"
//                       width="21"
//                       height="25"
//                     />
//                   </td>
//                   <td className="legend-season">Season Three</td>
//                 </tr>
//                 <tr className="legend-row">
//                   <td>
//                     <img
//                       src="public/images/markers/4/season_4_marker.png"
//                       alt="Magnum P.I. Season 4 Marker"
//                       width="21"
//                       height="25"
//                     />
//                   </td>
//                   <td className="legend-season">Season Four</td>
//                 </tr>
//                 <tr className="legend-row">
//                   <td>
//                     <img
//                       src="public/images/markers/5/season_5_marker.png"
//                       alt="Magnum P.I. Season 5 Marker"
//                       width="21"
//                       height="25"
//                     />
//                   </td>
//                   <td className="legend-season">Season Five</td>
//                 </tr>
//                 <tr className="legend-row">
//                   <td>
//                     <img
//                       src="public/images/markers/6/season_6_marker.png"
//                       alt="Magnum P.I. Season 6 Marker"
//                       width="21"
//                       height="25"
//                     />
//                   </td>
//                   <td className="legend-season">Season Six</td>
//                 </tr>
//                 <tr className="legend-row">
//                   <td>
//                     <img
//                       src="public/images/markers/7/season_7_marker.png"
//                       alt="Magnum P.I. Season 7 Marker"
//                       width="21"
//                       height="25"
//                     />
//                   </td>
//                   <td className="legend-season">Season Seven</td>
//                 </tr>
//                 <tr className="legend-row">
//                   <td>
//                     <img
//                       src="public/images/markers/8/season_8_marker.png"
//                       alt="Magnum P.I. Season 8 Marker"
//                       width="21"
//                       height="25"
//                     />
//                   </td>
//                   <td className="legend-season">Season Eight</td>
//                 </tr>
//                 <tr className="legend-row">
//                   <td>
//                     <img
//                       src="public/images/markers/1/season_1_mixed.png"
//                       alt="Magnum P.I. Mixed Season Marker"
//                       width="21"
//                       height="25"
//                     />
//                   </td>
//                   <td className="legend-season">Example: Season 1 + Season 2</td>
//                 </tr>
//               </table>
//             </div>
//           )}
//           <div className="place-panel" style={placePanelStyle}>
//             <input
//               className="places-search-box"
//               type="text"
//               placeholder="Search places list"
//             />
//             <i className="fa-solid fa-magnifying-glass places-search"></i>
//           </div>
//           <div className="locations-playlist" style={locationsPlaylistStyle}>
//             <table className="locations-table"></table>
//           </div>
//         </div>
//       )}
//       {!isSidePanelOpen && (
//         <i
//           className="fa-solid fa-arrow-right side-panel-close"
//           onClick={toggleSidePanel}
//         ></i>
//       )}
//     </>
//   );
// }


function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* banner */}
      {/* <div className="banner">
        <img
          className="logo"
          src="../public/logo.svg"
          alt="Magnum P.I. Map Logo"
          width={400}
          height={36}
        />
      </div> */}

      {/* credits box pop-up  */}
      <div>
        <Credits />
      </div>

      {/* side panel */}
      {/* <SidePanel /> */}
      {/* <div>
        <p>Add a little style!</p>
        <img src="../public/images/locations/robins-nest-full.jpg" alt="" />
      </div> */}
    </>
  );
}

export default App;

import { useState } from "react";


function Credits() {
//   const [isCreditsVisible, setIsCreditsVisible] = useState(false);

//   function closeItem() {
//     setIsCreditsVisible(false);
//   }

//   function openItem() {
//     setIsCreditsVisible(true);
//   }

  return (
    <>

      <div className="crud-icons">
        <a href="/">
          <i className="fa-solid fa-house crud-icon" />
        </a>
        <a href="">
          <i className="fa-solid fa-circle-plus crud-icon" />
        </a>
        <a href="">
          <i className="fa-solid fa-circle-check crud-icon" />
        </a>
        <a href="">
          <i className="fa-solid fa-circle-minus crud-icon" />
        </a>
        <i className="fa-solid fa-circle-info crud-icon" />
      </div>

      {/* {isCreditsVisible == true && (
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
      )} */}
    </>
  );
}


function Add() {
  return <Credits />;
}

export default Add;

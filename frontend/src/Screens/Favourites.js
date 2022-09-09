import React, { useState } from 'react';
import "./Favourites.css";
import TopBar from "../Components/TopBar";

function Favourites() {
  const [temps, setTemps] = useState([1,2,3,4,5]);
  return (
    <div className="favourites">
      <div className="topbar">
        <TopBar usedIn={"favourites"} />
      </div>
      <div className="favourites_container">
          {
            temps?.map(() => (
              <div className="image_container">
                <div className="image">
                  <img src="https://static.dw.com/image/62850747_101.jpg" alt="" />
                </div>
                <div>
                  <div>

                  </div>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  )
};

export default Favourites
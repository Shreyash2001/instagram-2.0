import React, { useState } from 'react';
import "./Favourites.css";
import TopBar from "../Components/TopBar";
import { Avatar } from '@mui/material';

function Favourites() {
  const [temps, setTemps] = useState([1,2,3,4,5,6]);
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
                  <div className="user_information">
                    <div>
                      <Avatar />
                    </div>
                    <div>
                      <div className="user_infonames">
                        <div>
                          <h3 style={{margin:"0px 0px 5px 0px", color:"#fff"}}>User Name</h3> 
                        </div>
                        <div>
                          <span style={{color:"#fff", fontSize:"12px"}}>200k Followers</span>
                        </div>
                      </div>

                      <div></div>
                      
                    </div>
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
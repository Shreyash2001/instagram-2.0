import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReelsAction } from '../actions/reelsAction';
import ReelCard from '../Components/ReelCard';
import TopBar from '../Components/TopBar';
import "./Reels.css";

function Reels() {
  const dispatch = useDispatch();
  var {reels, loading} = useSelector(state => state.allReels);
  if(sessionStorage.getItem("Instagram-Reels") !== undefined && sessionStorage.getItem("Instagram-Reels") !== null) {
    reels = JSON.parse(sessionStorage.getItem("Instagram-Reels"));
  }
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem("Instagram-Reels") === undefined || sessionStorage.getItem("Instagram-Reels") === null) {
      dispatch(getAllReelsAction());
    } 
  }, []);

  return (
    <div>
        <div>
          <TopBar usedIn="reels" open={open} />
        </div>
        <div className="reelsContainer">
          { reels?.map((reel) => (
            <ReelCard url={reel?.video} />
          ))
            
          }
        </div>
        <div>

        </div>
    </div>
  )
}

export default Reels
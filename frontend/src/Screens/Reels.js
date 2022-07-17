import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReelsAction } from '../actions/reelsAction';
import ReelCard from '../Components/ReelCard';
import TopBar from '../Components/TopBar';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./Reels.css";

function Reels() {
  const dispatch = useDispatch();
  var {reels, loading} = useSelector(state => state.allReels);
  var savedReels = [];
  if(sessionStorage.getItem("Instagram-Reels") !== undefined && sessionStorage.getItem("Instagram-Reels") !== null) {
    savedReels = JSON.parse(sessionStorage.getItem("Instagram-Reels"));
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
        {
          loading 
          &&
          <div style={{display:"flex", flexWrap:"wrap"}}>
            <Skeleton width={320} height={500} style={{marginBottom:"10px", marginLeft:"50px", borderRadius:"22px"}} />
            <Skeleton width={320} height={500} style={{marginBottom:"10px", marginLeft:"50px", borderRadius:"22px"}} />
            <Skeleton width={320} height={500} style={{marginBottom:"10px", marginLeft:"50px", borderRadius:"22px"}} />
            <Skeleton width={320} height={500} style={{marginBottom:"10px", marginLeft:"50px", borderRadius:"22px"}} />
            <Skeleton width={320} height={500} style={{marginBottom:"10px", marginLeft:"50px", borderRadius:"22px"}} />
            <Skeleton width={320} height={500} style={{marginBottom:"10px", marginLeft:"50px", borderRadius:"22px"}} />
            <Skeleton width={320} height={500} style={{marginBottom:"10px", marginLeft:"50px", borderRadius:"22px"}} />
            <Skeleton width={320} height={500} style={{marginBottom:"10px", marginLeft:"50px", borderRadius:"22px"}} />
          </div>
        }
        <div className="reelsContainer">
          {reels !== undefined && reels !== null 
          ?
          reels?.map((reel) => (
            <ReelCard 
            key={reel?._id} 
            caption={reel?.caption} 
            creator={reel?.createdBy} 
            tags={reel?.tags}
            url={reel?.video} />
          )) 
          :
           savedReels?.map((reel) => (
            <ReelCard 
            key={reel?._id} 
            caption={reel?.caption} 
            creator={reel?.createdBy} 
            tags={reel?.tags}
            url={reel?.video} />
          ))
            }
          
        </div>
        <div>

        </div>
    </div>
  )
}

export default Reels
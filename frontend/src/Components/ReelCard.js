import { Avatar, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import "./ReelCard.css";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

function ReelCard({caption, creator, tags, url}) {
  const [showMute, setShowMute] = useState(true);
  const {userInfo} = useSelector(state => state.userLogin);
  const refVideo = useRef(null);

  const handleUnmute = () => {
    refVideo.current.defaultMuted = false;
    refVideo.current.muted = false;
    setShowMute(false);
  };

  const handleMute = () => {
    refVideo.current.defaultMuted = true;
    refVideo.current.muted = true;
    setShowMute(true);
  }

  return (

      <div className="reelCard">
        <div className="reels_tag">
        {
          showMute 
          ? 
          <VolumeOffIcon style={{color:"#fff", fontSize:"18px"}} onClick={handleUnmute} />
          :
          <VolumeUpIcon style={{color:"#fff", fontSize:"18px"}} onClick={handleMute} />
        }
            
        </div>
          <video 
          ref={refVideo}
          src={url} 
          loop
          autoPlay
          muted
          />
          <div className="reels__info">
          <div className="reels_caption">
            <p style={{color:"#fff"}}>{caption}</p>
            {
              tags?.map((tag) => (
                <span style={{color:"#fff"}}>@{tag?.userName + " "}</span>
              ))
            }
          </div>
            <div className="reels_nameContainer">
            <div className="reels_name">
                <div style={{marginRight:"10px"}}>
                  <Avatar src={creator?.profilePic} />
                </div>
                <div>
                  <p style={{margin:"0", color:"#fff"}}>{creator?.firstName + " " + creator?.lastName}</p>
                  <span style={{color:"#fff", fontSize:"12px"}}>{creator?.followers?.length} Followers</span>
                </div>
              </div>

                <div>
                {
                  userInfo?._id !== creator?._id  
                  &&
                  (userInfo?.following?.includes(creator?._id) 
                  ?
                  <Button className="following_button">Following</Button>
                  :
                  <Button style={{width:"60px", fontSize:"12px", borderColor:"#fff", color:"#fff", textTransform:"inherit"}} variant = "outlined">Follow</Button>)
                }
                  
                </div>
            </div>
          </div>
      </div>

  )
}

export default ReelCard
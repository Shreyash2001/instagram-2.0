import { Avatar, Button } from '@mui/material';
import React from 'react';
import "./ReelCard.css";

function ReelCard({caption, creator, tags, url}) {

  return (

      <div className="reelCard">
        <div className="reels_tag">
          {
            tags?.map((tag) => (
              <div>
                <Avatar src={tag?.profilePic} />
              </div>
            ))
          }
        </div>
          <video 
          src={url} 
          loop
          autoPlay
          muted
          />
          <div className="reels__info">
          <div>
            <p style={{color:"#fff"}}>{caption}</p>
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
                <div className="reel_follow">
                  <Button>Follow</Button>
                </div>
            </div>
          </div>
      </div>

  )
}

export default ReelCard
import { Avatar, Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import "./ReelCard.css";

function ReelCard({caption, creator, tags, url}) {
  const {userInfo} = useSelector(state => state.userLogin);
  console.log(userInfo?._id !== creator?._id)
  return (

      <div className="reelCard">
        <div>
            <div className="reels_tag">
            {tags?.map((tag) => (
              <div className="reels_tagProfile">
                <Avatar style={{width:"30px", height:"30px"}} src={tag?.profilePic} />
              </div>
            ))}
            </div>

          
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
                <div>
                {
                  userInfo?._id !== creator?._id  
                  &&
                  userInfo?.following?.includes(creator?._id) 
                  ?
                  <Button className="following_button">Following</Button>
                  :
                  <Button style={{width:"60px", fontSize:"12px", borderColor:"#fff", color:"#fff", textTransform:"inherit"}} variant = "outlined">Follow</Button>
                }
                  
                </div>
            </div>
          </div>
      </div>

  )
}

export default ReelCard
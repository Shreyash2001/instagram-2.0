import { Avatar, Button } from '@mui/material';
import React from 'react';
import "./SetupProfile.css";

function SetupProfile() {
  return (
    <div className="setupProfile">
        <div className="heading">
          <h1>Complete your Profile details</h1>
        </div>
        <div className="profile">
          <Avatar style={{width:"200px", height:"200px", cursor:"pointer"}} />
        </div>
        <div className="bio">
          <div>
            <span>Enter your Bio</span>
          </div>
          <div className="input">
            <textarea />
          </div>
        </div>
        <div className="addButton">
          <Button variant="outlined">Next</Button>
        </div>
    </div>
  )
}

export default SetupProfile
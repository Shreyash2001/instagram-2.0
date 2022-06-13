import React, { useState } from 'react';
import "./TopBar.css";
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

function TopBar() {
    const [showNotificationIcon, setNotificationIcon] = useState(false);
  return (
    <div className="topBar">
        <Link to={"/"} className="topBar__image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="logo" />
        </Link>
        <div className="topBar__search">
            <SearchIcon style={{color:"rgb(189, 186, 186)"}} />
            <input type="text" placeholder="Search"  />
        </div>
        <div className="topBar__right">
                <IconButton>
                    <SendIcon style={{color:"rgb(189, 186, 186)", fontSize:"30px"}} />
                </IconButton>
                <IconButton style={{position:"relative"}}>
                    <NotificationsNoneIcon style={{color:"rgb(189, 186, 186)", fontSize:"30px"}} />
                    {showNotificationIcon && 
                    <div className="notify">
                        <div>
                        <span>1</span>
                        </div>
                    </div>}
                </IconButton>
                <IconButton>
                    <AccountCircleIcon style={{color:"rgb(189, 186, 186)", fontSize:"30px"}} />
                </IconButton>
            </div>
    </div>
  )
}

export default TopBar
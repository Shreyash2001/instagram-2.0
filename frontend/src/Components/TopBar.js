import React, { useState } from 'react';
import "./TopBar.css";
import { Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';
import AddReel from './AddReel';

function TopBar({usedIn}) {
    const [showNotificationIcon, setNotificationIcon] = useState(false);
    const [open, setOpen] = useState(false);
    const addReel = () => {
        setOpen(true);
    }

  return (
    <div className="topBar">
        <Link to={"/"} className="topBar__image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="logo" />
        </Link>
        <div className="topBar__search">
            <SearchIcon style={{color:"rgb(189, 186, 186)"}} />
            <input type="text" placeholder="Search"  />
        </div>

        {usedIn === "reels" 
        && 
        <>
        <div className="addReels">
            <Button onClick={addReel}>
                <MovieIcon style={{marginRight:"10px"}} />
                Add Reels
            </Button>
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
            <div>
                {open && <AddReel setOpen={setOpen} />}
            </div>
            </>
            }
            {
                usedIn === "explore"
                &&
                <>
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
                </>
            }
            {
                usedIn === "userDetails"
                &&
                <>
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
                </>
            }
            {
                usedIn === "favourites"
                &&
                <>
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
                </>
            }
    </div>
  )
}

export default TopBar
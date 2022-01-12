import React, { useEffect, useState } from 'react';
import "./HomeLeft.css";
import { Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SendIcon from '@mui/icons-material/Send';
import ComputerIcon from '@mui/icons-material/Computer';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';

function HomeLeft() {
    const {userInfo} = useSelector(state => state.userLogin);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(userLogout());
    }

    return (
        <div className="homeLeft">

            <div className="homeLeft__container">
                <div className="homeLeft__containerLogo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="logo" />
                </div>

                <div className="homeLeft__containerProfile">
                    <div className="homeLeft__containerProfileAvatar">
                        <Avatar style={{width:"100px", height:"100px"}} src={userInfo?.profilePic} />
                    </div>
                    <div className="homeLeft__containerProfileName">
                        <p>{userInfo?.firstName} {userInfo?.lastName}</p>
                        <span>@{userInfo?.userName}</span>
                    </div>

                    <div className="homeLeft__containerProfileInfo">
                        <div className="homeLeft__containerProfileInfoPosts">
                            <h1>{userInfo?.posts.length}</h1>
                            <span>POSTS</span>
                        </div>

                        <div className="homeLeft__containerProfileInfoFollowers">
                            <h1>{userInfo?.followers.length}</h1>
                            <span>FOLLOWERS</span>
                        </div>

                        <div className="homeLeft__containerProfileInfoFollowing">
                            <h1>{userInfo?.following.length}</h1>
                            <span>FOLLOWING</span>
                        </div>
                    </div>

                </div>

                <div className="homeLeft__containerOptions">
                    <Link to="/">
                        <HomeIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Feed</span>
                    </Link>

                    <Link to="/explore">
                        <TravelExploreIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Explore</span>
                    </Link>

                    <Link to="/favorites">
                        <BookmarkBorderIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Favorites</span>
                    </Link>

                    <Link to="/message">
                        <SendIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Direct</span>
                    </Link>

                    <Link to="/live">
                        <ComputerIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>IG TV</span>
                    </Link>

                    <Link to="/stats">
                        <EqualizerIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Stats</span>
                    </Link>

                    <Link to="/settings">
                        <SettingsIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Setting</span>
                    </Link>

                    <Link to="/login" onClick={handleClick}>
                        <LogoutIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Log out</span> 
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default HomeLeft

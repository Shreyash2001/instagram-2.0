import React from 'react';
import "./HomeLeft.css";
import { Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SendIcon from '@mui/icons-material/Send';
import ComputerIcon from '@mui/icons-material/Computer';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';

function HomeLeft() {
    return (
        <div className="homeLeft">

            <div className="homeLeft__container">
                <div className="homeLeft__containerLogo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="logo" />
                </div>

                <div className="homeLeft__containerProfile">
                    <div className="homeLeft__containerProfileAvatar">
                        <Avatar style={{width:"100px", height:"100px"}} src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tommy-shelby-cillian-murphy-peaky-blinders-1569234705.jpg?crop=0.737xw:0.493xh;0.263xw,0.0276xh&resize=480:*" />
                    </div>
                    <div className="homeLeft__containerProfileName">
                        <p>Cillian Murphy</p>
                        <span>@cillian_murphy</span>
                    </div>

                    <div className="homeLeft__containerProfileInfo">
                        <div className="homeLeft__containerProfileInfoPosts">
                            <h1>500</h1>
                            <span>POSTS</span>
                        </div>

                        <div className="homeLeft__containerProfileInfoFollowers">
                            <h1>500</h1>
                            <span>FOLLOWERS</span>
                        </div>

                        <div className="homeLeft__containerProfileInfoFollowing">
                            <h1>500</h1>
                            <span>FOLLOWING</span>
                        </div>
                    </div>

                </div>

                <div className="homeLeft__containerOptions">
                    <div>
                        <HomeIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Feed</span>
                    </div>

                    <div>
                        <TravelExploreIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Explore</span>
                    </div>

                    <div>
                        <BookmarkBorderIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Favorites</span>
                    </div>

                    <div>
                        <SendIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Direct</span>
                    </div>

                    <div>
                        <ComputerIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>IG TV</span>
                    </div>

                    <div>
                        <EqualizerIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Stats</span>
                    </div>

                    <div>
                        <SettingsIcon style={{color:"rgb(189, 186, 186)"}} />
                        <span>Setting</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomeLeft

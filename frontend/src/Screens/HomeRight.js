import React, { useState } from 'react';
import "./HomeRight.css";
import SendIcon from '@mui/icons-material/Send';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, IconButton, Link } from '@mui/material';
import Notification from '../Components/Notification';
import { useSelector } from 'react-redux';

function HomeRight() {
    const elements = [1, 2, 3, 4, 5];
    const [showNotificationIcon, setNotificationIcon] = useState(false);
    const {userInfo} = useSelector(state => state.userLogin);

    const {suggestions} = useSelector(state => state.suggestedUsers);
    const data = JSON.parse(sessionStorage.getItem("Instagram-User_Suggestions"));
    console.log(data)
    return (
        <div className="homeRight">
            <div className="homeRight__top">
                <IconButton>
                    <SendIcon style={{color:"rgb(189, 186, 186)", fontSize:"25px"}} />
                </IconButton>
                <IconButton style={{position:"relative"}}>
                    <NotificationsNoneIcon style={{color:"rgb(189, 186, 186)", fontSize:"25px"}} />
                    {showNotificationIcon && 
                    <div className="notify">
                        <div>
                        <span>1</span>
                        </div>
                    </div>}
                </IconButton>
                <IconButton>
                    <AccountCircleIcon style={{color:"rgb(189, 186, 186)", fontSize:"25px"}} />
                </IconButton>
            </div>

            <div className="homeRight__trending">
                <div className="homeRight__trendingHeading">
                    <h3>Trending Feeds</h3>
                </div>
                <div className="homeRight__trendingFeeds">
                    <img src="https://s3.amazonaws.com/photos.bcheights.com/wp-content/uploads/2019/10/03123602/peaky-blinders-online.jpg" alt="feed" />
                    <img src="https://deadline.com/wp-content/uploads/2020/07/batman-e1615677263885.jpg?w=1024" alt="feed"  />
                    <img src="https://static01.nyt.com/images/2021/03/11/arts/11nft-explain-1/11nft-explain-1-mediumSquareAt3X.jpg" alt="feed"  />
                    <img src="https://static3.srcdn.com/wordpress/wp-content/uploads/2020/09/House-of-the-Dragon-Title.jpg" alt="feed"  />
                </div>
            </div>

            <div className="homeRight__trending">
                <div className="homeRight__trendingHeading">
                    <h3>Suggestions</h3>
                </div>
                <div>
                    <Notification setNotificationIcon={setNotificationIcon} />
                </div>
                <div className="homeRight__Suggestions">
                {
                    data === undefined || data === null
                    ?
                    suggestions?.map((element) => 
                    <Link key={element?._id} to={`/profile/${element?.userName}`} className="homeRight__SuggestionsList">
                        <div className="homeRight__SuggestionsListAvatar">
                            <Avatar src={element?.profilePic} />
                            <div className="homeRight__SuggestionsListName">
                                <h4>{element?.firstName + " " + element?.lastName}</h4>
                                <span>{element?.userName}</span>
                            </div>
                            
                        </div>
                        
                    </Link>)
                    :
                    data?.map((element) => 
                    <Link key={element?._id} to={`/profile/${element?.userName}`} className="homeRight__SuggestionsList">
                        <div className="homeRight__SuggestionsListAvatar">
                            <Avatar src={element?.profilePic} />
                            <div className="homeRight__SuggestionsListName">
                                <h4>{element?.firstName + " " + element?.lastName}</h4>
                                <span>{element?.userName}</span>
                            </div>
                            
                        </div>
                        
                    </Link>)
                    }
                    
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}

export default HomeRight

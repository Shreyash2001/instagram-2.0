import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import "./FeedCard.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Carousel from './Carousel';
import FavoriteIcon from '@mui/icons-material/Favorite';

function FeedCard({name, lastname, username, image}) {
  return (
    <div className="feedCard">
      <div className="feedCard__info">
        <div className="feedCard__infoLeft">
            <div>
                <Avatar />
            </div>
            <div className="feed__infoName">
                <p>Test User</p>
                <span>test__user</span>
            </div>
          </div>
          <div>
          <IconButton>
            <MoreHorizIcon style={{fontSize:"28px"}} />
          </IconButton>
          </div>
      </div>

      <div className="feed__image">
        {/* <img src="https://www.greenqueen.com.hk/wp-content/uploads/2021/06/WEF-Investments-In-Nature-Based-Solutions-Have-To-Triple-By-2030-To-Address-Climate-Change-Biodiversity-Loss.jpg" alt="" /> */}
        <Carousel initialIndex={0} />
      </div>
      <div className="feed__like">
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </div>
    </div>
  );
};

export default FeedCard;

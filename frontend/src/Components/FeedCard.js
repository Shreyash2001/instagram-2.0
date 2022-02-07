import { Avatar } from '@mui/material';
import React from 'react';
import "./FeedCard.css";

function FeedCard({name, lastname, username}) {
  return (
    <div className="feedCard">
        <div className="feedCard__info">
            <div>
                <Avatar />
            </div>
            <div>
                <p>Test User</p>
                <span>test__user</span>
            </div>
        </div>
    </div>
  );
};

export default FeedCard;

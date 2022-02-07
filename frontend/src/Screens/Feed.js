import { Button } from '@mui/material';
import React from 'react';
import FeedCard from '../Components/FeedCard';
import "./Feed.css"

function Feed() {
  return (
    <div className="feed">
        <div>
        <div className="feed__top">
            <div>
                <Button className="feed__button">New</Button>
                <Button className="feed__button">Top</Button>
            </div>
        </div>
        </div>
        <div>
            <FeedCard />
        </div>
    </div>
  );
};

export default Feed;

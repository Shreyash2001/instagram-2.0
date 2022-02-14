import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import FeedCard from '../Components/FeedCard';
import "./Feed.css"

function Feed() {
  const {loading, error, posts} = useSelector(state => state.allPosts);

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
        <div className="feed__cards">
        {
          posts?.map((post) => (
            <FeedCard />
          ))
        }
            
            
        </div>
    </div>
  );
};

export default Feed;

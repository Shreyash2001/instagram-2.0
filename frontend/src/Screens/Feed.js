import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FeedCard from '../Components/FeedCard';
import "./Feed.css"

function Feed() {
  var {loading, error, posts} = useSelector(state => state.allPosts);

  posts = JSON.parse(localStorage.getItem("Instagram-Posts"));

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
            <FeedCard 
              name = {post?.name}
              images = {post?.images}
              profilePic = {post?.profilePic}
              caption = {post?.caption}
              location = {post?.location}
            />
          ))
        }
            
            
        </div>
    </div>
  );
};

export default Feed;

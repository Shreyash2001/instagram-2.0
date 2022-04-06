import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import FeedCard from '../Components/FeedCard';
import "./Feed.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Feed() {
  var {loading, error, posts} = useSelector(state => state.allPosts);
  const {userInfo} = useSelector(state => state.userLogin);
  posts = JSON.parse(sessionStorage.getItem("Instagram-Posts"));

  return (
    <>
    {
      loading 
      ?
      <div>
      <Skeleton 
        style={{marginLeft:"100px", marginBottom:"20px"}} 
        width={750} 
        height={550} 
        borderRadius={0}
        count={3} 
        baseColor="#adadad2e"
        />  
      </div>
      
      :

      error ? 
      <div>
        <span>{error}</span>
      </div>
      :


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
              key={post?.id}
              id={post?.id}
              name = {post?.name}
              username = {post?.username}
              images = {post?.images}
              likes = {post?.likes}
              user_id = {userInfo?._id}
              profilePic = {post?.profilePic}
              caption = {post?.caption}
              location = {post?.location}
              time = {post?.time}
            />
          ))
        }
            
            
        </div>
    </div>
    }
    </>
  );
};

export default Feed;

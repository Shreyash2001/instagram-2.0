import { Button } from '@mui/material';
import React, {useState} from 'react';
import "./Feed.css"
import { useSelector } from 'react-redux';
import FeedCard from '../Components/FeedCard';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import moment from "moment";

function Feed({userInfo, posts}) {
  var {loading, error} = useSelector(state => state.allPosts);
  var savedPosts = JSON.parse(sessionStorage.getItem("Instagram-Posts"));
  const [loaders, setLoaders] = useState(["1", "2", "3"]);
  
  return (
    <>
    {
      loading
      &&
      <>
      {loaders.map((i) => (
        <div key={i} style={{backgroundColor:"#fff", width:"650px", height:"550px", marginLeft:"100px", marginBottom:"20px", padding:"20px"}}>
      <div style={{display:"flex", alignItems:"center"}}>
      <Skeleton
        circle
        height="80px"
        width="80px" 
        containerClassName="avatar-skeleton"
        baseColor="#adadad2e"
      />
      <div style={{marginLeft:"10px"}}>
      <Skeleton width={200} style={{marginBottom:"10px"}} />
      <Skeleton width={100} />
      </div>

      </div>
      <Skeleton 
        width={650} 
        height={400} 
        borderRadius={0}
        baseColor="#adadad2e"
        style={{marginTop:"20px"}}
        />  
        <div>
        <Skeleton width={600} style={{marginTop:"20px"}} />
        </div>
      </div>

      ))}
      </>
      }


     { error &&
      <div>
        <span>{error}</span>
      </div>}
      


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
          posts !== undefined && posts !== null
          ?
          posts?.map((post) => (
            <FeedCard 
              key={post?._id}
              id={post?._id}
              user_info={userInfo}  
              name = {post?.postedBy?.firstName + " " + post?.postedBy?.lastName}
              username = {post?.postedBy?.userName}
              images = {post?.image}
              likes = {post?.likes}
              profilePic = {post?.postedBy?.profilePic}
              caption = {post?.caption}
              location = {post?.location}
              comments = {post?.comments}
              time = {moment(post?.updatedAt).fromNow()}
              currUserId = {userInfo?._id}
            />
          ))
          :
          savedPosts?.map((post) => (
            <FeedCard 
              key={post?._id}
              id={post?._id}
              user_info={userInfo}  
              name = {post?.postedBy?.firstName + " " + post?.postedBy?.lastName}
              username = {post?.postedBy?.userName}
              images = {post?.image}
              likes = {post?.likes}
              profilePic = {post?.postedBy?.profilePic}
              caption = {post?.caption}
              location = {post?.location}
              comments = {post?.comments}
              time = {moment(post?.updatedAt).fromNow()}
              currUserId = {userInfo?._id}
            />
          ))
        }
        </div>
    </div>
    
    </>
  );
};

export default Feed;

import { Button } from '@mui/material';
import React, {useState} from 'react';
import "./Feed.css"
import { useSelector } from 'react-redux';
import FeedCard from '../Components/FeedCard';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Feed({userInfo, posts}) {
  var {loading, error} = useSelector(state => state.allPosts);
  
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
          posts?.map((post) => (
            <FeedCard 
              key={post?.id}
              id={post?.id}
              user_info={userInfo}
              name = {post?.name}
              username = {post?.username}
              images = {post?.images}
              likes = {post?.likes}
              profilePic = {post?.profilePic}
              caption = {post?.caption}
              location = {post?.location}
              comments = {post?.comments}
              time = {post?.time}
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

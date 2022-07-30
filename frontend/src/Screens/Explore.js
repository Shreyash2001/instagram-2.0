import React, { useEffect } from 'react';
import "./Explore.css";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TopBar from '../Components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { getExploreData } from '../actions/postsAction';

function Explore() {
  const dispatch = useDispatch();
  var {posts} = useSelector(state => state.explorePosts);
  if(posts === undefined) {
    posts = JSON.parse(sessionStorage.getItem("Explore-Posts"));
  };

  useEffect(() => {
    if(sessionStorage.getItem("Explore-Posts") === undefined || sessionStorage.getItem("Explore-Posts") === null) {
      dispatch(getExploreData());
    }
    
  }, []);
  
  return (
    <div className="explore">
    <div>
        <TopBar />
    </div>
    <div>
    <Box className="explore__container">
      <ImageList variant="masonry" cols={2} gap={20}>
        {posts?.map((post) => (
          <ImageListItem key={post?._id}>
          {
            post?.image !== undefined
            ?
            <img
              src={`${post?.image[0].split("->")[1]}?w=248&fit=crop&auto=format`}
              srcSet={`${post.image[0].split("->")[1]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={""}
              loading="lazy"
            />
            :
            <video 
              src={`${post.video}?w=248&fit=crop&auto=format`}
              srcSet={`${post.video}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={""}
              loading="lazy"
              muted
              autoPlay
              loop
              style={{width:"410px", height:"600px", objectFit:"fill"}}
            />
          }
          
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </div>
    </div>
  )
}

export default Explore
import React, { useEffect } from 'react';
import "./Explore.css";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TopBar from '../Components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { getExploreData } from '../actions/postsAction';
import Carousel from 'react-material-ui-carousel';

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
    
  }, [])
  posts.forEach(post => {
    console.log(post?.image)
  });
  return (
    <div className="explore">
    <div>
        <TopBar />
    </div>
    <div>
    <Box className="explore__container">
      <ImageList variant="masonry" cols={2} gap={30}>
        {posts?.map((post) => (
          <ImageListItem key={post?._id}>
          {
            post?.image !== undefined && post?.image !== null
            ?
            <img
              src={`${post?.image[0].split("->")[1]}?w=248&fit=crop&auto=format`}
              srcSet={`${post.image[0].split("->")[1]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={""}
              loading="lazy"
            />
            :
            <video 
              src={`${post.image[0].split("->")[1]}?w=248&fit=crop&auto=format`}
              srcSet={`${post.image[0].split("->")[1]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={""}
              loading="lazy"
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
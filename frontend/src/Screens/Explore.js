import React, { useEffect, useState } from 'react';
import "./Explore.css";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TopBar from '../Components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { getExploreData } from '../actions/postsAction';
import MovieIcon from '@mui/icons-material/Movie';
import PostById from "./PostById";

function Explore() {
  const dispatch = useDispatch();
  var {posts} = useSelector(state => state.explorePosts);
  if(posts === undefined) {
    posts = JSON.parse(sessionStorage.getItem("Explore-Posts"));
  };

  const [open, setOpen] = useState(false);
  const [id, setId] = useState({});
  const handleClick = (id) => {
    setId(id);
    setOpen(true);
  }

  const openExplore = (bool) => {
    setOpen(bool);
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
              onClick={() => handleClick(post?._id)}
              src={`${post?.image[0].split("->")[1]}?w=248&fit=crop&auto=format`}
              srcSet={`${post.image[0].split("->")[1]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={""}
              loading="lazy"
              className="explore_images"
            />

            :
            <div style={{position:"relative"}}>
            <MovieIcon style={{position:"absolute", top:"10px", left:"10px", color:"#fff"}} />
            <video 
              onClick={() => handleClick(post?._id)}
              src={`${post.video}?w=248&fit=crop&auto=format`}
              srcSet={`${post.video}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={""}
              loading="lazy"
              muted
              autoPlay
              loop
              className="explore_reels"
            />
            </div>
          }
          
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </div>
    <div>
        {
          open 
          &&
          <PostById incomingFrom={{name: "explore", id: id}} openExplore={openExplore} />
        }
    </div>
    </div>
  )
}

export default Explore
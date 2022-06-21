import React from 'react';
import "./Explore.css";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TopBar from '../Components/TopBar';

function Explore() {
  var posts = JSON.parse(sessionStorage.getItem("Instagram-Posts"));

  return (
    <div className="explore">
    <div>
        <TopBar />
    </div>
    <div>
    <Box className="explore__container">
      <ImageList variant="masonry" cols={2} gap={30}>
        {posts?.map((item) => (
          <ImageListItem key={item.image[0]}>
            <img
              src={`${item.image[0]}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={""}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </div>
    </div>
  )
}

export default Explore
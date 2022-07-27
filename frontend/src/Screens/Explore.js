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
  var posts = useSelector(state => state.explorePosts);
  posts = JSON.parse(sessionStorage.getItem("Explore-Posts"));
console.log(posts)
  useEffect(() => {
    if(sessionStorage.getItem("Explore-Posts") === undefined || sessionStorage.getItem("Explore-Posts") === null) {
      dispatch(getExploreData());
    }
    
  }, [])

  return (
    <div className="explore">
    <div>
        <TopBar />
    </div>
    <div>
    <Box className="explore__container">
      <ImageList variant="masonry" cols={2} gap={30}>
        {posts?.images?.map((post) => (
          <ImageListItem key={post?._id}>
          <Carousel 
          navButtonsAlwaysVisible 
          indicators={false}
          autoPlay = {false}
          cycleNavigation={false} 
          animation={"slide"}>
            {/* <img
              src={`${item.image[0].split("->")[1]}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={""}
              loading="lazy"
            /> */}
            {
                  Array.from(post?.image?.values()).map( (data, i) => 
                  data.split("->")[0].startsWith("I")
                  ?
                  <img style={{width:"623px", height:"550px"}} 
                  key={i} 
                  src={`${data.split("->")[1]}?w=248&fit=crop&auto=format`}
                  srcSet={`${data.split("->")[1]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={""}
                  loading="lazy"
                  /> 
                  :
                  <video style={{width:"623px", height:"550px"}} 
                    key={i}
                    src={data.split("->")[1]}
                    muted
                    autoPlay={true} 
                  />
                  )
              } 
          </Carousel>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </div>
    </div>
  )
}

export default Explore
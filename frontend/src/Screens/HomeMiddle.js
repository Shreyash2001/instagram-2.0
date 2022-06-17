import React, { useEffect, useState } from 'react';
import "./HomeMiddle.css";
import { Avatar, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Stories from 'react-insta-stories';
import { useDispatch, useSelector } from 'react-redux';
import { getStoriesAction } from '../actions/storiesAction';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getPostsAction } from '../actions/postsAction';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useHistory } from 'react-router-dom';
import Feed from './Feed';
import InfiniteScroll from 'react-infinite-scroll-component';


function HomeMiddle() {
    var [i, seti] = useState(0);
    const increase = () => {
        i++;
        seti(i);
    }

    const [show, setShow] = useState(false);
    const [story, setStory] = useState({});
    const [sendStory, setSendStory] = useState({});

    const [idx, setIdx] = useState(0);
    
    const dispatch = useDispatch();
    var {data, loading} = useSelector(state => state.storyInfo);
    const {success} = useSelector(state => state.currentStoryInfo);
    data = JSON.parse(sessionStorage.getItem("Instagram-Stories"));

    const history = useHistory();
    const handleShowClick = () => {
        setShow(!show);
        // handleOpen();
        history.push('/story/create')
        setStory({});
        stopStoryLoader();
        
    }

    const stopStoryLoader = () => {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }

    const style = {
        position: 'absolute',
        top: '49%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 452,
        height: 600,
        outline:'none'
      };
      
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        const handleStory = (id, i) => {
            handleOpen();
            const result = data?.find(({_id}) => _id === id);
            setStory(result);
            setIdx(i);
        }

        const nextStory = () => {
            if(data[idx + 1] !== undefined && i < data[idx + 1].list.length) {
                setStory(data[idx + 1]);
                setIdx(idx + 1);
            } else {
                handleClose();
                seti(0);
            }
        }

        const prevStory = () => {
            if(data[idx - 1] !== undefined) {
                setStory(data[idx - 1]);
                setIdx(idx - 1)
            }
        }
        
        
          function sideScroll(element,direction,speed,distance,step){
            var scrollAmount = 0;
             var slideTimer = setInterval(function(){
                 if(direction === 'left'){
                     element.scrollLeft -= step;
                 } else {
                     element.scrollLeft += step;
                 }
                 scrollAmount += step;
                 if(scrollAmount >= distance){
                     window.clearInterval(slideTimer);
                 }
             }, speed);
         }
  
         const scrollOnClickRightTopRated = () => {
          sideScroll(document.getElementById("topRated"),'right',10,1500,20); 
        }

        const scrollOnClickLeftTopRated = () => { 
            sideScroll(document.getElementById("topRated"),'left',10,1500,20);
            }

        const [showScroll, setShowScroll] = useState(false);
        const [showScrollRight, setShowScrollRight] = useState(false);
        const scrollEvent = (e) => {
            const target = e.target;
            if(target.scrollLeft > 0) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }

            if(target.scrollLeft > 0 && target.scrollLeft < 740) {
                setShowScrollRight(true);
            } else {
                setShowScrollRight(false);
            }
            
        };

        const handleClickCreatePost = () => {
            history.push("/post/create");
        }
          
        useEffect(() => {
            if(sessionStorage.getItem("Instagram-Stories") === undefined || sessionStorage.getItem("Instagram-Stories") === null)
                dispatch(getStoriesAction());

                if(sessionStorage.getItem("Instagram-Posts") === undefined || sessionStorage.getItem("Instagram-Posts") === null)
                dispatch(getPostsAction());
            
            if(success) {
                handleClose();
                setSendStory(false);
            }
        }, [dispatch, success]);

//posts

    const {userInfo} = useSelector(state => state.userLogin);
    var {posts} = useSelector(state => state.allPosts);
    posts = JSON.parse(sessionStorage.getItem("Instagram-Posts"));
    const perPage = 5;

    const [allPosts, setAllPosts] = useState([]);
    const [lastPosition, setLastPosition] = useState(perPage);

    const fetchData = () => {
        setTimeout(() => {
            setAllPosts((prev) => [...prev, ...posts?.slice(lastPosition, lastPosition + perPage)]);
          }, 2000);
          console.log("hi")
          setLastPosition(lastPosition + perPage);
    }
    // console.log(posts)
    return (
        <div className="homeMiddle">
            <div className="homeMiddle__search"> 
                <div>
                    <SearchIcon style={{color:"rgb(189, 186, 186)"}} />
                    <input type="search" placeholder="Search"  />
                </div>
                <Button onClick={handleClickCreatePost}>+ Create Post</Button>
            </div>

            <div id="scrollableDiv" className="scroller">

            <div className="homeMiddle__posts">
                <div className="homeMiddle__postsContainerStories">
                    <div className="homeMiddle__postsContainerStoriesHeading">
                        <div>
                            <h2>Stories</h2>
                        </div>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <h4>Watch All</h4>
                            <PlayArrowIcon />
                        </div>
                    </div>

                    <div id="topRated" onScroll={scrollEvent} className="homeMiddle__postsContainerStoriesMain">
                    {
                        showScroll 
                        && 
                        <div className="story_arrow" onClick={scrollOnClickLeftTopRated}>
                            <ArrowBackIosIcon style={{fontSize:"15px", marginLeft:"10px", marginTop:"7px"}} />
                        </div> 
                    }
                    {
                        showScrollRight &&
                            <div className="story_arrowRight" onClick={scrollOnClickRightTopRated}>
                            <ArrowForwardIosIcon style={{fontSize:"15px", marginLeft:"10px", marginTop:"7px"}} />
                        </div>
                    }
                    <div onClick={handleShowClick} className="homeMiddle__postsContainerStoriesCreate" style={{marginRight:`${data?.length > 10 ? "100px" : "10px"}`}}>
                        <img className="homeMiddle__postsContainerStoriesCreateImage" src="https://res.cloudinary.com/cqn/image/upload/v1642171910/1200px-Plus_symbol.svg_ncdooz.png" alt="add story icon" />
                        <>{show ? 
                            <svg className="homeMiddle__postsContainerStoriesCreateSvg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  
                                <circle cx="40" cy="40" r="30" />
                            </svg>
                            :
                            <svg className="homeMiddle__postsContainerStoriesCreateSvgWithout" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  
                                <circle cx="40" cy="40" r="30" />
                            </svg>
                        }</>
                        <span className="homeMiddle__postsContainerStoriesMainCreate">Create Story</span>
                    </div>

                    <div className="homeMiddle__postsContainerStoriesMainInfo">
                        {

                            loading ?
                            <div>
                            <Skeleton 
                                circle
                                style={{marginLeft:"30px", marginBottom:"20px"}} 
                                width={80} 
                                height={80} 
                                borderRadius={0}
                                inline = "false"
                                count={6} 
                                baseColor="#adadad2e"
                            />
                            </div> 
                            :
                    
                            data?.map((val, i) => {
                                
                                if(val?.list?.length > 0) {
                                return ( 
                                <div key={i} style={{position:"relative", marginLeft:"20px"}}>
                                    <div onClick={() => handleStory(val?._id, i++)} className="homeMiddle__story">
                                    <svg className="homeMiddle__postsContainerStoriesCreateSvgWithout" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  
                                    <circle cx="40" cy="40" r="30" />
                                    </svg>
                                    <Avatar className="homeMiddle__storyImage" src={val?.image} />
                                    </div>
                                    <span className="homeMiddle__storyName">{val?.name}</span>
                                </div>
                                )
                                }
                            })
                        }
                            
                    </div>
                    </div>
                </div>
            </div>
 
            
                <div>
                <InfiniteScroll
                    dataLength={posts?.length || 10} //This is important field to render the next data
                    next={fetchData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <Feed userInfo={userInfo} posts={posts} />
            </InfiniteScroll>
                </div>
</div>
            <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{backgroundColor:"#222"}}
            >
            <Box sx={style}>
            
                {data !== null && <div className="story">
                <Stories 
                stories={story?.list}
                defaultInterval={2000}
                width={402}
                height={650}
                keyboardNavigation = {false}
                onStoryEnd={increase}
                // onAllStoriesEnd={nextStory}
                /> 
                {idx !== data.length - 1 && <div className="nextStory__button" onClick={nextStory}><ArrowForwardIosIcon style={{color:"gray", margin:"8px", fontSize:"16px"}} /></div>}
                {idx !== 0 && <div className="nextStory__buttonPrev" onClick={prevStory}><ArrowBackIosIcon style={{color:"gray", margin:"8px", fontSize:"16px"}} /></div>}
                </div>}
            
            </Box>
        </Modal>
        </div>
        </div>
    );
};

export default HomeMiddle

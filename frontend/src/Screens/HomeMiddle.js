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


function HomeMiddle() {
    const [show, setShow] = useState(false);
    const [showStory, setShowStory] = useState(false);

    
    const dispatch = useDispatch();
    var {data} = useSelector(state => state.storyInfo);
    data = JSON.parse(localStorage.getItem("Instagram-Stories"));

    const handleShowClick = () => {
        setShow(!show);
    }

    const handleShowStory = () => {
        setShowStory(true);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 432,
        height: 600
      };
      
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
    
    useEffect(() => {
        // if(localStorage.getItem("Instagram-Stories") === undefined || localStorage.getItem("Instagram-Stories") === null)
            dispatch(getStoriesAction());
    }, [dispatch]);


    return (
        <div className="homeMiddle">
            <div className="homeMiddle__search"> 
                <div>
                    <SearchIcon style={{color:"rgb(189, 186, 186)"}} />
                    <input type="search" placeholder="Search"  />
                </div>
                <Button>+ Create Post</Button>
            </div>

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

                    <div className="homeMiddle__postsContainerStoriesMain">
                    <div onClick={handleShowClick} className="homeMiddle__postsContainerStoriesCreate">
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
                            data?.map((val) => (
                                <div style={{position:"relative", marginLeft:"20px"}}>
                                    <div onClick={handleOpen} className="homeMiddle__story">
                                    <svg className="homeMiddle__postsContainerStoriesCreateSvgWithout" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  
                                    <circle cx="40" cy="40" r="30" />
                                    </svg>
                                    <Avatar className="homeMiddle__storyImage" src={val?.image} />
                                    </div>
                                    <span className="homeMiddle__storyName">{val?.name}</span>
                                </div>
                            ))
                        }

                        {data && data.length !== 0 &&
                            data?.map((val) => (
                                console.log(val?.list)
                            ))
                         }
                            
                    </div>
                    </div>
                </div>
            </div>
            <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} style={{display:"flex", alignItems:"center"}}>
            
            {data && data.length !== 0 &&
                            data?.map((val) => (
                                <div style={{padding:"10px"}}>
                                <Stories 
                                stories={val?.list}
                                defaultInterval={1500}
                                width={432}
                                height={600}
                                />
                                </div>
                            ))
                         }
            </Box>
        </Modal>
        </div>
        </div>
    );
};

export default HomeMiddle

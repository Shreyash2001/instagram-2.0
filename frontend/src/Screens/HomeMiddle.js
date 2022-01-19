import React, { useEffect, useState } from 'react';
import "./HomeMiddle.css";
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Stories from 'react-insta-stories';
import { useDispatch, useSelector } from 'react-redux';
import { getStoriesAction } from '../actions/storiesAction';


function HomeMiddle() {
    const [show, setShow] = useState(false);

    
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.storyInfo);
    console.log(data)
    const handleShowClick = () => {
        setShow(!show);
    }
    
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
                    <div onClick={handleShowClick} className="homeMiddle__postsContainerStoriesCreate">
                        <img className="homeMiddle__postsContainerStoriesCreateImage" src="https://res.cloudinary.com/cqn/image/upload/v1642171910/1200px-Plus_symbol.svg_ncdooz.png" alt="add story icon" />
                        <>{show ? 
                            <svg className="homeMiddle__postsContainerStoriesCreateSvg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                            :
                            <svg className="homeMiddle__postsContainerStoriesCreateSvgWithout" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                        }</>
                    </div>

                    <div>
                        {data?.length !== 0 && 
                            
                            data?.map((val) => (
                                console.log(val)
                            ))
                         
                        }
                    </div>

                    <div>
                        {data && data.length !== 0 &&
                            data?.map((val) => (
                                <Stories 
                                stories={val}
                                defaultInterval={1500}
                                width={432}
                                height={768}
                            />
                            ))
                         }
                            
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeMiddle

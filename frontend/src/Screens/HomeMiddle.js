import React, { useEffect, useState } from 'react';
import "./HomeMiddle.css";
import { Avatar, Button, Fade } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Stories from 'react-insta-stories';
import { useDispatch, useSelector } from 'react-redux';
import { addStoryAction, getStoriesAction } from '../actions/storiesAction';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getPostsAction } from '../actions/postsAction';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Backdrop from '@mui/material/Backdrop';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CropImage from '../Components/CropImage';



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
    const [openPost, setOpenPost] = useState(false);
    
    const dispatch = useDispatch();
    var {data, loading} = useSelector(state => state.storyInfo);
    const {success} = useSelector(state => state.currentStoryInfo)
    data = JSON.parse(localStorage.getItem("Instagram-Stories"));

    const handleShowClick = () => {
        setShow(!show);
        handleOpen();
        setStory({});
        stopStoryLoader();
    }

    const stopStoryLoader = () => {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }

    const stylePost = {
        position: 'absolute',
        top: '49%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        height: 600,
        outline:'none'
      };

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
        const handleClickCreatePost = () => setOpenPost(true);
        const handleClose = () => setOpen(false);
        const handleCloseCreatePost = () => setOpenPost(false);

        const [pictures, setPictures] = useState([{
            data: [],
            url: ""
        }])
        const inputRef = React.useRef();
        const triggerFileSelectPopup = () => inputRef.current.click();

        const onSelectFile = (event) => {
            if (event.target.files && event.target.files.length > 0) {

                const tempArr = [];

                [...event.target.files].forEach(file => {
                    console.log("file >>> ", file);

                    tempArr.push({
                    data: file,
                    url: URL.createObjectURL(file)
                    });

                    console.log("pictures >> ", pictures);
                });

                setPictures(tempArr);


            //   const reader = new FileReader();
            //   const filesToAdd = event.target.files;
            //     reader.readAsDataURL(event.target.files[0]);
            //     reader.addEventListener("load", () => {
            //         // arr.push(reader.result);
            //     });  
            
            // setImage([...image, filesToAdd]);
            }
          };

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
        
        const onSuccess = res => {
            const data = {
                file : res.url,
                fileId : res.fileId
            }
            setSendStory(data);
          };


          const uploadStory = () => {
            dispatch(addStoryAction(sendStory));
            dispatch(getStoriesAction());
          };

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

        if(target.scrollLeft < 740) {
            setShowScrollRight(true);
        } else {
            setShowScrollRight(false);
        }
        
    }

    const[postIdx, setPostIdx] = useState(0);
    const prevPostPicture = () => {
        setPostIdx(postIdx - 1);
    }

    const nextPostPicture = () => {
        if(postIdx < pictures?.length)
        setPostIdx(postIdx + 1);
    }

    const[cropData, setCropData] = useState("")
    const getCropData = (data) => {
        setCropData(data);
      };

      const[url, setUrl] = useState(null);
      useEffect(() => {
        if(cropData){
            const data = new FormData()
                  data.append('file', cropData)
                  data.append('upload_preset', 'insta_clone')
                  data.append('cloud_name', 'cqn')
        fetch('https://api.cloudinary.com/v1_1/cqn/image/upload', {
          method: 'post',
          body:data,
          loadingPreview:true,
        })
        .then(res=>res.json())
        .then(imageData => {
          setUrl(imageData.url)
        })
      }
    }, [cropData])

    useEffect(() => {
        if(localStorage.getItem("Instagram-Stories") === undefined || localStorage.getItem("Instagram-Stories") === null)
            dispatch(getStoriesAction());

            if(localStorage.getItem("Instagram-Posts") === undefined || localStorage.getItem("Instagram-Posts") === null)
            dispatch(getPostsAction());
        
        if(success) {
            handleClose();
            setSendStory(false);
        }
    }, [dispatch, success]);


    return (
        <div className="homeMiddle">
            <div className="homeMiddle__search"> 
                <div>
                    <SearchIcon style={{color:"rgb(189, 186, 186)"}} />
                    <input type="search" placeholder="Search"  />
                </div>
                <Button onClick={handleClickCreatePost}>+ Create Post</Button>
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
                                <div style={{position:"relative", marginLeft:"20px"}}>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{backgroundColor:"#222"}}
            >
            <Box sx={style}>
            {story && Object.keys(story).length === 0 
            ? 
            <div className="homeMiddle__addStory">
                    <div className="homeMiddle__addStoryTop">
                        <span>Add New Story</span>
                    </div>

                    {
                        sendStory && Object.keys(sendStory).length !== 0
                        ?
                        <div className="uploadStory">
                            {/* <img src={sendStory.file} alt="" /> */}
                            <IKImage
                            path={sendStory?.file}
                            transformation={[{
                                height: 100,
                                width: 200,
                                focus: "auto",
                            }]}
                            />
                            <div>
                            <Button onClick={uploadStory}>Upload Story</Button>
                            </div>
                        </div>
                        :
                    
                    <div className="homeMiddle__addStoryMiddle">
                        <img src="https://res.cloudinary.com/cqn/image/upload/v1643128901/Screenshot_2022-01-25_221020_v5krhh.png" alt="logo" />
                        <IKContext
                            publicKey="public_QRzvhd/onB2BeV7DQdCdPfzkvXg="
                            urlEndpoint="https://ik.imagekit.io/mhhrxbqavs9/tr:w-200,h-300,fo-auto/"
                            transformationPosition="path"
                            authenticationEndpoint="http://localhost:5000/auth"
                            >

                            <label>
                            <span>Select from this device</span>
                            <IKUpload fileName="my-story" onSuccess={onSuccess} />
                            </label>
                            </IKContext>
                    </div>
                    }
                </div>
                
            :
                <div className="story">
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
                </div>
            }
            </Box>
        </Modal>
        </div>

        <div>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openPost}
            onClose={handleCloseCreatePost}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={openPost}>
            <Box sx={stylePost}>
            <div className="homeMiddle__addPost">
                    <div className="homeMiddle__addPostTop">
                        <span>Add New Post</span>
                    </div>

                    <div>
                    {
                        pictures?.length > 1 || pictures[0].url.length > 0
                        ?
                        <div style={{position:"relative"}}>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <div className="uploadPost">
                                <CropImage post={pictures[postIdx].url} getCropData={getCropData} />
                                {/* {
                                    cropData && <img src={cropData} alt="" />
                                } */}
                            </div>
                        
                        </div>
                        <div className="postArrowButtons">

                        {postIdx > 0 ? 
                        <div className="postArrowButtons__prev" onClick={prevPostPicture}>
                        <ArrowBackIosIcon style={{color:"#fff", margin:"8px", fontSize:"16px"}} />
                        </div>
                        :
                        <div>
                        </div>
                        }

                        {postIdx < pictures?.length - 1 ?
                        <div className="postArrowButtons__next" onClick={nextPostPicture}>
                        <ArrowForwardIosIcon style={{color:"#fff", margin:"8px", fontSize:"16px"}} />
                        </div>
                        :
                        <div />
                        }

                        </div>

                        </div>
                        :
                        <div className="homeMiddle__addPostMiddle">
                        <img src="https://res.cloudinary.com/cqn/image/upload/v1643128901/Screenshot_2022-01-25_221020_v5krhh.png" alt="logo" />
                        <Button onClick={triggerFileSelectPopup}  className="homeMiddle__addPostMiddleButton">
                        <PhotoCameraIcon style={{fontSize:"30px", color:"#fff", marginRight:"10px"}} />
                        Add photo
                        </Button>
                        <input type="file" multiple accept="image/*" ref={inputRef} onChange={onSelectFile} style={{display:"none"}} />
                        </div>
                    }
                    </div>
            </div>
            </Box>
            </Fade>
            </Modal>
        </div>
        </div>
    );
};

export default HomeMiddle

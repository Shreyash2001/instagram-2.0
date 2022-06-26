import React, { useEffect, useRef, useState } from 'react';
import "./AddPost.css";
import { Avatar, Button, Fade, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CropImage from '../Components/CropImage';
import Carousel from 'react-material-ui-carousel';
import Picker from 'emoji-picker-react';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { searchUsersAction } from '../actions/userActions';
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Popper from '@mui/material/Popper';
import CancelIcon from '@mui/icons-material/Cancel';
import SlidingLoader from "../Components/SlidingLoader";
import { useDispatch, useSelector } from 'react-redux';
import { addPostAction, getPostsAction } from '../actions/postsAction';
import { useHistory } from 'react-router-dom';
import { ADD_POSTS_REMOVE } from '../constants/postConstants';

function AddPost() {
    const stylePost = {
        position: 'absolute',
        top: '45%',
        left: '45%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        height: 600,
        maxWidth: 700,
        outline:'none'
      };

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openPost, setOpenPost] = useState(false);
    var [nextIdx, setnextIdx] = useState(0);
    const {userInfo} = useSelector(state => state.userLogin);
    var {loading : loadingPost, users} = useSelector(state => state.searchUserResult);
    users = users?.filter(user => user?.userName !== userInfo?.userName);

    const [pictures, setPictures] = useState([]);

    const[postIdx, setPostIdx] = useState(0);
        const prevPostPicture = () => {
            setPostIdx(postIdx - 1);
        };

        const nextPostPicture = () => {
            if(postIdx < pictures?.length)
            setPostIdx(postIdx + 1);
        };

        const towardEnd = () => {
            setnextIdx(nextIdx + 1);
        };

        const[cropData, setCropData] = useState(null);
        const getCropData = (data) => {
            setCropData(data);
        };

        const[showEmoji, setShowEmoji] = useState(false);
        const[caption, setCaption] = useState("");


        const onEmojiClick = (event, emojiObject) => {
            if(emojiObject !== null) {
              var already = caption;
              already += " " + emojiObject?.emoji;
              setCaption(already);
            }
          };

          const[destination, setDestination] = useState("");
        
        var timer;
        var valueSearch = ""
        const handleChangeTag = (e) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
            valueSearch = e.target.value.replace(/\s/g,'');
                dispatch(searchUsersAction(valueSearch));
            
            }, 1000)
        };

        const [openTag, setOpenTag] = useState(false);
        const [anchorEl, setAnchorEl] = useState(null);

        const handleClickPopTag = (event) => {
            setAnchorEl(event.currentTarget);
            setOpenTag((previousOpen) => !previousOpen);
        };


        const canBeOpen = open && Boolean(anchorEl);
        const id = canBeOpen ? 'transition-popper' : undefined;
        
        const searchRef = useRef();
        const reset = () => {
            searchRef.current.value = "";
        };

        const[addedTags, setAddedTags] = useState(new Map());

    const handleClickAddTag = (name) => {
        const old = addedTags;
        old.set(name.userName, name);
        setAddedTags(old);
        
        reset();
        dispatch(searchUsersAction(""));
    };

    const removeTag = (user) => {
        addedTags.delete(user);
        setOpenTag(false);
    };

    const history = useHistory();
    const[url, setUrl] = useState(null);
    const[uploadFileDetails, setUploadFileDetails] = useState(new Map());
    const[uploadPostsData, setUploadPostsData] = useState([]);

    const handleCloseCreatePost = () => {
        setOpenPost(false);
        setPictures([]);
        setPostIdx(0);
        setAddedTags(new Map());
        setUploadFileDetails(new Map());
        setUploadPostsData([]);
        setCaption("");
        setDestination("");
        setnextIdx(0);
        history.push("/");
    };

    const inputRef = useRef();
        const triggerFileSelectPopup = () => inputRef.current.click();

        const onSelectFile = (event) => {
            if (event.target.files && event.target.files.length > 0) {
                const tempArr = [];

                [...event.target.files].forEach(file => {
                    tempArr.push({
                    data: file,
                    url: URL.createObjectURL(file),
                    type: file.type.split("/")[0]
                    });
                });

                setPictures(tempArr);
            }
          };

          const[beforeUploadPost, setBeforeUploadPost] = useState(new Map());
          useEffect(() => {
            if(cropData != null) {
                const map = beforeUploadPost;
                map.set(postIdx, cropData);
                setBeforeUploadPost(map);
            }
            
          }, [cropData, postIdx]);


          //------- Posting the image to cloudinary

        useEffect(() => {
        if(cropData !== null){
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
        
        setUrl(imageData.url);
        
        const temp = {
            id : imageData.asset_id,
            url: imageData.url
        }
        const old = uploadFileDetails; 
        old.set(imageData.asset_id, temp);
        setUploadFileDetails(old);
        });
    }
    }, [cropData, uploadFileDetails]);

    useEffect(() => {
        if(url !== null || url !== undefined) {
            setUploadPostsData(old => [...old, url]);
        }
        setUrl(null);
    }, [url]);

    const uploadPost = () => {
        const upload_id = [];
        const upload_images = [];
        Array.from(uploadFileDetails.keys()).map(key => upload_id.push(key));
        Array.from(uploadFileDetails.values()).map(key => upload_images.push(key?.url));
        
        if(upload_images.length > 0 && caption.length > 0 && destination.length > 0 && addedTags.size > 0)
        dispatch(addPostAction(upload_images, caption, destination, Array.from(addedTags.values()), upload_id))
    }

    const {loading : postLoading, success : successfulUpload} = useSelector(state => state.addPost);
        useEffect(() => {
            if(successfulUpload) {
                handleCloseCreatePost();
                dispatch(getPostsAction());
                dispatch({
                    type:ADD_POSTS_REMOVE
                });
            }
        }, [successfulUpload]);

    useEffect(() => {
        setOpenPost(!openPost);
    }, []);

  return (
    <div>
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
            <div className="AddPost">
                    <div className="AddPostTop">

                    <div>
                        <span>Add New Post</span> 
                    </div>
                    {/* <div className="nextButtonContainer">
                    {(pictures?.length > 1 || pictures[0]?.url.length > 0) && (uploadFileDetails.size === pictures?.length) && nextIdx === 0
                        ? <Button onClick={towardEnd} className="nextButton">Next</Button> : <div style={{display:"none"}} />}
                    {nextIdx === 1 && <Button onClick={uploadPost} className="nextButton">Share</Button>}
                    </div> */}

                    <div className="nextButtonContainer">
                    {pictures.length > 0 && nextIdx !== 1
                        ? 
                        <Button onClick={towardEnd} className="nextButton">Next</Button>
                        : 
                        <div style={{display:"none"}} />
                    }
                    {nextIdx === 1 && <Button onClick={uploadPost} className="nextButton">Share</Button>}
                    </div>
                    

                    </div>
                    {
                        nextIdx === 0 
                        ?
                        <div>
                    {
                        pictures?.length > 1 || pictures[0]?.url.length > 0
                        ?
                        <div style={{position:"relative"}}>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <div className={`${pictures[postIdx].type === "image" ? "uploadPost" : "uploadVideo"}`}>
                                {pictures[postIdx].type === "image" 
                                ?
                                <CropImage post={pictures[postIdx].url} getCropData={getCropData} />
                                :
                                <video style={{width:"100%", height:"65vh"}} src={pictures[postIdx].url} 
                                autoPlay={true} 
                                controlsList="nodownload nofullscreen"
                                />
                                }
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
                        <div className="AddPostMiddle">
                        <img src="https://res.cloudinary.com/cqn/image/upload/v1643128901/Screenshot_2022-01-25_221020_v5krhh.png" alt="logo" />
                        <Button onClick={triggerFileSelectPopup}  className="AddPostMiddleButton">
                        <PhotoCameraIcon style={{fontSize:"30px", color:"#fff", marginRight:"10px"}} />
                            Add photo
                        </Button>
                        <input type="file" multiple accept="image/*, video/*" ref={inputRef} onChange={onSelectFile} style={{display:"none"}} />
                        </div>
                    }
                    </div>
                    :
                    nextIdx === 1 && 
                    <div className="post__lastContainer">
                    {postLoading && <SlidingLoader length={700} />}
                        <div style={{width:"400px", height:"600px", position:"relative"}}>
                            {
                            <Carousel 
                            navButtonsAlwaysVisible 
                            indicators={false}
                            autoPlay = {false}
                            cycleNavigation={false} 
                            animation={"slide"}>
                                {
                                    Array.from(uploadFileDetails.values()).map( (data, i) => <img style={{width:"450px", height:"600px", objectFit:"cover"}} key={data?.id} src={data} alt="img" /> )
                                } 
                            </Carousel>
                            }
                            


                            {addedTags.size > 0 && <div style={{position:"absolute", bottom:"10px", left:"10px", zIndex:"100"}}>
                                <IconButton onClick={handleClickPopTag}>
                                <AccountCircle className="pulse" />
                                </IconButton>

                                
                            </div>}
                            <div>
                            <Popper style={{position:"absolute", zIndex:"1400", top:"512px", left:"276px"}} placement={"top"} id={id} open={openTag} anchorEl={anchorEl} transition>
                                    {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Box sx={{ border: 1, p: 1, bgcolor: '#0e0d0d' }} style={{borderRadius:"10px", marginLeft:"130px"}}>
                                        <div>
                                            {
                                                Array.from(addedTags.values()).map((key, i) => (
                                                    <div key={i} style={{display:"flex", alignItems:"center"}}>
                                                        <Avatar src={key?.profilePic} style={{marginRight:"8px", marginBottom:"10px"}} />
                                                        <span style={{color:"#fff"}}>{key?.userName}</span>
                                                        <CancelIcon onClick={() => removeTag(key?.userName)} style={{color:"#fff", cursor:"pointer", marginLeft:"5px"}} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        </Box>
                                    </Fade>
                                    )}
                                </Popper>
                            </div>
                        </div>

                        <div className="post__captionContainer">
                            <div className="post__captionContainerInfo">
                                <Avatar style={{marginRight:"8px"}} src={userInfo?.profilePic}  />
                                <span>{userInfo?.firstName + " " + userInfo?.lastName}</span>
                            </div>
                            <div className="post__captionInput">
                                <textarea maxLength="2200" placeholder="Write a Caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />

                                <div>
                                <span style={{color:"lightgray"}}>{2200 - caption.length}/2,200</span>
                                </div>
                                <IconButton style={{position:"absolute", top:"239px", right:"-140px"}} onClick={() => setShowEmoji(!showEmoji)}>
                                    <EmojiEmotionsOutlinedIcon />
                                    </IconButton>
                                    {
                                    showEmoji 
                                    &&
                                    <div style={{zIndex:"100", position:"absolute", top:"268px", right:"-140px"}}>
                                    <Picker
                                    onEmojiClick={onEmojiClick}
                                    disableAutoFocus={true}
                                    groupNames={{ smileys_people: 'PEOPLE' }}
                                    native
                                    />
                                    </div>
                                }
                            </div>

                            <div className="post__location">
                                <AddLocationAltOutlinedIcon />
                                <input maxLength="50" onChange={(e) => setDestination(e.target.value)} placeholder="Add Your Destination" />
                            </div>

                            <div>
                                <div className="post__tag">
                                <label>Tag:</label>
                                <input type="text" ref={searchRef} onChange={(e) => handleChangeTag(e)} />
                                {/* <Button variant="outlined" style={{textTransform:"inherit", height:"20px"}}>Add</Button> */}
                                </div>
                                
                                {
                                    users?.length > 0 
                                    ?
                                    <div className="search">
                                    <ul style={{listStyleType:"none"}}>
                                    {users?.map((user, i) => (
                                        <li key={i} onClick={() => handleClickAddTag(user)} className="search__results">
                                            <Avatar src={user?.profilePic} />
                                            <span style={{marginLeft:"10px"}}>{user?.userName}</span>
                                        </li>
                                    ))}
                                    </ul>
                                    
                                    </div>
                                    :
                                    loadingPost && 
                                        <CircularProgress style={{width:"30px", height:"30px", marginLeft:"80px", color:"gray"}} />
                                    
                                }
                            </div>
                        </div>
                    </div>

                    }
            </div>
            </Box>
            </Fade>
            </Modal>
        </div>
    </div>
  )
}

export default AddPost
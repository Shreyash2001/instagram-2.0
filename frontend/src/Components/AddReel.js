import React, { useEffect, useRef, useState } from 'react';
import "./AddReel.css";
import { Avatar, Box, Button, CircularProgress, Fade, IconButton, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SlidingLoader from './SlidingLoader';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import Picker from 'emoji-picker-react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Popper from '@mui/material/Popper';
import CancelIcon from '@mui/icons-material/Cancel';
import { searchUsersAction } from '../actions/userActions';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { addReelAction, getAllReelsAction } from '../actions/reelsAction';
import { ADD_REELS_REMOVE } from '../constants/reelConstants';

function AddReel({setOpen}) {
    const {userInfo} = useSelector(state => state.userLogin);
    const {loading, success} = useSelector(state => state.addReel);

    const style = {
        position: 'absolute',
        top: '49%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 552,
        maxWidth: 852,
        height: 600,
        outline:'none',
        };
    
    const [open, setOpenCurr] = useState(false);
    const [page, setPage] = useState(0);
    const [reelInfo, setReelInfo] = useState(null);
    
    const handleClose = () => {
        setOpen(false);
        if(success) {
            dispatch({type: ADD_REELS_REMOVE});
        }
    }
    const [cloudinaryLoading, setCloudinaryLoading] = useState(false);
    const dispatch = useDispatch();
    const uploadReelVideo = () => {
        setCloudinaryLoading(true);
        const data = new FormData()
                  data.append('file', video)
                  data.append('upload_preset', 'insta_clone')
                  data.append('cloud_name', 'cqn')
        fetch('https://api.cloudinary.com/v1_1/cqn/auto/upload', {
          method: 'post',
          body:data,
          loadingPreview:true,
        })
        .then(res=>res.json())
        .then(imageData => {
            const story = {
                url : imageData.url,
                id: imageData.asset_id
            }
            setReelInfo(story);
            setCloudinaryLoading(false);
            setPage(2);
        });
        
    };

    useEffect(() => {
        setOpen(true)
        setOpenCurr(true)
    }, []);

    //Selecting files
    const [video, setVideo] = useState(null);
    const inputRef = useRef();
    const triggerFileSelectPopup = () => inputRef.current.click();

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.addEventListener("load", () => {
            setVideo(reader.result);
          }); 
          setPage(1);
        }
    
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

        var {loading : loadingPost, users} = useSelector(state => state.searchUserResult);
        users = users?.filter(user => user?.userName !== userInfo?.userName);

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

    const uploadReel = () => {
        dispatch(addReelAction(reelInfo.url, reelInfo.id, caption, destination, Array.from(addedTags.values())))
    };

    useEffect(() => {
        if(success) {
            dispatch(getAllReelsAction());
            handleClose();
        }
    }, [success])

  return (
    <div>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <div className="addReelContainer">
                    <div className="addReel__top">
                        <span>Add New Reel</span>
                    </div>
                    {cloudinaryLoading && <div style={{width:"552px"}}>
                        <SlidingLoader length={552} />
                    </div>}

                    {video === null && page === 0
                    &&
                    <div>
                        <div className="addReelImage">
                            <img src="https://res.cloudinary.com/cqn/image/upload/v1643128901/Screenshot_2022-01-25_221020_v5krhh.png" alt="logo" />
                        </div>
                        <div className="addReelButton">
                            <Button onClick={triggerFileSelectPopup}>Select from this device</Button>
                            <input type="file" multiple accept="video/*" ref={inputRef} onChange={onSelectFile} style={{display:"none"}} />
                        </div>
                    </div>
                    }

                    {page === 1
                    &&
                    <div>
                        <video muted autoPlay className="addReelSelectedImage" src={video} alt="" />
                        <div className="addReelButtonShare">
                            <Button onClick={uploadReelVideo}>Next</Button>
                        </div>
                    </div>
                    }
                    {
                        page === 2
                        &&
                        <div className="UploadReelInfo">
                        <div className="uploadReelLeft">
                            <video muted autoPlay loop src={reelInfo.url} />
                        </div>
                        {addedTags.size > 0 
                            && 
                            <div style={{position:"absolute", 
                            bottom:"-38px", 
                            left:"10px", 
                            zIndex:"100"}}>
                                <IconButton onClick={handleClickPopTag}>
                                <AccountCircle className="pulse" />
                                </IconButton>

                                
                            </div>}
                            <div>
                            <Popper 
                            style={{position:"absolute", 
                            zIndex:"1400", 
                            top:"512px", 
                            left:"276px"}} 
                            placement={"top"} 
                            id={id} 
                            open={openTag} 
                            anchorEl={anchorEl} 
                            transition>
                                    {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Box sx={{ border: 1, p: 1, bgcolor: '#0e0d0d' }} style={{borderRadius:"10px", marginLeft:"130px"}}>
                                        <div>
                                            {
                                                Array.from(addedTags.values()).map((key, i) => (
                                                    <div key={i} style={{display:"flex", alignItems:"center"}}>
                                                        <Avatar src={key?.profilePic} style={{marginRight:"8px", marginBottom:"10px"}} />
                                                        <span style={{color:"#fff"}}>{key?.userName}</span>
                                                        <CancelIcon onClick={() => removeTag(key?.userName)} 
                                                        style={{color:"#fff", cursor:"pointer", marginLeft:"5px"}} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        </Box>
                                    </Fade>
                                    )}
                                </Popper>
                            </div>

                        <div className="reelCaptionContainer">
                        <div className="reel__captionContainerInfo">
                                <Avatar style={{marginRight:"8px"}} src={userInfo?.profilePic}  />
                                <span>{userInfo?.firstName + " " + userInfo?.lastName}</span>
                            </div>
                            <div className="reel__captionInput">
                                <textarea maxLength="2200" placeholder="Write a Caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />

                                <div>
                                <span style={{color:"lightgray"}}>{2200 - caption.length}/2,200</span>
                                </div>
                                <IconButton style={{position:"absolute", top:"242px", right:"20px"}} onClick={() => setShowEmoji(!showEmoji)}>
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
                            

                            <div className="reel__location">
                                <AddLocationAltOutlinedIcon />
                                <input maxLength="50" onChange={(e) => setDestination(e.target.value)} placeholder="Add Your Destination" />
                            </div>

                            <div>
                                <div className="reel__tag">
                                    <label>Tag:</label>
                                    <input type="text" ref={searchRef} onChange={(e) => handleChangeTag(e)} />
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
                            {caption.length !== 0 && caption.trim().length !== 0
                            ? 
                            <div className="post__button">
                                <Button onClick={uploadReel}>Post</Button>
                            </div>
                            :
                            <div className="post__buttonDisabled">
                                <Button disabled>Post</Button>
                            </div>
                            }
                        </div>
                        
                        </div>

                    }
                </div>
                
            </Box>
        </Modal>
    </div>
  )
}

export default AddReel
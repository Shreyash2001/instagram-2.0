import React, { useEffect, useRef, useState } from 'react';
import "./AddReel.css";
import { Avatar, Box, Button, IconButton, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SlidingLoader from './SlidingLoader';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import Picker from 'emoji-picker-react';
import ReelCard from './ReelCard';

function AddReel({setOpen}) {
    const {userInfo} = useSelector(state => state.userLogin);
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
    console.log(reelInfo)
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
                        <div>
                            <ReelCard url={reelInfo.url} />
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
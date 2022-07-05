import React, { useEffect, useRef, useState } from 'react';
import "./AddReel.css";
import { Box, Button, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addStoryAction, getStoriesAction } from '../actions/storiesAction';
import { ADD_STORY_REMOVE } from '../constants/storyConstants';
import SlidingLoader from './SlidingLoader';

function AddReel({setOpen}) {

    const style = {
        position: 'absolute',
        top: '49%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 552,
        height: 600,
        outline:'none',
        };
    
    const [open, setOpenCurr] = useState(false);
    
    const history = useHistory();
    const handleClose = () => {
        setOpen(false);
        // history.push("/");
    }

    const dispatch = useDispatch();
    const uploadStory = () => {
        const data = new FormData()
                  data.append('file', video)
                  data.append('upload_preset', 'insta_clone')
                  data.append('cloud_name', 'cqn')
        fetch('https://api.cloudinary.com/v1_1/cqn/image/upload', {
          method: 'post',
          body:data,
          loadingPreview:true,
        })
        .then(res=>res.json())
        .then(imageData => {
            const story = {
                file : imageData.url,
                fileId: imageData.asset_id
            }
            dispatch(addStoryAction({story}));
            dispatch(getStoriesAction());
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
        }
      };


      //successful story upload
      const {success, loading} = useSelector(state => state.currentStoryInfo);

      useEffect(() => {
        if(success) {
            setOpen(false);
            history.push("/");
            dispatch({
                type: ADD_STORY_REMOVE,
            });
        }
      }, [success, history]);

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
                    {loading && <div style={{width:"552px"}}>
                        <SlidingLoader length={552} />
                    </div>}

                    {video === null 
                    ?
                     <div className="addReelImage">
                        <img src="https://res.cloudinary.com/cqn/image/upload/v1643128901/Screenshot_2022-01-25_221020_v5krhh.png" alt="logo" />
                    </div>
                    :
                    <div>
                        <video muted autoPlay className="addReelSelectedImage" src={video} alt="" />
                    </div>
                    }

                    {video === null 
                    ? 
                    <div className="addReelButton">
                        <Button onClick={triggerFileSelectPopup}>Select from this device</Button>
                        <input type="file" multiple accept="video/*" ref={inputRef} onChange={onSelectFile} style={{display:"none"}} />
                    </div>
                    :
                    <div className="addReelButtonShare">
                        <Button onClick={uploadStory}>Share</Button>
                    </div>
                    }
                </div>
            </Box>
        </Modal>
    </div>
  )
}

export default AddReel
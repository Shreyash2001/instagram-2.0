import React, { useEffect, useRef, useState } from 'react';
import "./AddStory.css";
import { Box, Button, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addStoryAction, getStoriesAction } from '../actions/storiesAction';
import { ADD_STORY_REMOVE } from '../constants/storyConstants';
import SlidingLoader from './SlidingLoader';

function AddStory() {

    //modal opening and closing
    const style = {
        position: 'absolute',
        top: '49%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 552,
        height: 600,
        outline:'none',
        };
    
    const [open, setOpen] = useState(false);
    
    const history = useHistory();
    const handleClose = () => {
        setOpen(false);
        history.push("/");
    }

    const dispatch = useDispatch();
    const uploadStory = () => {
        const data = new FormData()
                  data.append('file', image)
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
    }, []);

    //Selecting files
    const [image, setImage] = useState(null);
    const inputRef = useRef();
    const triggerFileSelectPopup = () => inputRef.current.click();

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.addEventListener("load", () => {
            setImage(reader.result);
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
                style={{backgroundColor:"#222"}}
            >
            <Box sx={style}>
            <div className="addStoryContainer">
                    <div className="addStory__top">
                        <span>Add New Story</span>
                    </div>
                    {loading && <div style={{width:"552px"}}>
                        <SlidingLoader length={552} />
                    </div>}

                    {image === null 
                    ?
                     <div className="addStoryImage">
                        <img src="https://res.cloudinary.com/cqn/image/upload/v1643128901/Screenshot_2022-01-25_221020_v5krhh.png" alt="logo" />
                    </div>
                    :
                    <div>
                        <img className="addStorySelectedImage" src={image} alt="" />
                    </div>
                    }

                    {image === null 
                    ? 
                    <div className="addStoryButton">
                        <Button onClick={triggerFileSelectPopup}>Select from this device</Button>
                        <input type="file" multiple accept="image/*" ref={inputRef} onChange={onSelectFile} style={{display:"none"}} />
                    </div>
                    :
                    <div className="addStoryButtonShare">
                        <Button onClick={uploadStory}>Share</Button>
                    </div>
                    }
                </div>
            </Box>
        </Modal>
    </div>
  )
}

export default AddStory
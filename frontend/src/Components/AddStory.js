import { Box, Button, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addStoryAction, getStoriesAction } from '../actions/storiesAction';

function AddStory() {

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
        const [sendStory, setSendStory] = useState({});

        const handleClose = () => setOpen(false);

        const dispatch = useDispatch();
        const uploadStory = () => {
            dispatch(addStoryAction(sendStory));
            dispatch(getStoriesAction());
          };

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
            <div className="homeMiddle__addStory">
                    <div className="homeMiddle__addStoryTop">
                        <span>Add New Story</span>
                    </div>

                </div>
            </Box>
        </Modal>
    </div>
  )
}

export default AddStory
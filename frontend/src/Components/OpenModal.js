import React, { useEffect, useState } from 'react';
import "./OpenModal.css";
import Modal from '@mui/material/Modal';
import { Avatar, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

function OpenModal({closeTags, tags}) {
      const {userInfo} = useSelector(state => state.userLogin);
      const [open, setOpen] = useState(false);
      const handleOpen = () => {
        setOpen(true);
      };
     const handleClose = () => {
        setOpen(false);
        closeTags(false);
     };

     useEffect(() => {
        handleOpen();
      }, []);

  return (
    <div>
        <Modal
        style={{backgroundColor: "#22222285"}}
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="modal_container">
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{padding:"10px"}}>
              <h2>Tags:</h2>
            </div>
            <div>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <div className="tag_container">
            {
              tags?.tags?.map((tag) => (
                <div className="tag_info">
                  <div>
                    <Avatar style={{width:"60px", height:"60px", marginTop:"20px"}} src={tag?.profilePic} />
                  </div>
                  <div>
                    <h4 style={{marginBottom:"3px", fontSize:"18px"}}>{tag?.userName}</h4>
                    <span style={{fontSize:"14px"}}>{tag?.firstName + " " + tag?.lastName}</span>
                  </div>
                  
                  { userInfo?.following?.includes(tag?._id)
                  ?
                    <div style={{marginTop:"20px"}}>
                      <Button className="button_following">Following</Button>
                    </div>
                  :
                    <div style={{marginTop:"20px"}}>
                      <Button className="button_follow">Follow</Button>
                    </div>
                  }
                </div>
              ))
            }
          </div>

        </div>
      </Modal>
    </div>
  )
}

export default OpenModal
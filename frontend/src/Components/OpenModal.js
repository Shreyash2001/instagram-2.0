import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

function OpenModal({closeTags}) {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: 'none',
      boxShadow: 24,
      p: 4,
      };
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
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Tagged</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default OpenModal
import {React, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';

function PostById() {
    const history = useHistory();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 950,
        height: 680,
        maxWidth: 1200,
        outline:'none'
      };
    
      const [open, setOpen] = useState(false);
      const handleOpen = () => {
          setOpen(true);
      }
      const handleClose = () => {
          setOpen(false);
          history.push('/');
        }

      useEffect(() => {
        handleOpen();
      }, []);

  return (
    <div>
        <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box style={{backgroundColor:"#fff"}} sx={style}>
                  <div>

                  </div>
                </Box>
              </Modal>
            </div>
    </div>
  )
}

export default PostById
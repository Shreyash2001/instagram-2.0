import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

function Notification() {
  const [open, setOpen] = useState(false);
  const {userInfo} = useSelector(state => state.userLogin);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect( () => {
    var es = new EventSource("http://localhost:5000/stream");

    es.addEventListener ("post", (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        if(data?.postedBy?.followers?.includes(userInfo?._id))
        setOpen(true);
    })

  }, [userInfo]);
  return (
    <div>
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={"abcd"}
      action={action}
    />
  </div>
  )
}

export default Notification
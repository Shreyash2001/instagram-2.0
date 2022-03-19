import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Test() {
    const [ facts, setFacts ] = useState([]);
  const [ listening, setListening ] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

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
    // es.onmessage = (e) => {
    //     const data = JSON.parse(e.data);
    //     setFacts(data);
    //     setOpen(true);
    // }

    es.addEventListener ("post", (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        setOpen(true);
    })

  }, []);
  return (
    <div>
    <Button onClick={handleClick}>Open simple snackbar</Button>
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

export default Test
import {React, useEffect, useState} from 'react';
import "./PostbyId.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Avatar, Button } from '@mui/material';

function PostById() {
    const [postData, setPostData] = useState({});
    const history = useHistory();
    const id = window.location.pathname.split("/")[2];

    const posts = JSON.parse(sessionStorage.getItem("Instagram-Posts"));

    useEffect(() => {
        setPostData(posts.find((post) => post.id === id))
    }, [id]);
    

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

      console.log(postData);

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
                <div className="post__left">
                    <div className="post__leftImageContainer">
                    <Carousel 
                      navButtonsAlwaysVisible 
                      indicators={false}
                      autoPlay = {false}
                      cycleNavigation={false} 
                      animation={"slide"}>
                          {
                              postData?.images?.map( (data, i) => (
                                <img style={{width:"550px", height:"800px"}} 
                                key={i} src={data} 
                                alt="img" />))
                          } 
                    </Carousel>
                    </div>

                    <div className="post__right">
                        <div className="post__rightTop">
                            <div>
                              <Avatar src={postData?.profilePic} />
                            </div>
                            <div className="post__rightTopinfo">
                              <span>{postData?.username}</span>
                              <span>•</span>
                              <Button>Follow</Button>
                            </div>
                        </div>
                    </div>

                  </div>
                </Box>
              </Modal>
            </div>
    </div>
  )
}

export default PostById
import {React, useEffect, useState} from 'react';
import "./PostbyId.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Avatar, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Picker from 'emoji-picker-react';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

function PostById() {
    const [postData, setPostData] = useState({});
    const [show, setShow] = useState(false);
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

        const onEmojiClick = (event, emojiObject) => {
          if(emojiObject !== null) {
            // var already = comment;
            // already += " " + emojiObject?.emoji;
            // setComment(already);
          }
        };

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
                    
                  <div className="post__rightContainer">
                      <div className="post__right">
                        <div className="post__rightTop">
                          <div>
                            <Avatar src={postData?.profilePic} />
                          </div>
                          <div>
                            <h4 style={{margin:"0"}}>{postData?.username}</h4>
                            <span style={{fontSize:"12px"}}>{postData?.location}</span>
                          </div>
                          <div>
                            <span>•</span>
                          </div>
                          <div>
                            <button className="followButton">Follow</button>
                          </div>
                        </div>
                        <div>
                          <IconButton>
                          <MoreHorizIcon />
                          </IconButton>
                        </div>
                      </div>

                      <div className="post__commentSection">
                        
                      </div>
                      
                      <div className="post__downContainer">
                      <div className="post__buttons">
                          <div>
                            <div>
                              <IconButton>
                                <FavoriteBorderIcon />
                              </IconButton>
                            </div>
                            <div>
                            <IconButton>
                              <ChatBubbleOutlineIcon />
                            </IconButton>
                            </div>
                            <div>
                            <IconButton>
                              <SendIcon />
                            </IconButton>
                            </div>
                          </div>
                          
                          <div>
                          <IconButton>
                            <BookmarkBorderIcon />
                          </IconButton>
                          </div>
                      </div>

                      <div>
                        <p style={{margin:"10px 0 5px 10px"}}>12,22 likes</p>
                      </div>

                      <div>
                        <span style={{fontSize:"12px", marginLeft:"10px"}}>1 day ago</span>
                      </div>
                    </div>
                    
                    <div className="post__addComment">
                      <div>
                      <IconButton onClick={() => setShow(!show)}>
                          <EmojiEmotionsOutlinedIcon />
                        </IconButton>
                        {
                        show 
                        &&
                        <div style={{zIndex:"100", position:"absolute", bottom:"50px", left:"0px"}}>
                        <Picker
                          onEmojiClick={onEmojiClick}
                          disableAutoFocus={true}
                          groupNames={{ smileys_people: 'PEOPLE' }}
                          native
                        />
                      </div>
                        }
                        </div>

                        <div>
                        <textarea className="post__addCommentInput" placeholder="Add comment" />
                        </div>

                        <div>
                            <button className="followButton">Post</button>
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
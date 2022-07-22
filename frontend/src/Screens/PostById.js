import {React, useEffect, useRef, useState} from 'react';
import "./PostbyId.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import { Avatar, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { addCommentAction, addLikeAction, removeCommentData } from '../actions/postsAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import moment from "moment";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OpenModal from '../Components/OpenModal';

function PostById({incomingFrom, temp, openCloseReel}) {
    const [postData, setPostData] = useState({});
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState("");
    const [showPostButton, setShowPostButton] = useState(false);
    const history = useHistory();

    var id = window.location.pathname.split("/")[2];
    if(incomingFrom.name === "user_details") {
      id = incomingFrom.id;
    };

    if(incomingFrom.name === "reels") {
      id = incomingFrom.id;
    }
    // const id = incomingFrom.name !== "user_details" ? (window.location.pathname.split("/")[2]) : incomingFrom.id;

    var posts = JSON.parse(sessionStorage.getItem("Instagram-Posts"));
    if(incomingFrom.name === "user_details") {
      posts = JSON.parse(sessionStorage.getItem("Instagram-UserDetails"));
    };

    if(incomingFrom.name === "reels") {
      posts = JSON.parse(sessionStorage.getItem("Instagram-Reels"));
    }
    // const posts = incomingFrom.name !== "user_details" ? JSON.parse(sessionStorage.getItem("Instagram-Posts")) : JSON.parse(sessionStorage.getItem("Instagram-UserDetails"));

    const dispatch = useDispatch();
    const {info, success, loading} = useSelector(state => state.commentAdded);
    const {userInfo} = useSelector(state => state.userLogin);

    const setUpGeneralObject = (post) => {
      if(incomingFrom.name === "reels") {
      return {
        caption: post?.caption,
        comments: post?.comments,
        createdAt: post?.createdAt,
        image: ["Video -> " + post?.video],
        image_cloudinary_id: post?.cloudinary_video_id,
        likes: post?.likes,
        location: post?.destination,
        postedBy: post?.createdBy,
        report: post?.reports,
        tags: post?.tags,
        updatedAt: post?.updatedAt,
        _id: post?._id,
      };
    } else {
        return post;
      }
    };

  const [showMute, setShowMute] = useState(true);
  const refVideo = useRef(null);

  const handleUnmute = () => {
    refVideo.current.defaultMuted = false;
    refVideo.current.muted = false;
    setShowMute(false);
  };

  const handleMute = () => {
    refVideo.current.defaultMuted = true;
    refVideo.current.muted = true;
    setShowMute(true);
  };

  const [openTag, setOpenTag] = useState(false);
  const openTags = () => {
    setOpenTag(true);
  }

    useEffect(() => {
      setPostData(setUpGeneralObject(posts.find((post) => post._id === id)));
  }, [id]);

  useEffect(() => {
    if(success) {
      setComment("");
      setShowPostButton(false);
      postData?.comments.push(info);
      const find = posts.find((post) => post._id === id);
      find?.comments.push(info);
      sessionStorage.setItem("Instagram-Posts", JSON.stringify(posts));
      dispatch(removeCommentData());
    }
  }, [success, postData, info, posts]);


    const [like, setLike] = useState(false);
    const [countLike, setCountLike] = useState(0);
    const [bookmark, setBookmark] = useState(false);

    useEffect(() => {
      if(postData?.likes?.includes(userInfo._id)) {
        setLike(true);
        setCountLike(postData?.likes?.length);
      }
    }, [postData, userInfo])

    const handleLikeClick = () => {
      setLike(!like);
      dispatch(addLikeAction(id));
      setCountLike(countLike + 1);
      const find = posts.find((post) => post._id === id);
      find?.likes.push(userInfo?._id);
      sessionStorage.setItem("Instagram-Posts", JSON.stringify(posts));
    };
  
    const handleLikeRemoveClick = () => {
      setLike(!like);
      dispatch(addLikeAction(id));
      setCountLike(countLike - 1);
    };
  
    const handleClickBookmark = () => {
      setBookmark(!bookmark);
    };


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
          if(incomingFrom.name === "feed")
          history.push('/');

          if(incomingFrom.name === "user_details")
          temp(false);

          if(incomingFrom.name === "reels")
          openCloseReel(false);
        }

        const onEmojiClick = (event, emojiObject) => {
          if(emojiObject !== null) {
            var already = comment;
            already += " " + emojiObject?.emoji;
            setComment(already);
          }
        };

        const handleChange = (e) => {
          const str = e.target.value;
          let check = str.replace(/ /g, "");
      
          if(check.length > 0) setShowPostButton(true)
          else setShowPostButton(false)
          setComment(str);
        };

        const addComment = () => {
          comment.split(' ').filter(word => word).join(' ');
          dispatch(addCommentAction(id, comment));
        };

      useEffect(() => {
        handleOpen();
      }, []);

      useEffect(() => {
        if(incomingFrom.openCurr === true)
        handleOpen();
      }, [incomingFrom]);


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
                              postData?.image?.map((data, i) => (
                                data.split("->")[0].startsWith("I")
                                ?
                                <img style={{width:"525px", height:"800px"}} 
                                key={i} 
                                src={data.split("->")[1]} 
                                alt="img" /> 
                                :
                                <>
                                {
                                showMute 
                                ? 
                                <VolumeOffIcon 
                                className="volume"
                                onClick={handleUnmute} />
                                :
                                <VolumeUpIcon 
                                className="volume" 
                                onClick={handleMute} />
                                }
                                <video style={{width:"525px", height:"800px", objectFit:"fill"}} 
                                  key={i}
                                  src={data.split("->")[1]}
                                  muted
                                  autoPlay={true}
                                  ref={refVideo} 
                                />
                                </>
                                ))
                          } 
                      </Carousel>
                      <div onClick={openTags} className="showTags">
                        <AccountCircleIcon style={{color:"#fff"}} />
                      </div>
                    </div>
                    
                  <div className="post__rightContainer">
                      <div className="post__right">
                        <div className="post__rightTop">
                          <div>
                            <Avatar src={postData?.postedBy?.profilePic} />
                          </div>
                          <div>
                            <p style={{margin:"0", fontSize:"16px", fontWeight:"500"}}>{postData?.postedBy?.userName}</p>
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
                      <div style={{display:"flex", padding:"10px"}}>  
                        <div style={{marginRight:"10px"}}>
                          <Avatar src={postData?.postedBy?.profilePic} />
                        </div>
                        <div>
                          <span style={{margin:"0", fontSize:"16px", fontWeight:"500"}}>{postData?.postedBy?.userName}</span>
                          <span className="caption">{postData?.caption}</span>
                          <div style={{marginTop:"10px"}}>
                            <span style={{fontSize:"12px"}}>Edited 2d</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {postData?.comments?.map((comment, i) => (
                          <div key={i} style={{display:"flex", padding:"10px"}}>
                            <div style={{marginRight:"10px"}}>
                              <Avatar src={comment?.profilePic} />
                            </div>
                            <div>
                              <span style={{margin:"0", fontSize:"16px", fontWeight:"500"}}>{comment?.userName}</span>
                              <span className="caption">{comment?.comment}</span>
                              <div className="comment_options" style={{display:"flex", alignItems:"center"}}>
                                <p style={{fontSize:"12px", marginRight:"10px"}}>{moment(comment?.createdAt).fromNow()}</p>
                                <div className="hide">
                                  <MoreHorizIcon />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      </div>

                      
                      <div className="post__downContainer">
                      <div className="post__buttons">
                          <div>
                            <div>
                            {
                              like && like 
                            ? 
                                <div className="feed__likeContainer">
                                <IconButton onClick={handleLikeRemoveClick}>
                                  <FavoriteIcon className="like" style={{color:"rgb(237, 73, 86)"}} />
                                </IconButton>
                                </div>
                            :
                                <div className="feed__likeContainer">
                                <IconButton onClick={handleLikeClick}>
                                  <FavoriteBorderIcon className="like" style={{color:"#222"}} />
                                </IconButton>
                                </div>
                              }
                            </div>
                            <div>
                            <IconButton>
                              <SendIcon />
                            </IconButton>
                            </div>
                          </div>
                          
                          <div>
                          {
                            bookmark 
                          ? 
                              <div className="feed__likeContainer">
                              <IconButton onClick={handleClickBookmark}>
                                <BookmarkIcon className="like" style={{color:"rgb(237, 73, 86)"}} />
                              </IconButton>
                              </div>
                          :
                              <div className="feed__likeContainer">
                              <IconButton onClick={handleClickBookmark}>
                                <BookmarkBorderOutlinedIcon className="like" style={{color:"#222"}} />
                              </IconButton>
                              </div>
                          }   
                          </div>
                      </div>

                      <div>
                        <p style={{margin:"10px 0 5px 10px"}}>{countLike} likes</p>
                      </div>

                      <div>
                        <span style={{fontSize:"12px", marginLeft:"10px"}}>{postData?.time}</span>
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
                        <textarea className="post__addCommentInput" placeholder="Add comment" value={comment} onChange={handleChange} />
                        </div>

                          {showPostButton ?
                          <div>
                          {
                            loading 
                            ?
                            <CircularProgress style={{width:"25px", height:"25px", marginRight:"10px"}} />
                            :
                            <button className="followButton" onClick={addComment}>Post</button>
                          }
                          </div>
                          :
                          <div style={{margin:"22px"}}>
                            
                          </div>
                          }
                    </div>


                  </div>

                  {
                    openTag && <OpenModal  />
                  }
                  </div>
                </Box>
              </Modal>
            </div>
    </div>
  )
}

export default PostById
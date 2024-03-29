import { Avatar, Button, CircularProgress, IconButton } from '@mui/material';
import {React, useState, useEffect} from 'react';
import "./FeedCard.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Picker from 'emoji-picker-react';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAction, addLikeAction, removeCommentData } from '../actions/postsAction';
import Carousel from 'react-material-ui-carousel';
import { Link, useHistory } from 'react-router-dom';
import { addBookmarkAction } from '../actions/userActions';


function FeedCard({id, name, username, images, likes, user_info, caption, location, comments, profilePic, time, currUserId, selectedPostId}) {
  const [like, setLike] = useState(likes?.includes(user_info._id));
  const [countLike, setCountLike] = useState(likes?.length);
  const [bookmark, setBookmark] = useState(false);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [showPostButton, setShowPostButton] = useState(false);

  var trimmedCaption = caption;
  if(caption?.length >= 100) {
    trimmedCaption = caption.substr(0, 100) + "...";
  }
  const dispatch = useDispatch();
  const posts = JSON.parse(sessionStorage.getItem("Instagram-Posts"));
  const {info, success, loading} = useSelector(state => state.commentAdded);

  const handleLikeClick = () => {
    setLike(!like);
    dispatch(addLikeAction(id));
    setCountLike(countLike + 1);
      const find = posts.find((post) => post._id === id);
      find?.likes.push(currUserId);
      sessionStorage.setItem("Instagram-Posts", JSON.stringify(posts));
  };

  const handleLikeRemoveClick = () => {
    setLike(!like);
    dispatch(addLikeAction(id));
    setCountLike(countLike - 1);
  };

  const handleClickBookmark = () => {
    setBookmark(!bookmark);
    dispatch(addBookmarkAction(id));
  };

  const onEmojiClick = (event, emojiObject) => {
    if(emojiObject !== null) {
      var already = comment;
      already += " " + emojiObject?.emoji;
      setComment(already);
      setShowPostButton(true);
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

  const openComments = (currId) => {
    selectedPostId(currId);
  };

  useEffect(() => {
    if(success) {
      setComment("");
      const find = posts.find((post) => post._id === id);
      find?.comments.push(info);
      sessionStorage.setItem("Instagram-Posts", JSON.stringify(posts));
      dispatch(removeCommentData());
    }
  }, [success])

  return (
    <div className="feedCard">
      <div className="feedCard__info">
        <Link to={`/details/user/${username}`} className="feedCard__infoLeft">
            <div>
                <Avatar src={profilePic} />
            </div>
            <div className="feed__infoName">
                <p>{name}</p>
                <span>{location}</span>
            </div>
          </Link>
          {user_info?.userName === username && <div>
          <IconButton>
            <MoreHorizIcon style={{fontSize:"28px"}} />
          </IconButton>
          </div>}
      </div>

      <div className="feed__image">
        <Carousel 
          navButtonsAlwaysVisible 
          indicators={false}
          autoPlay = {false}
          cycleNavigation={false} 
          animation={"slide"}>
              {
                  Array.from(images.values()).map( (data, i) => 
                  data.split("->")[0].startsWith("I")
                  ?
                  <img style={{width:"623px", height:"550px"}} 
                  key={i} 
                  src={data.split("->")[1]} 
                  alt="img" /> 
                  :
                  <video style={{width:"623px", height:"550px"}} 
                    key={i}
                    src={data.split("->")[1]}
                    muted
                    autoPlay={true} 
                  />
                  )
              } 
        </Carousel>
      </div>

      <div className="feed__belowImage">

      <div className="feed__like">
      {
        like && like 
      ? 
          <div className="feed__likeContainer">
          <IconButton onClick={handleLikeRemoveClick}>
            <FavoriteIcon className="like" style={{color:"rgb(237, 73, 86)"}} />
          </IconButton>
          <div>
            <span>{countLike} Likes</span>
          </div>
          </div>
      :
          <div className="feed__likeContainer">
          <IconButton onClick={handleLikeClick}>
            <FavoriteBorderIcon className="like" style={{color:"#222"}} />
          </IconButton>
          <div>
            <span>{countLike} Likes</span>
          </div>
          </div>
      }   
        </div>

        <div className="feed__comment">
          <div>
            <IconButton onClick={() => openComments(id)}>
              <AddCommentOutlinedIcon style={{color:"#222"}} />
            </IconButton>
          </div>
          <div>
            <span>{comments?.length} Comments</span>
          </div>
        </div>

        <div className="feed__share">
          <div>
            <IconButton>
              <ShareIcon style={{color:"#222"}} />
            </IconButton>
          </div>
          <div>
            <span>134 Share</span>
          </div>
        </div>

        <div className="feed__bookmark">
      {
        bookmark 
      ? 
          <div className="feed__likeContainer">
          <IconButton style={{marginRight:"18px"}} onClick={handleClickBookmark}>
            <BookmarkIcon className="like" style={{color:"rgb(237, 73, 86)"}} />
          </IconButton>
          </div>
      :
          <div className="feed__likeContainer">
          <IconButton style={{marginRight:"18px"}} onClick={handleClickBookmark}>
            <BookmarkBorderOutlinedIcon className="like" style={{color:"#222"}} />
          </IconButton>
          </div>
      }   
        </div>

        </div>

        <div className="feed__caption">
          <span style={{margin:"12px 10px 0px 0px", fontWeight:"700"}}>{username}</span>
          <span style={{lineHeight:"25px", fontSize:"16px"}}>{trimmedCaption}</span>
          {caption?.length >= 100 
          && 
          <div style={{color:"gray", cursor:"pointer"}}>See more</div>
          }
          <div>
            <div onClick={() => openComments(id)} style={{color:"gray",  fontSize:"14px", cursor:"pointer"}}>View all {comments.length} comments</div>
          </div>
          <div>
            <span>{time}</span>
          </div>
        </div>

        <div className="feed__addComments">
          <div>
            <Avatar src={user_info?.profilePic} />
          </div>
          <div className="feed__enterComment">
            <textarea placeholder="Add comment" value={comment} onChange={handleChange} />
            <IconButton onClick={() => setShow(!show)}>
              <EmojiEmotionsOutlinedIcon />
            </IconButton>
            {
            show 
            &&
            <div style={{zIndex:"100", position:"absolute", top:"-320px", right:"100px"}}>
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              groupNames={{ smileys_people: 'PEOPLE' }}
              native
            />
          </div>
            }
          </div>

          {showPostButton && 
          <div>
          {
            loading 
            ?
            <CircularProgress style={{width:"25px", height:"25px", marginRight:"10px"}} />
            :
            <Button onClick={addComment} style={{textTransform:"inherit", borderRadius:"22px", marginLeft:"5px"}}>Post</Button>
          }
          </div>}

        </div>
    </div>
  );
};

export default FeedCard;

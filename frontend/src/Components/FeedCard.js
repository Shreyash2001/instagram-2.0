import { Avatar, Button, IconButton } from '@mui/material';
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
import { addCommentAction, addLikeAction } from '../actions/postsAction';
import Carousel from 'react-material-ui-carousel';
import { Link, useHistory } from 'react-router-dom';


function FeedCard({id, name, username, images, likes, user_info, caption, location, profilePic, time}) {
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
  const {success} = useSelector(state => state.commentAdded);

  const handleLikeClick = () => {
    setLike(!like);
    dispatch(addLikeAction(id));
    setCountLike(countLike + 1);
  };

  const handleLikeRemoveClick = () => {
    setLike(!like);
    dispatch(addLikeAction(id));
    setCountLike(countLike - 1);
  };

  const handleClickBookmark = () => {
    setBookmark(!bookmark);
  };

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

  const history = useHistory();
  const openComments = () => {
    history.push(`/post/${id}`);
  }

  useEffect(() => {
    if(success) setComment("");
  }, [success])

  return (
    <div className="feedCard">
      <div className="feedCard__info">
        <div className="feedCard__infoLeft">
            <div>
                <Avatar src={profilePic} />
            </div>
            <div className="feed__infoName">
                <p>{name}</p>
                <span>{location}</span>
            </div>
          </div>
          {user_info?.posts.includes(id) && <div>
          <IconButton>
            <MoreHorizIcon style={{fontSize:"28px"}} />
          </IconButton>
          </div>}
      </div>

      <div className="feed__image">
        {/* <img src="https://www.greenqueen.com.hk/wp-content/uploads/2021/06/WEF-Investments-In-Nature-Based-Solutions-Have-To-Triple-By-2030-To-Address-Climate-Change-Biodiversity-Loss.jpg" alt="" /> */}
        {/* <Carousel images={images} initialIndex={0} /> */}
        <Carousel 
          navButtonsAlwaysVisible 
          indicators={false}
          autoPlay = {false}
          cycleNavigation={false} 
          animation={"slide"}>
              {
                  Array.from(images.values()).map( (data, i) => <img style={{width:"650px", height:"550px"}} key={i} src={data} alt="img" /> )
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
            <IconButton onClick={openComments}>
              <AddCommentOutlinedIcon style={{color:"#222"}} />
            </IconButton>
          </div>
          <div>
            <span>22.5k Comments</span>
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
          <Link to={`/post/${id}`} style={{color:"gray", cursor:"pointer", textDecoration:"none"}}>See more</Link>
          }
          <div>
            <span>{time}</span>
          </div>
        </div>

        <div className="feed__addComments">
          <div>
            <Avatar src={profilePic} />
          </div>
          <div className="feed__enterComment">
            <textarea placeholder="Add comment" value={comment} onChange={handleChange} />
            <IconButton onClick={() => setShow(!show)}>
              <EmojiEmotionsOutlinedIcon />
            </IconButton>
            {
            show 
            &&
            <div style={{zIndex:"100", position:"absolute", top:"50px", right:"100px"}}>
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              groupNames={{ smileys_people: 'PEOPLE' }}
              native
            />
          </div>
            }
          </div>

          {showPostButton && <div>
            <Button onClick={addComment} style={{textTransform:"inherit", borderRadius:"22px", marginLeft:"5px"}}>Post</Button>
          </div>}

        </div>
    </div>
  );
};

export default FeedCard;

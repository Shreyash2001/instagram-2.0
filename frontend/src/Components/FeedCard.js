import { Avatar, IconButton } from '@mui/material';
import {React, useState} from 'react';
import "./FeedCard.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Carousel from './Carousel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Picker from 'emoji-picker-react';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';


function FeedCard({name, images, caption, location, profilePic}) {
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");

  const handleClick = () => {
    setLike(!like);
  };

  const handleClickBookmark = () => {
    setBookmark(!bookmark);
  };

  const onEmojiClick = (event, emojiObject) => {
    if(emojiObject !== null) {
      var already = comment;
      already += " " + emojiObject?.emoji;
      setComment(already)
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

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
          <div>
          <IconButton>
            <MoreHorizIcon style={{fontSize:"28px"}} />
          </IconButton>
          </div>
      </div>

      <div className="feed__image">
        {/* <img src="https://www.greenqueen.com.hk/wp-content/uploads/2021/06/WEF-Investments-In-Nature-Based-Solutions-Have-To-Triple-By-2030-To-Address-Climate-Change-Biodiversity-Loss.jpg" alt="" /> */}
        <Carousel images={images} initialIndex={0} />
      </div>

      <div className="feed__belowImage">

      <div className="feed__like">
      {
        like 
      ? 
          <div className="feed__likeContainer">
          <IconButton onClick={handleClick}>
            <FavoriteIcon className = "like" style={{color:"rgb(237, 73, 86)"}} />
          </IconButton>
          <div>
            <span>22.5K Likes</span>
          </div>
          </div>
      :
          <div className="feed__likeContainer">
          <IconButton onClick={handleClick}>
            <FavoriteBorderIcon className = "like" style={{color:"#222"}} />
          </IconButton>
          <div>
            <span>22.5K Likes</span>
          </div>
          </div>
      }   
        </div>

        <div className="feed__comment">
          <div>
            <IconButton>
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
          <IconButton onClick={handleClickBookmark}>
            <BookmarkIcon className = "like" style={{color:"rgb(237, 73, 86)"}} />
          </IconButton>
          </div>
      :
          <div className="feed__likeContainer">
          <IconButton onClick={handleClickBookmark}>
            <BookmarkBorderOutlinedIcon className = "like" style={{color:"#222"}} />
          </IconButton>
          </div>
      }   
        </div>

        </div>

        <div className="feed__caption">
          <span style={{margin:"12px 10px 0px 0px", fontWeight:"700"}}>{name}</span>
          <span style={{lineHeight:"25px", fontSize:"16px"}}>{caption}</span>
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
          
        </div>

    </div>
  );
};

export default FeedCard;

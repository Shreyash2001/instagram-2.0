import { Avatar, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { userProfileDetailsAction } from '../actions/userActions';
import "./SetupProfile.css";
import CircularProgress from '@mui/material/CircularProgress';

function SetupProfile() {
  const [bio, setBio] = useState("");
  const [url, setUrl] = useState("");
  const inputRef = useRef();
  const triggerFileSelectPopup = () => inputRef.current.click();

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        uploadStory(reader.result);
      });  
    }
  };

  const uploadStory = (image) => {
    const data = new FormData()
              data.append('file', image)
              data.append('upload_preset', 'insta_clone')
              data.append('cloud_name', 'cqn')
    fetch('https://api.cloudinary.com/v1_1/cqn/image/upload', {
      method: 'post',
      body:data,
      loadingPreview:true,
    })
    .then(res=>res.json())
    .then(imageData => {
        setUrl(imageData.url);
    }).catch((error) => console.log("error here")); 
};

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(userProfileDetailsAction(bio, url));
  }

  const history = useHistory()
  const {success, loading} = useSelector(state => state.profileDetails);

  useEffect(() => {
    if(success) {
      history.push("/preferences");
    }
  }, [success, history]);

  return (
    <div className="setupProfile">
        <div className="heading">
          <h1>Complete your Profile details</h1>
        </div>
        <div className="profile">
        {
          url.length === 0 
          ?
          <>
          <Avatar onClick={triggerFileSelectPopup} style={{width:"200px", height:"200px", cursor:"pointer"}} />
          <input ref={inputRef} style={{display:"none"}} type="file" accept="image/*" onChange={onSelectFile} />
          </>
          :
          <Avatar src={url} style={{width:"200px", height:"200px"}}  />
        }
          
        </div>
        <div className="bio">
          <div>
            <span>Enter your Bio</span>
          </div>
          <div className="input">
            <textarea maxLength="250" placeholder="Add upto 250 words" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </div>
        <div className="addButtonContainer">
          <div>
          {
            bio === "" && url === ""
            ?
            <Button className="disabled" disabled={true} variant="contained">Next</Button>
            :
            <Button className="addButton" onClick={handleClick}>{loading ? <CircularProgress style={{color:"#fff"}} /> : "Next"}</Button>
          }
          </div>
          <div style={{marginLeft:"250px", marginTop:"10px"}}>
            <Link style={{fontSize:"18px", color:"gray"}} to="/preferences">skip</Link>
          </div>
        </div>
    </div>
  )
}

export default SetupProfile
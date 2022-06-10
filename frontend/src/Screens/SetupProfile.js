import { Avatar, Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import "./SetupProfile.css";

function SetupProfile() {
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
            <textarea />
          </div>
        </div>
        <div className="addButton">
          <Button variant="outlined">Next</Button>
        </div>
    </div>
  )
}

export default SetupProfile
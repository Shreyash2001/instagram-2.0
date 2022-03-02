import React, { useState } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./CropImage.css";
import { Button } from '@mui/material';

function CropImage({post, getCropData}) {
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();
    
      const getCrop = () => {
        if (typeof cropper !== "undefined") {
          getCropData(cropper.getCroppedCanvas().toDataURL());
        }
      };
  return (
    <div>
      <div style={{ width: "100%", padding:"8px" }}>
        {/* <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br /> */}
        <Cropper
          zoomTo={0.0}
          initialAspectRatio={16 / 9}
          preview=".img-preview"
          src={post}
          viewMode={1}
          minCropBoxHeight={50}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
      </div>
      <div>
      <Button
       className="crop__button"
       onClick={getCrop}>Save cropped image</Button>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  )
}

export default CropImage
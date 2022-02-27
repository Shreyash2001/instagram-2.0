import React, { useState } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./CropImage.css";

function CropImage({post}) {
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();
    
      const getCropData = () => {
        if (typeof cropper !== "undefined") {
          setCropData(cropper.getCroppedCanvas().toDataURL());
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
          zoomTo={0.5}
          initialAspectRatio={16 / 9}
          preview=".img-preview"
          src={post}
          viewMode={1}
          minCropBoxHeight={10}
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
      </div>
      <br style={{ clear: "both" }} />
    </div>
  )
}

export default CropImage
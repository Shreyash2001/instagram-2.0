import React, { useCallback, useState } from 'react';
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";
import Cropper from 'react-easy-crop'
import "./CropImage.css";
import { Button } from '@mui/material';
import getCroppedImg from '../utils/cropFunction';

function CropImage({post, getCropData}) {
      // const [cropper, setCropper] = useState();
      // const getCrop = () => {
      //   if (typeof cropper !== "undefined") {
      //     getCropData(cropper.getCroppedCanvas().toDataURL());
      //   }
      // };
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);

    const onCropComplete = useCallback(async(croppedArea, croppedAreaPixels) => {
        try {
          const croppedImage = await getCroppedImg(
            post,
            croppedAreaPixels
          )
          setCroppedImage(croppedImage)
          getCropData(croppedImage)
        } catch (e) {
          console.error(e)
        }
      
      setCroppedImage(croppedAreaPixels);
    }, [])
  return (

    <div style={{ width: "100%", padding:"8px", height:"400px" }}>
      <Cropper
          image={post}
          crop={crop}
          zoom={zoom}
          aspect={5/ 3}
          objectFit="horizontal-cover"
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
    </div>

    // <div>
    //   <div style={{ width: "100%", padding:"8px" }}>
    //     <Cropper
    //       zoomTo={0.0}
    //       initialAspectRatio={16 / 9}
    //       preview=".img-preview"
    //       src={post}
    //       viewMode={1}
    //       minCropBoxHeight={50}
    //       minCropBoxWidth={10}
    //       background={false}
    //       responsive={true}
    //       autoCropArea={1}
    //       checkOrientation={false}
    //       onInitialized={(instance) => {
    //         setCropper(instance);
    //       }}
    //       guides={true}
    //     />
    //   </div>
    //   <div>
    //   <Button className="crop__button" onClick={getCrop}>Crop</Button>
    //   </div>
    //   <br style={{ clear: "both" }} />
    // </div>

  )
}

export default CropImage
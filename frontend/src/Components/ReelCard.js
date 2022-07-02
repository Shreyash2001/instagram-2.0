import React from 'react';
import "./ReelCard.css";

function ReelCard() {
  return (
    <div className="reelCard">
        <video 
        src="http://res.cloudinary.com/cqn/video/upload/v1656440910/ilu7acigvxov8fpjpoke.mp4" 
        autoPlay={true}
        />
    </div>
  )
}

export default ReelCard
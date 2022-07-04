import React from 'react';
import "./ReelCard.css";

function ReelCard({url}) {
  return (
    <div className="reelCard">
        <video 
        src={url} 
        loop
        autoPlay
        muted
        />
    </div>
  )
}

export default ReelCard
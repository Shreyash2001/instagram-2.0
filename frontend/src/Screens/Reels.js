import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllReelsAction } from '../actions/reelsAction';
import ReelCard from '../Components/ReelCard';
import TopBar from '../Components/TopBar';
import "./Reels.css";

function Reels() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // if(sessionStorage.getItem("Instagram-Reels") === undefined || sessionStorage.getItem("Instagram-Reels") === null) {
    //   getAllReelsAction()
    // }
    dispatch(getAllReelsAction())

  }, []);

  return (
    <div>
        <div>
          <TopBar usedIn="reels" open={open} />
        </div>
        <div className="reelsContainer">
          <ReelCard url={"http://res.cloudinary.com/cqn/video/upload/v1656440964/vlgobswjbqdkwwiodclf.mp4"} />
          <ReelCard url={"http://res.cloudinary.com/cqn/video/upload/v1656440964/vlgobswjbqdkwwiodclf.mp4"} />
          <ReelCard url={"http://res.cloudinary.com/cqn/video/upload/v1656440964/vlgobswjbqdkwwiodclf.mp4"} />
          <ReelCard url={"http://res.cloudinary.com/cqn/video/upload/v1656440910/ilu7acigvxov8fpjpoke.mp4"} />
          <ReelCard url={"http://res.cloudinary.com/cqn/video/upload/v1656440910/ilu7acigvxov8fpjpoke.mp4"} />
          <ReelCard url={"http://res.cloudinary.com/cqn/video/upload/v1656440910/ilu7acigvxov8fpjpoke.mp4"} />
        </div>
        <div>

        </div>
    </div>
  )
}

export default Reels
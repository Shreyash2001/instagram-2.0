import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Avatar } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

export default function MouseOverPopover({user}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
      {
          user?.profilePic !== undefined 
          ?
        <img className="multipleTab__image" src={user?.profilePic} alt={user?.userName} />
          :
        <img className="multipleTab__image" src="https://res.cloudinary.com/cqn/image/upload/v1654538191/user-512_hgnuqd.png" alt="img" />
      }
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div style={{padding:"10px"}}>
            <div>
                <div style={{display:"flex"}}>
                    <div>
                        <Avatar src={user?.profilePic} alt={user?.userName} />
                    </div>
                    <div>
                        <div>
                            <h3 style={{margin:"0 0 5px 10px"}}>{user?.userName}</h3>
                        </div>
                        <div style={{display:"flex", alignItems:"center", marginBottom:"10px", marginLeft:"10px"}}>
                            <div style={{marginRight:"10px"}}>
                            <span>
                                {user?.posts?.length} posts
                            </span>
                            </div>
                            <div style={{marginRight:"8px"}}>
                            <span>
                                {user?.followers?.length} followers
                            </span>
                            </div>
                            <div style={{marginRight:"8px"}}>
                            <span>
                                {user?.following?.length} following
                            </span>
                            </div>
                        </div>
                    </div> 
                </div>
                <div style={{display:"flex"}}>
                    {user?.posts?.map((post, i) => (
                        <div key={i}>
                        { 
                            <img key={i} style={{width:"100px", height:"100px", padding:"5px"}} src={post?.image[0]} alt="img" />
                        }
                        </div>
                    ))}
                </div> 
            </div>
        </div>
      </Popover>
    </div>
  );
}
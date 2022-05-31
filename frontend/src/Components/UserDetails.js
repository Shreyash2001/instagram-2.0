import React, { useEffect } from 'react';
import "./UserDetails.css";
import { getUserDetailsAction } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button } from '@mui/material';
import TopBar from './TopBar';
import MultipleTab from './MultipleTab';
import Carousel from 'react-material-ui-carousel';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function UserDetails() {
    const username = window.location.pathname.split("/")[3];
    const dispatch = useDispatch();

    const {users, loading} = useSelector(state => state.userDetails);

    const getData = () => {
      dispatch(getUserDetailsAction(username));
    }

    useEffect(() => {
      getData()
    }, []);

  return (
    <div>
        <TopBar />
        {!loading 
        ?
        <div className="details">
        <div className="details__left">
          <div className="details__profile">
            <div className="details__top">
              <div className="details__profilePic">
                <Avatar style={{width:"100px", height:"100px"}} src={users?.profilePic} />
              </div>
              <div className="details__name">
                <span>{users?.firstName + " " + users?.lastName}</span>
              </div>
            </div>

            <div className="details__middle">
              <div>
                <h3>{users?.posts?.length}</h3>
                <span>Posts</span>
              </div>
              <div>
                <h3>{users?.followers?.length}</h3>
                <span>Followers</span>
              </div>
              <div>
                <h3>{users?.following?.length}</h3>
                <span>Following</span>
              </div>
            </div>

            <div className="details__bio">
              <span>{users?.bio}</span>
            </div>

            <div className="details__tab">
              <MultipleTab />
            </div>

            <div className="details__button">
              <Button>Follow</Button>
            </div>

          </div>
        </div>

        <div className="details__right">
          {users?.posts?.map((post) => (
            <div key={post?._id} className="details__card">
            <Carousel 
            navButtonsAlwaysVisible 
            indicators={false}
            autoPlay = {false}
            cycleNavigation={false} 
            animation={"slide"}
            >
              {
                  Array.from(post?.image.values()).map( (data, i) => <img style={{width:"300px", height:"300px", borderRadius:"12px"}} key={i} src={data} alt="img" /> )
              } 
        </Carousel>
            </div>
          ))}
        </div>

      </div>
      :
      <div className="details">
        <div className="details__left">
        <div style={{marginLeft:"50px", marginBottom:"20px"}}>
          <Skeleton
          circle
          height="80px"
          width="80px" 
          containerClassName="avatar-skeleton"
          baseColor="#adadad2e"
        />
        </div>
        <div style={{marginLeft:"10px", marginBottom:"30px"}}>
        <Skeleton width={200} style={{marginBottom:"10px"}} />
        </div>

        <div style={{marginLeft:"-10px", display:"flex", marginBottom:"30px"}}>
        <Skeleton width={100} style={{marginBottom:"10px", marginLeft:"10px"}} />
        <Skeleton width={100} style={{marginBottom:"10px", marginLeft:"10px"}} />
        <Skeleton width={100} style={{marginBottom:"10px", marginLeft:"10px"}} />
        </div>
        <div style={{marginBottom:"30px"}}>
        <Skeleton width={200} height={200} style={{marginBottom:"10px", marginLeft:"10px"}} />
        </div>

        <div>
        <Skeleton width={250} height={50} style={{marginBottom:"10px", marginLeft:"10px"}} />
        </div>
      </div>
      <div className="details__right">
        <div style={{display:"flex", flexWrap:"wrap"}}>
          <Skeleton width={300} height={300} style={{marginBottom:"10px", marginLeft:"10px"}} />
          <Skeleton width={300} height={300} style={{marginBottom:"10px", marginLeft:"10px"}} />
          <Skeleton width={300} height={300} style={{marginBottom:"10px", marginLeft:"10px"}} />
          <Skeleton width={300} height={300} style={{marginBottom:"10px", marginLeft:"10px"}} />
        </div>
        </div>
      </div>
      }
    </div>
  )
}

export default UserDetails
import React, { useEffect } from 'react';
import "./UserDetails.css";
import { getUserDetailsAction } from '../actions/userActions';
import { useDispatch } from 'react-redux';
import { Avatar } from '@mui/material';
import TopBar from './TopBar';
import MultipleTab from './MultipleTab';

function UserDetails() {
    const username = window.location.pathname.split("/")[3];
    const dispatch = useDispatch();

    const getData = () => {
      dispatch(getUserDetailsAction(username));
    }

    useEffect(() => {
        getData();
    }, []);

  return (
    <div>
        <TopBar />
        <div className="details">
        <div className="details__left">
          <div className="details__profile">
            <div className="details__top">
              <div className="details__profilePic">
                <Avatar style={{width:"100px", height:"100px"}} src="https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2018%2F07%2Fstranger-things-dragons-lair-850x560.jpg" />
              </div>
              <div className="details__name">
                <span>Testing tester</span>
              </div>
            </div>

            <div className="details__middle">
              <div>
                <h3>100</h3>
                <span>Posts</span>
              </div>
              <div>
                <h3>100</h3>
                <span>Followers</span>
              </div>
              <div>
                <h3>100</h3>
                <span>Following</span>
              </div>
            </div>

            <div className="details__bio">
              <span>
              Akshita
              Digital creator
              constantly evolving, steadily revolving
              Style curator ~ Conscious earthling 🌎
              rvlv.me/s48pQQStyle curator ~ Conscious earthling 🌎
              rvlv.me/s48pQQStyle curator ~ Conscious earthling 🌎
              rvlv.me/s48pQQStyle curator ~ Conscious earthling 🌎
              rvlv.me/s48pQQ
              </span>
            </div>

            <div className="details__tab">
              <MultipleTab />
            </div>

          </div>
        </div>

        <div className="details__right">

        </div>
      </div>
    </div>
  )
}

export default UserDetails
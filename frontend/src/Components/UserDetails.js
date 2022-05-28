import React, { useEffect } from 'react';
import "./UserDetails.css";
import { getUserDetailsAction } from '../actions/userActions';
import { useDispatch } from 'react-redux';

function UserDetails() {
    const username = window.location.pathname.split("/")[3];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserDetailsAction(username));
    }, []);

  return (
    <div>
        <div>

        </div>
    </div>
  )
}

export default UserDetails
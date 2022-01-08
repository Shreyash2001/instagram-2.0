import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopUsersAction } from '../actions/userActions';
import PreferencesCard from '../Components/PreferencesCard';
import "./Preferences.css";

function Preferences() {
    const [button, setButton] = useState(false);
    const {preferences} = useSelector(state => state.countPreferences);
    const { top } = useSelector(state => state.topUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        if(preferences.length > 2) {
            setButton(true);
        } else {
            setButton(false);
        }
    }, [preferences]);

    useEffect(() => {
        dispatch(getTopUsersAction());
    }, [dispatch]);

    return (
        <div className="preferences">
            <div className="preferences__container">
                <div className="preferences__containerTop">
                    <h1>Help us set up feed for you</h1>
                    {button ? 
                    <div className="preferences__containerTopButton">
                    <Button>Next</Button> 
                    </div>
                    :
                    <span>Click to follow them to make you get going</span>
                    }
                </div>

                <div className="preferences__containerCards">
                {
                    top?.map(data => (
                        <PreferencesCard 
                            key = {data._id}
                            name = {data.firstName}
                            images = {data.posts}
                            id = {data._id}
                            profilePic = {data.profilePic}
                            followers = {data.followers}
                        />
                    ))
                }
                    
                </div>
            </div>
        </div>
    )
}

export default Preferences

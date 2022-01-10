import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPreferencesAction } from '../actions/countPreferencesActions';
import { getTopUsersAction } from '../actions/userActions';
import PreferencesCard from '../Components/PreferencesCard';
import "./Preferences.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


function Preferences() {
    const [button, setButton] = useState(false);
    const {preferences} = useSelector(state => state.countPreferences);
    const { top, loading } = useSelector(state => state.topUsers);
    const {loadingPreferences, error, success} = useSelector(state => state.preferencesData);
    const navigate = useNavigate();
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

    useEffect(() => {
        if(success) {
            navigate("/")
        } 
    }, [success, navigate]);

    return (
        <div className="preferences">
            <div className="preferences__container">
                <div className="preferences__containerTop">
                    <h1>Help us set up feed for you</h1>
                    {button ? 
                    <div className="preferences__containerTopButton">
                    {loadingPreferences 
                    ? 
                    <Button>{<CircularProgress style={{color:"#fff"}} />}</Button>
                    :
                    <Button onClick={() => dispatch(addPreferencesAction(preferences))}>Next</Button> 
                    }
                    </div>
                    :
                    <span>Click to follow them to make you get going</span>
                    }
                </div>
                
                <div className="preferences__containerCards">
                {
                    loading 
                    ? 
                    <SkeletonTheme>
                        <Skeleton 
                        style={{marginRight:"20px", marginBottom:"20px"}} 
                        width={250} 
                        height={250} 
                        inline="false" 
                        borderRadius={22}
                        count={6} />  
                    </SkeletonTheme>
                    :
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
                {error && <div style={{color:"red"}}>{error}</div>}
            </div>
        </div>
    )
}

export default Preferences

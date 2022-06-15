import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSuggestionAction } from '../actions/userActions';
import "./Home.css";
import HomeLeft from './HomeLeft';
import HomeMiddle from './HomeMiddle';
import HomeRight from './HomeRight';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        if(sessionStorage.getItem("Instagram-User_Suggestions") === undefined || sessionStorage.getItem("Instagram-User_Suggestions") === null)
        dispatch(getSuggestionAction());
    }, []);
    
    const page = 0;


    return (
        <div className="home">
            <div className="home__left">
                <HomeLeft />
            </div>

            <div className="home__middle">
            <div>
                <HomeMiddle />
            </div>
        </div>

            <div className="home__right">
                <HomeRight />
            </div>
        </div>
    )
}

export default Home

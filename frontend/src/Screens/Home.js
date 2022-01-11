import React from 'react';
import "./Home.css";
import HomeLeft from './HomeLeft';
import HomeMiddle from './HomeMiddle';
import HomeRight from './HomeRight';

function HomeProfileScreen() {
    return (
        <div className="home">
            <div className="home__left">
                <HomeLeft />
            </div>

            <div className="home__middle">
                <HomeMiddle />
            </div>

            <div className="home__right">
                <HomeRight />
            </div>
        </div>
    )
}

export default HomeProfileScreen

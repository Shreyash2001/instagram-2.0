import React from 'react';
import Feed from './Feed';
import "./Home.css";
import HomeLeft from './HomeLeft';
import HomeMiddle from './HomeMiddle';
import HomeRight from './HomeRight';

function Home() {
    
    return (
        <div className="home">
            <div className="home__left">
                <HomeLeft />
            </div>

            <div className="home__middle">
                <HomeMiddle />
                <Feed />
            </div>

            <div className="home__right">
                <HomeRight />
            </div>
        </div>
    )
}

export default Home

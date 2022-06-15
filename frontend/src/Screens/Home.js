import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSuggestionAction } from '../actions/userActions';
import "./Home.css";
import HomeLeft from './HomeLeft';
import HomeMiddle from './HomeMiddle';
import HomeRight from './HomeRight';
import InfiniteScroll from 'react-infinite-scroll-component';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        if(sessionStorage.getItem("Instagram-User_Suggestions") === undefined || sessionStorage.getItem("Instagram-User_Suggestions") === null)
        dispatch(getSuggestionAction());
    }, []);
    
    const data = [1, 2, 3, 4];
    const page = 0;
    const fetchData = () => {
        console.log(page + 1);
      };


    return (
        <div className="home">
            <div className="home__left">
                <HomeLeft />
            </div>

            <div className="home__middle">
            <InfiniteScroll
          dataLength={data}
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
            <div>
                <HomeMiddle />
            </div>
        </InfiniteScroll>
        </div>

            <div className="home__right">
                <HomeRight />
            </div>
        </div>
    )
}

export default Home

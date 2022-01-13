import React from 'react';
import "./HomeMiddle.css";
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function HomeMiddle() {
    return (
        <div className="homeMiddle">
            <div className="homeMiddle__search">
                <div>
                    <SearchIcon style={{color:"rgb(189, 186, 186)"}} />
                    <input type="search" placeholder="Search"  />
                </div>
                <Button>+ Create Post</Button>
            </div>
        </div>
    )
}

export default HomeMiddle

import React from 'react';
import PreferencesCard from '../Components/PreferencesCard';
import "./Preferences.css";

function Preferences() {
    return (
        <div className="preferences">
            <div className="preferences__container">
                <div className="preferences__containerTop">
                    <h1>Help us set up feed for you</h1>
                    <p>Follow few of them to make you get going</p>
                </div>

                <div className="preferences__containerCards">
                    <PreferencesCard 
                        name="Test Tester"
                        image="https://cdn.mos.cms.futurecdn.net/xYRAvSmUEJM7stp9V9T9VT.jpg"
                        show = {false}
                    />
                    <PreferencesCard 
                        name="Test Testing"
                        image="https://cdn.mos.cms.futurecdn.net/xYRAvSmUEJM7stp9V9T9VT.jpg"
                        
                    />
                    <PreferencesCard 
                        name="Test Tested"
                        image="https://cdn.mos.cms.futurecdn.net/xYRAvSmUEJM7stp9V9T9VT.jpg"
                    />
                    <PreferencesCard 
                        name="Test Abcdef"
                        image="https://cdn.mos.cms.futurecdn.net/xYRAvSmUEJM7stp9V9T9VT.jpg"
                    />
                    <PreferencesCard 
                        name="Test Ghijl"
                        image="https://cdn.mos.cms.futurecdn.net/xYRAvSmUEJM7stp9V9T9VT.jpg"
                    />
                    <PreferencesCard 
                        name="Test Defrhj"
                        image="https://cdn.mos.cms.futurecdn.net/xYRAvSmUEJM7stp9V9T9VT.jpg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Preferences

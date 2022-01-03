import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PreferencesCard from '../Components/PreferencesCard';
import "./Preferences.css";

function Preferences() {
    const [button, setButton] = useState(false);
    const {preferences} = useSelector(state => state.countPreferences);

    useEffect(() => {
        if(preferences.length > 2) {
            setButton(true);
        }
    }, [preferences])
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
                    <PreferencesCard 
                        name="Test Tester"
                        image="https://www.denofgeek.com/wp-content/uploads/2020/01/peaky_blinders_tommy_cap.jpg?resize=768%2C432"
                        id = "1"
                    />
                    <PreferencesCard 
                        name="Test Testing"
                        image="https://cdn.images.express.co.uk/img/dynamic/20/590x/Arthur-Shelby-Paul-Anderson-Peaky-Blinders-1263986.webp?r=1585830083062"
                        id = "2"
                    />
                    <PreferencesCard 
                        name="Test Tested"
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/14674251-low-res-peaky-blinders-iv-1568635012.jpg"
                        id = "3"
                    />
                    <PreferencesCard 
                        name="Test Abcdef"
                        image="https://i2-prod.dailypost.co.uk/incoming/article16870139.ece/ALTERNATES/s615b/3_Peaky-Blinders-V.jpg"
                        id = "4"
                    />
                    <PreferencesCard 
                        name="Test Ghijl"
                        image="https://i.inews.co.uk/content/uploads/2017/11/14466033-low_res-peaky-blinders-iv.jpg"
                        id = "5"
                    />
                    <PreferencesCard 
                        name="Test Defrhj"
                        image="http://images6.fanpop.com/image/photos/43600000/Anya-Taylor-Joy-as-Gina-Gray-in-Peaky-Blinders-anya-taylor-joy-43670905-1334-2000.jpg"
                        id = "6"
                    />
                </div>
            </div>
        </div>
    )
}

export default Preferences

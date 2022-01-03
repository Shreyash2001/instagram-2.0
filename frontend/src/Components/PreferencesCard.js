import React, { useState } from 'react';
import "./PreferencesCard.css";
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import { countPreferencesAction } from '../actions/countPreferencesActions';

function PreferencesCard({name, image, id}) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const handleClick = () => {
        setShow(!show);
        if(show === false)
        dispatch(countPreferencesAction(id));
    }
    return (
        <>
        {show ?  <div onClick={handleClick} className="preferencesCard">
            <div className="preferencesCard__container">
            <div className="preferencesCard__tick">
                    <img className="preferencesCard__tickImage" src="https://res.cloudinary.com/cqn/image/upload/v1641142317/Daco_4675609_di9inc.png" alt="tick" />
                </div>
                <img className="preferencesCard__containerImage" src={image} alt={name} />
                
                <div className="preferencesCard__containerInfo">
                <div>
                    <Avatar />
                </div>
                <div>
                    <span className="preferencesCard__containerInfoFollowers">21K Followers</span>
                    <h1 className="preferencesCard__containerInfoName">{name}</h1>
                </div>
                </div>

                <div className="preferencesCard__containerBlurTrue" />
            </div>
        </div>
        :
        <div onClick={handleClick} className="preferencesCard">
            <div className="preferencesCard__container">
                <img className="preferencesCard__containerImage" src={image} alt={name} />

                
                <div className="preferencesCard__containerInfo">
                <div>
                    <Avatar />
                </div>
                <div>
                    <span className="preferencesCard__containerInfoFollowers">21K Followers</span>
                    <h1 className="preferencesCard__containerInfoName">{name}</h1>
                </div>
                </div>

                <div className="preferencesCard__containerBlur" />
            </div>
        </div>
        }
        </>
    )
}

export default PreferencesCard

import React, { useState } from 'react';
import "./PreferencesCard.css";
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import { countPreferencesAction, removeCountPreferencesAction } from '../actions/countPreferencesActions';
import Flickity from "react-flickity-component";
import "./flickity.css";

function PreferencesCard({name, images, id, profilePic, followers}) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const handleClick = () => {
        setShow(!show);
        if(show === false)
        dispatch(countPreferencesAction(id));
        else
        dispatch(removeCountPreferencesAction(id));
    }
    return (
        <>
        
        {show ?  <div onClick={handleClick} className="preferencesCard">
            <div className="preferencesCard__container">
            <div className="preferencesCard__tick">
                    <img className="preferencesCard__tickImage" src="https://res.cloudinary.com/cqn/image/upload/v1641142317/Daco_4675609_di9inc.png" alt="tick" />
                </div>
                {/* <Flickity options={{autoPlay: 3000}}>
                {images?.map(image => (
                <img className="preferencesCard__containerImage" src={image.image} alt={name} />
                ))}

            </Flickity> */}
            <img className="preferencesCard__containerImage" src={images[0].image} alt={name} />
                
                <div className="preferencesCard__containerInfo">
                <div>
                    <Avatar src={profilePic} />
                </div>
                <div>
                    <span className="preferencesCard__containerInfoFollowers">{followers.length} Followers</span>
                    <h1 className="preferencesCard__containerInfoName">{name}</h1>
                </div>
                </div>

                <div className="preferencesCard__containerBlurTrue" />
            </div>
        </div>
        :
        <div onClick={handleClick} className="preferencesCard">
            <div className="preferencesCard__container">
            <Flickity options={{autoPlay: 3000}}>
                {images?.map(image => (
                <img key={image._id} className="preferencesCard__containerImage" src={image.image} alt={name} />
                ))}

            </Flickity>

                
                <div className="preferencesCard__containerInfo">
                <div>
                    <Avatar src={profilePic} />
                </div>
                <div>
                    <span className="preferencesCard__containerInfoFollowers">{followers.length} Followers</span>
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

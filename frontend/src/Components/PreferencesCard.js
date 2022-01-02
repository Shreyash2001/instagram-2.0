import React from 'react';
import "./PreferencesCard.css";

function PreferencesCard({name, image, id, show}) {
    return (
        <div className="preferencesCard">
            <div>
                <img src={image} alt={name} />
                <span>21K Followers</span>
                <h1>{name}</h1>
                <div />
            </div>
            {show && 
                <div className="preferencesCard__tick">
                    <img className="preferencesCard__tickImage" src="https://res.cloudinary.com/cqn/image/upload/v1641142317/Daco_4675609_di9inc.png" alt="tick" />
                </div>
            }
        </div>
    )
}

export default PreferencesCard

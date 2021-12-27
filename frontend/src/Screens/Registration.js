import React from 'react'
import './Registration.css'
import Button from '@mui/material/Button';

function Registration() {
    return (
        <div className="registration">
           <div className="registration__left">
            <div>
                <img className="registration__leftImage1" src="https://res.cloudinary.com/cqn/image/upload/v1640541759/vdbkoefdprxtsiswhjqc_ywbosn.jpg" alt="reels" />
            </div>
            <div style={{position:"absolute", top:"80px", left:"300px"}}>
                <img className="registration__leftImage2" src="https://res.cloudinary.com/cqn/image/upload/v1640612515/611ff39fcd52e2797ef79c8f_ig-reels-dancing_v2_fbwcnv.jpg" alt="reels" />
            </div>
            <div style={{position:"absolute", top:"400px", left:"0px"}}>
                <img className="registration__leftImage3" src="https://res.cloudinary.com/cqn/image/upload/v1640612573/msid-78574553_width-1200_height-900_resizemode-4_atspem.jpg" alt="reels" />
            </div>
            <div style={{position:"absolute", top:"400px", left:"300px"}}>
                <img className="registration__leftImage4" src="https://res.cloudinary.com/cqn/image/upload/v1640612624/add-links-instagram-posts_ccer7p.jpg" alt="reels" />
            </div>


           </div>

           <div className="registration__right">
                <div className="registration__rightContainer">
                    <div>
                        <h1>SignUp to connect the world.</h1>
                    </div>

                    <div className="registration__rightContainerName">
                        <div>
                            <input type="text" placeholder="First Name" />
                        </div>
                        <div>
                            <input type="text" placeholder="Last Name" />
                        </div>
                    </div>

                    <div className="registration__rightContainerUserName">
                        <div>
                            <input type="text" placeholder="username" />
                        </div>
                    </div>

                    <div className="registration__rightContainerUserName">
                        <div>
                            <input type="text" placeholder="email" />
                        </div>
                    </div>

                    <div className="registration__rightContainerName">
                        <div>
                            <input type="password" placeholder="Password" />
                        </div>
                        <div>
                            <input type="password" placeholder="Confirm Password" />
                        </div>
                    </div>
                    
                    <div className="registration__rightContainerButton">
                        <Button>Register</Button>
                    </div>

                </div>
           </div>
        </div>
    )
}

export default Registration

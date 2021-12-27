import React from 'react'
import './Login.css'
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';

function Login() {
    return (
        <div className="login">
           <div className="login__left">
            <div>
                <img className="login__leftImage1" src="https://res.cloudinary.com/cqn/image/upload/v1640541759/vdbkoefdprxtsiswhjqc_ywbosn.jpg" alt="reels" />
            </div>
            <div style={{position:"absolute", top:"80px", left:"300px"}}>
                <img className="login__leftImage2" src="https://res.cloudinary.com/cqn/image/upload/v1640612515/611ff39fcd52e2797ef79c8f_ig-reels-dancing_v2_fbwcnv.jpg" alt="reels" />
            </div>
            <div style={{position:"absolute", top:"400px", left:"0px"}}>
                <img className="login__leftImage3" src="https://res.cloudinary.com/cqn/image/upload/v1640612573/msid-78574553_width-1200_height-900_resizemode-4_atspem.jpg" alt="reels" />
            </div>
            <div style={{position:"absolute", top:"400px", left:"300px"}}>
                <img className="login__leftImage4" src="https://res.cloudinary.com/cqn/image/upload/v1640612624/add-links-instagram-posts_ccer7p.jpg" alt="reels" />
            </div>


           </div>

           <div className="login__right">
                <div className="login__rightContainer">
                    <div>
                        <h1>Login to connect the world.</h1>
                    </div>

                    <div className="login__rightContainerUserName">
                        <div>
                            <EmailIcon />
                            <input type="text" placeholder="Enter email or username" />
                        </div>
                    </div>

                    <div className="login__rightContainerName">
                        <div>
                            <HttpsIcon />
                            <input type="password" placeholder="Password" />
                        </div>
                    </div>
                    
                    <div className="login__rightContainerButton">
                        <Button>Login</Button>
                    </div>

                </div>
           </div>
        </div>
    )
}

export default Login

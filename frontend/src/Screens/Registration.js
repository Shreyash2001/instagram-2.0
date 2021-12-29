import React, { useState } from 'react'
import './Registration.css'
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../actions/userActions';


function Registration() {
    const [setFirstName, firstName] = useState("");
    const [setLastName, lastName] = useState("");
    const [setUserName, userName] = useState("");
    const [setEmail, email] = useState("");
    const [setPassword, password] = useState("");

    const dispatch = useDispatch();
    const {loading, success, error} = useSelector(state => state.userRegister);
    const handleClick = () => {
        dispatch(registerUser(firstName, lastName, userName, email, password));
    };
    console.log(firstName)
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
                            <PersonIcon />
                            <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <PersonIcon />
                            <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    <div className="registration__rightContainerUserName">
                        <div>
                            <AccountCircleIcon />
                            <input type="text" placeholder="username" onChange={(e) => setUserName(e.target.value)} />
                        </div>
                    </div>

                    <div className="registration__rightContainerUserName">
                        <div>
                            <EmailIcon />
                            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="registration__rightContainerName">
                        <div>
                            <HttpsIcon />
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <HttpsIcon />
                            <input type="password" placeholder="Confirm Password" />
                        </div>
                    </div>
                    
                    <div className="registration__rightContainerButton">
                        <Button onClick={handleClick}>Register</Button>
                    </div>

                    <div className="registration__rightContainerLogin">
                        <span>Have an account? <Link style={{color:"orange", textDecoration:"none"}} to="/login">Log in</Link></span>
                    </div>

                </div>
           </div>
        </div>
    )
}

export default Registration

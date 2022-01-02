import React, { useEffect, useState } from 'react'
import './Registration.css'
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../actions/userActions';
import CircularProgress from '@mui/material/CircularProgress';


function Registration() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [show, setShow] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const dispatch = useDispatch();
    const {loading, success, error} = useSelector(state => state.userLogin);

    const isFormComplete = () => {
        if(firstName.length > 0 && lastName.length > 0 && userName.length > 0 && email.length > 0 && password.length > 0) {
            return true;
        } else {
            setShow(true);
            setPasswordError(false);
            return false;
        }
    };

    const passwordMatch = () => {
        if(password === confirmPassword)
            return true; 
        else {
            setPasswordError(true);
            setShow(false);
            return false;
            }
    }
    const check = "Please fill all the fields";
    const passwordCheck = "Password did not match";
    const handleClick = () => {
        if(isFormComplete() && passwordMatch())
        dispatch(registerUser(firstName, lastName, userName, email, password));
    };

    const navigate = useNavigate();
    useEffect(() => {
        if(success) {
            navigate("/preferences");
        }
    }, [success, navigate]);

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
                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <PersonIcon />
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    <div className="registration__rightContainerUserName">
                        <div>
                            <AccountCircleIcon />
                            <input type="text" placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                    </div>

                    <div className="registration__rightContainerUserName">
                        <div>
                            <EmailIcon />
                            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="registration__rightContainerName">
                        <div>
                            <HttpsIcon />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <HttpsIcon />
                            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="registration__rightContainerButton">
                    { loading 
                        ? 
                        <Button>{<CircularProgress style={{color:"#fff"}} />}</Button>
                        :
                        <Button onClick={handleClick}>Register</Button>
                    }
                        
                    </div>

                    <div className="registration__rightContainerLogin">
                        <span>Have an account? <Link style={{color:"orange", textDecoration:"none"}} to="/login">Log in</Link></span>
                    </div>
                    {passwordError 
                    && 
                    <div className="registration__rightContainerError">
                    <span>{passwordCheck}</span>
                    </div>
                    }

                    {show 
                    && 
                    <div className="registration__rightContainerError">
                    <span>{check}</span>
                    </div>
                    }

                    {error 
                    && 
                    <div className="registration__rightContainerError">
                    <span>{error}</span>
                    </div>
                    }
                </div>
           </div>
        </div>
    )
}

export default Registration

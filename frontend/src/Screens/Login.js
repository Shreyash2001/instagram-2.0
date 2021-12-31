import React, { useEffect, useState } from 'react'
import './Login.css'
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function Login() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const userName = email;

    const dispatch = useDispatch(); 
    const {loading, success, error} = useSelector(state => state.userLogin);

    const handleClick = () => {
        dispatch(loginUser(userName, email, password));
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(success) {
            navigate("/");
        }
    }, [success, navigate])

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
                            <input type="text" placeholder="Enter email or username" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="login__rightContainerName">
                        <div>
                            <HttpsIcon />
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="login__rightContainerButton">
                    { loading 
                        ? 
                        <Button>{<CircularProgress style={{color: "#fff"}} />}</Button>
                        :
                        <Button onClick={handleClick}>Login</Button>
                    }
                    </div>

                    <div className="login__rightContainerLogin">
                        <span>Don't have an account? <Link style={{color:"orange", textDecoration:"none"}} to="/register">Sign up</Link></span>
                    </div>
                    {error && <div>{error}</div>}
                </div>
           </div>
        </div>
    )
}

export default Login

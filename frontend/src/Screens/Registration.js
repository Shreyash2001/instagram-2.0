import React from 'react'
import './Registration.css'
import Button from '@mui/material/Button';
function Registration() {
    return (
        <div className="registration">
           <div className="registration__left">

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

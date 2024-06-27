import React, { useState } from 'react' ;
import './LoginSignup.css';

import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import user_icon from './Assets/user.png';


const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");

    return(
        <div className='container'>
            <div className="signupHeader">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login"?<div></div>: <div className="input">
                    <img src={user_icon} alt="" className='icon'/>
                    <input type="text" placeholder='Name' />
                </div>}
                   

                <div className="input">
                    <img src={email_icon} alt="" className='email-icon'/>
                    <input type="email" placeholder='Email'/>
                </div>

                <div className="input">
                    <img src={password_icon} alt="" className='icon'/>
                    <input type="password" placeholder='Password' />
                </div>
                {action === "Sign Up"?<div></div>: <div className="forgot-password">Forgot password? <span>Click here</span></div>}
                
                <div className="submit-container">
                    <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
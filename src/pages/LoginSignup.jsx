import React, { useEffect, useState } from 'react';
import './LoginSignup.css';
import password_icon from '../assets/img/password.png';
import user_icon from '../assets/img/person.png';
import email_icon from '../assets/img/email.png';

const LoginSignup = () => {

    const [action, setAction] = useState("Login");

    useEffect(() => {
        // Add a specific class to the body when the component mounts
        document.body.classList.add('login-signup-page');
    
        // Remove the class when the component unmounts
        return () => {
          document.body.classList.remove('login-signup-page');
        };
      }, []);
    
    return (
        <div className="sign_container">
                <div className="sign_header">
                    <div className="sign_text">{action}</div>
                    <div className="sign_underline"></div>
                </div>
            <div className="sign_inputs">
                {action==="Login"?<div></div>:<div className="sign_input">
                    <img src={user_icon} alt="userIcon" />
                    <input type="text" placeholder="Name"/>
                </div>}
                <div className="sign_input">
                    <img src={email_icon} alt="emailIcon" />
                    <input type="email" placeholder="Email"/>
                </div>
                <div className="sign_input">
                    <img src={password_icon} alt="passwordIcon" />
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            {action==="Login"?<div className="sign_forgot_password"><a>Forget password?</a></div>:<div></div>}
            <div className="sign_submit_container">
                <div className={action==="Login"?"sign_submit gray":"sign_submit"} onClick={() => {setAction("Sign Up")}}>Sign up</div>
                <div className={action==="Sign Up"?"sign_submit gray":"sign_submit"} onClick={() => {setAction("Login")}}>Login</div>
            </div>
        </div>
    )
}

export default LoginSignup;
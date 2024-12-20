import React, { useEffect, useState } from 'react';
import './LoginSignup.css';
import password_icon from '../assets/img/password.png';
import user_icon from '../assets/img/person.png';
import email_icon from '../assets/img/email.png';
import Modal from "../assets/features/Modal.jsx";

const LoginSignup = () => {

    const [action, setAction] = useState("Login");
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("jwt") || "");

    const closeModal = () => {
        setShowModal(false);
    };


    const handleRegister = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        // Validate form inputs
        if (!username.trim() || !email.trim() || !password.trim() || !confirm_password.trim()) {
            setErrorMessage("All fields are required.");
            setShowModal(true); // Show modal for error
            return;
        }


        if (password !== confirm_password) {
            setErrorMessage("Passwords do not match.");
            setShowModal(true); // Show modal for error
            return;
          }
      
          const userData = {
            username,
            email,
            password,
            confirm_password
          };
      
          try {
            const response = await fetch("http://34.47.217.147:8080/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Registration failed.");
            }
      
            const data = await response.json();
            setSuccessMessage("Registration successful!");
            setShowModal(true); // Show success modal
      
            // Handle JWT token if returned
            if (data.access_token) {
                localStorage.setItem("jwt", data.access_token); // Save token
                setToken(data.access_token); // Update state
            }
      
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          } catch (error) {
            setErrorMessage(error.message || "An unexpected error occurred.");
            setShowModal(true); // Show modal for error
          }
        };
      
        const handleLogin = async () => {
            setErrorMessage(""); // Clear any previous error message
            setSuccessMessage(""); // Clear any previous success message
          
            // Validate login fields (email and password)
            if (!email.trim() || !password.trim()) {
              setErrorMessage("Email and password are required.");
              setShowModal(true); // Show modal with error message
              return;
            } else {
                setEmailOrUsername(email);
            }
            const loginData = { emailOrUsername, password };
            console.log(loginData.email, loginData.password);
            try {
              const response = await fetch("http://34.47.217.147:8080/api/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
              });
          
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed.");
              }
          
              const data = await response.json();
              setSuccessMessage("Login successful!");
              setShowModal(true); // Show success modal

              console.log(data);

              if (data.access_token) {
                localStorage.setItem("jwt", data.access_token); // Save token
                setToken(data.access_token); // Update state
              }
          
          
              // Clear inputs after a successful login
              setEmail("");
              setPassword("");
            } catch (error) {
              setErrorMessage(error.message || "An unexpected error occurred.");
              setShowModal(true); // Show modal with error message
            }
        };
        
      
        const handleSignUpClick = () => {
            if (action === "Sign Up") {
              handleRegister(); // Trigger registration request
            } else {
              setAction("Sign Up"); // Switch to Sign Up mode
            }
          };
        
        const handleLoginClick = () => {
            if (action === "Login") {
              handleLogin(); // Trigger login validation and modal
            } else {
              setAction("Login"); // Switch to Login view
            }
          };

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
                {showModal && (
                    <Modal onClose={closeModal}>
                        <p>{errorMessage || successMessage}</p> {/* Display error or success message */}
                    </Modal>
                )}
                <div className="sign_header">
                    <div className="sign_text">{action}</div>
                    <div className="sign_underline"></div>
                </div>
            <div className="sign_inputs">
                {action==="Login"?<div></div>:<div className="sign_input">
                    <img src={user_icon} alt="userIcon" />
                    <input type="text" placeholder="username" value={username}
                    onChange={(e) => setName(e.target.value)}/>
                </div>}
                <div className="sign_input">
                    <img src={email_icon} alt="emailIcon" />
                    <input type="email" placeholder="Email"                     
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="sign_input">
                    <img src={password_icon} alt="passwordIcon" />
                    <input type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {action==="Sign Up"?<div className="sign_input">
                    <img src={password_icon} alt="passwordIcon" />
                    <input className="confirm_password" type="password" placeholder="Confirm Password" 
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>:<div></div>}
            </div>
            {action==="Login"?<div className="sign_forgot_password"><a>Forget password?</a></div>:<div></div>}
            <div className="sign_submit_container">
                <div className={action === "Sign Up" ? "sign_submit gray" : "sign_submit"} onClick={action === "Sign Up" ? handleRegister : handleSignUpClick}>
                    Sign up
                </div>
                <div
                    className={action === "Login" ? "sign_submit gray" : "sign_submit"}
                    onClick={handleLoginClick}
                >
                    Login
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;
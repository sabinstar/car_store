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
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    const handleRegister = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setErrorMessage("All fields are required.");
            setShowModal(true);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setShowModal(true);
            return;
        }

        const userData = {
            username,
            email,
            password
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
            setSuccessMessage("Registration successful! Please login.");
            setShowModal(true);

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAction("Login"); // Switch to login after successful registration
        } catch (error) {
            setErrorMessage(error.message || "An unexpected error occurred.");
            setShowModal(true);
        }
    };

    const handleLogin = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!email.trim() || !password.trim()) {
            setErrorMessage("Email and password are required.");
            setShowModal(true);
            return;
        }

        const loginData = { emailOrUsername: email, password };

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
            setShowModal(true);

            // Save JWT token
            if (data.token) {
                localStorage.setItem("jwt", data.token);
            }

            // Clear inputs after successful login
            setEmail("");
            setPassword("");
        } catch (error) {
            setErrorMessage(error.message || "An unexpected error occurred.");
            setShowModal(true);
        }
    };

    const handleSignUpClick = () => {
        if (action === "Sign Up") {
            handleRegister();
        } else {
            setAction("Sign Up");
        }
    };

    const handleLoginClick = () => {
        if (action === "Login") {
            handleLogin();
        } else {
            setAction("Login");
        }
    };

    useEffect(() => {
        document.body.classList.add('login-signup-page');

        return () => {
            document.body.classList.remove('login-signup-page');
        };
    }, []);

    return (
        <div className="sign_container">
            {showModal && (
                <Modal onClose={closeModal}>
                    <p>{errorMessage || successMessage}</p>
                </Modal>
            )}
            <div className="sign_header">
                <div className="sign_text">{action}</div>
                <div className="sign_underline"></div>
            </div>
            <div className="sign_inputs">
                {action === "Sign Up" && (
                    <div className="sign_input">
                        <img src={user_icon} alt="userIcon" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}
                <div className="sign_input">
                    <img src={email_icon} alt="emailIcon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="sign_input">
                    <img src={password_icon} alt="passwordIcon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {action === "Sign Up" && (
                    <div className="sign_input">
                        <img src={password_icon} alt="passwordIcon" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                )}
            </div>
            {action === "Login" && <div className="sign_forgot_password"><a href="#">Forgot password?</a></div>}
            <div className="sign_submit_container">
                <div
                    className={action === "Sign Up" ? "sign_submit gray" : "sign_submit"}
                    onClick={handleSignUpClick}
                >
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
    );
};

export default LoginSignup;

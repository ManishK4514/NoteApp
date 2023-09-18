import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const baseUrl = "https://notesapp-backend-3r3l.onrender.com";

    const handleLogin = (e) => {
        e.preventDefault();
        const user = { email, password };

        axios({
            method: "POST",
            url: `${baseUrl}/user/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: user,
        })
            .then((res) => {
                localStorage.removeItem('token');
                console.log("User logged In...");
                const token = res.data.token;
                window.localStorage.setItem("token", token);
                navigate("/dashboard")
            })
            .catch((error) => {
                alert("Authenticaton failed!");
                setEmail("");
                setPassword("");
            });
    };

    const handleSignUp = (e) => {
        navigate("/signup")
    };

    return (
        <div className="Login">
            <h1>Login</h1>
            <form className="LoginForm">
                <input
                    type="email"
                    className="login-FormInput"
                    required
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="Enter Email"
                />
                <input
                    type="password"
                    className="login-FormInput"
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="Enter Password"
                />
                <button className="login-btn" onClick={handleLogin}>Login</button>
                <p className="login-para">
                    Don't have an account?{" "}
                    <span onClick={handleSignUp}> SignUp </span>
                </p>
            </form>
        </div>
    );
};

export default Login;

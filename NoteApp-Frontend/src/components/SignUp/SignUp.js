import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./SignUp.css";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const baseUrl = "https://notesapp-backend-3r3l.onrender.com";

    const handleSignUp = (e) => {
        e.preventDefault();
        const user = { name, email, password };

        axios({
            method: "POST",
            url: `${baseUrl}/user/register`,
            headers: {
                "Content-Type": "application/json",
            },
            data: user,
        })
            .then((res) => {
                console.log("New User Created...");
                window.localStorage.setItem("token",res.data.token);
                navigate("/dashboard")
            })
            .catch((error) => {
                alert(error);
                setName("");
                setEmail("");
                setPassword("");
            });
    };

    const handleLogin = (e) => {
      navigate("/")
    };

    return (
        <div className="Signup">
            <h1>SignUp</h1>
            <form className="SignUpForm">
                <input
                    type="text"
                    className="Signup-FormInput"
                    required
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    placeholder="Enter Name"
                />
                <input
                    type="email"
                    className="Signup-FormInput"
                    required
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="Enter Email"
                />
                <input
                    type="password"
                    className="Signup-FormInput"
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="Enter Password"
                />
                <button onClick={handleSignUp}>SignUp</button>
                <p>
                    Already Have an account ?{" "}
                    <span onClick={handleLogin}> Login </span>
                </p>
            </form>
        </div>
    );
};

export default SignUp;

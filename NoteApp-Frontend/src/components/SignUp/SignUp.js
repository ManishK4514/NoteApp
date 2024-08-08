import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./SignUp.css";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const baseUrl = "http://localhost:5000";

    const handleSignUp = (e) => {
        e.preventDefault();
        const user = { name, email, password };

        if(!user || !email || !password){
            setError("some fields are missing");
            return;
        }
        if(password.length<6){
            setError("password length must be greater than 5");
            return;
        }

        setLoading(true);
        setError("");

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
                setError("signup failed try again");
                setName("");
                setEmail("");
                setPassword("");
            }).finally(()=>{
                setLoading(false);
            })
    };

    const handleLogin = (e) => {
      navigate("/")
    };

    return (
        <div className="Signup">
            <h1>SignUp</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
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

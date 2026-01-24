import React, { useState } from 'react'
import loginUser from './api/loginApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // console.log("Email:", email);
    // console.log("Password:", password);
    loginUser(email, password)
      .then((data) => {
        console.log("Login successful:", data);
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  }

  const handleSignUp = () => {
    navigate("/register");
  }

  return (
    <div>
      Login Page
      <br />
      <label htmlFor=""> Email Id</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label htmlFor=""> Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}> Login</button>
      <br />
      <button onClick={handleSignUp}> Sign Up </button>
    </div>
  )
}

export default Login
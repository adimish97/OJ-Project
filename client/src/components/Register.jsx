import React, { useState } from 'react'
import registerUser from './api/registerApi';

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");


  const handleRegister = () => {
    // console.log("Email:", email);
    // console.log("Password:", password);
    registerUser(email, password, firstname, lastname)
      .then((data) => {
        console.log("Registeration successful:", data);
      })
      .catch((error) => {
        console.error("Registeration failed:", error.message);
      });
  }

  return (
    <div>
      Registeration Page
      <br />
      <label htmlFor=""> First Name</label>
      <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
      <br />
      <label htmlFor=""> Last Name</label>
      <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <br />
      <label htmlFor=""> Email Id</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label htmlFor=""> Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleRegister}> Register </button>
    </div>
  )
}
export default Register
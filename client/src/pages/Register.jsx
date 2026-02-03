import { useState } from "react";
import registerUser from "../components/api/registerApi";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleRegister = () => {
    registerUser(email, password, firstname, lastname)
      .then((data) => {
        console.log("Registration successful:", data);
        props.setIsLoggedIn(true);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Registration failed:", error.message);
      });
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2 className={styles.title}>Create Account ✨</h2>
        <p className={styles.subtitle}>Sign up to get started</p>

        <div className={styles.formGroup}>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.registerBtn} onClick={handleRegister}>
          Register
        </button>

        <p className={styles.footer}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;

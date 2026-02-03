import { useState } from "react";
import loginUser from "../components/api/loginApi";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    loginUser(email, password)
      .then((data) => {
        console.log("Login successful:", data);
        props.setIsLoggedIn(true);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome Back 👋</h2>
        <p className={styles.subtitle}>Login to your account</p>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="text"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>

        <p className={styles.footer}>
          Don’t have an account?{" "}
          <span onClick={handleSignUp}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { Link, useNavigate } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = (props) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    props.setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-logo"]}>
        <Link to="/home">AuthApp</Link>
      </div>

      <ul className={styles["navbar-links"]}>
        {props.isLoggedIn ?
          <li>
            <Link to="/home">Home</Link>
          </li>
          : null}
        {props.isLoggedIn ? <li onClick={handleLogout} style={{ color: 'white', cursor: 'pointer' }}>Logout</li> :
          <li><Link to="/login">Login</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;

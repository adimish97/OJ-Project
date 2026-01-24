import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-logo"]}>
        <Link to="/">AuthApp</Link>
      </div>

      <ul className={styles["navbar-links"]}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register" className="btn">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

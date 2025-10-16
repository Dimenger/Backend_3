import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./control-panel.module.css";

export const ControlPanel = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:3000/login");
      if (!res.ok) {
        throw new Error("Error " + res.status);
      }
      const data = await res.json();
      console.log(data.message);
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.controlPanel}>
      <Link to="/">
        <button className={styles.controlButton}>Request</button>
      </Link>

      <Link to="login">
        <button className={styles.controlButton}>Login</button>
      </Link>

      <Link to="requestsList">
        <button className={styles.controlButton}>Requests</button>
      </Link>

      <button className={styles.controlButton} onClick={logout}>
        Logout
      </button>

      <Link to="staff">
        <button className={styles.controlButton}>Staff</button>
      </Link>

      <Link to="add_staff">
        <button className={styles.controlButton}>Add Staff</button>
      </Link>
    </div>
  );
};

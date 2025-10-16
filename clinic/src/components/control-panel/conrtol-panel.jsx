import { Link } from "react-router-dom";

import styles from "./control-panel.module.css";

export const ControlPanel = () => {
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

      <Link to="/">
        <button className={styles.controlButton}>Logout</button>
      </Link>

      <Link to="staff">
        <button className={styles.controlButton}>Staff</button>
      </Link>

      <Link to="add_staff">
        <button className={styles.controlButton}>Add Staff</button>
      </Link>
    </div>
  );
};

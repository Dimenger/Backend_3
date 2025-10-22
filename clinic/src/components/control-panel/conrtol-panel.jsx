import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./control-panel.module.css";
import { useContext } from "react";
import { AuthContext } from "../auth-context";

export const ControlPanel = () => {
  const { logout, isAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const HandleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.controlPanel}>
      {!isAuth && (
        <Link to="/">
          <button className={styles.controlButton}>Request</button>
        </Link>
      )}

      {!isAuth && (
        <Link to="login">
          <button className={styles.controlButton}>Login</button>
        </Link>
      )}

      {isAuth && (
        <Link to="requestsList">
          <button className={styles.controlButton}>Requests</button>
        </Link>
      )}

      {isAuth && (
        <button className={styles.controlButton} onClick={HandleLogout}>
          Logout
        </button>
      )}

      {isAuth && (
        <Link to="users">
          <button className={styles.controlButton}>Users</button>
        </Link>
      )}

      {isAuth && (
        <Link to="add_user">
          <button className={styles.controlButton}>Add User</button>
        </Link>
      )}
    </div>
  );
};

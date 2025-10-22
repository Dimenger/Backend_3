import { useState, useEffect } from "react";

import styles from "./users.module.css";

export const Users = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/users" /*{ credentials: "include" }*/)
      .then((res) => res.json())
      .then((requestsData) => {
        setUser(requestsData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <caption className={styles.caption}>Пользователи</caption>
        <thead>
          <tr>
            <th>Enmail</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {user.map(({ id, email, password }) => (
            <tr key={id}>
              <td>{email}</td>
              <td>{password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

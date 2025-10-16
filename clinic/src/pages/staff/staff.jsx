import { useState, useEffect } from "react";

import styles from "./staff.module.css";

export const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/staffs", { credentials: "include" })
      .then((res) => res.json())
      .then((requestsData) => {
        setStaff(requestsData);
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
        <caption className={styles.caption}>Заявки с формы</caption>
        <thead>
          <tr>
            <th>Enmail</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(({ _id, email, password }) => (
            <tr key={_id}>
              <td>{email}</td>
              <td>{password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

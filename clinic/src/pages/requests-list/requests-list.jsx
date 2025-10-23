import { useState, useEffect } from "react";

import styles from "./requests-list.module.css";

export const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/request", { credentials: "include" })
      .then((res) => res.json())
      .then((requestsData) => {
        setRequests(requestsData);
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
            <th>Дата отправки</th>
            <th>Время отправки</th>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Проблема</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(({ _id, date, time, name, phone, description }) => (
            <tr key={_id}>
              <td>{date}</td>
              <td>{time}</td>
              <td>{name}</td>
              <td>{phone}</td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

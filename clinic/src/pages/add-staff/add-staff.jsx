import { useState } from "react";
import styles from "./add-staff.module.css";

export const AddStaff = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSendRequest = (e) => {
    e.preventDefault();
    const requestData = { email, password };

    fetch("http://localhost:3000/staffs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSendRequest}>
        <h1 className={styles.title}>Добавить сотрудника</h1>
        <div className={styles.name}>
          <label htmlFor="enmai" className={styles.label}>
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.phone}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Отправить данные" />
      </form>
    </div>
  );
};

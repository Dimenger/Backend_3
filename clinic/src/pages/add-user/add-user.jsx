import { useState } from "react";
import styles from "./add-user.module.css";

export const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSendRequest = (e) => {
    e.preventDefault();
    const requestData = { email, password };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    }).catch((error) => {
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
            autoComplete="username"
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
            autoComplete="current-password"
            required
          />
        </div>
        <input type="submit" value="Отправить данные" />
      </form>
    </div>
  );
};

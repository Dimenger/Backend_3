import { useState } from "react";
import { useNavigate } from "react-router";

import styles from "./login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSendValidation = (e) => {
    e.preventDefault();
    const requestData = { email, password };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error", res.status);
        }
        return res.json();
      })
      .then((staffDate) => {
        console.log(staffDate);
        if (staffDate.staff.email !== email) {
          alert("Wrong email!");
          return;
        }
        navigate("requestsList");
      })
      .catch((err) => console.error("Login error:", err));
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSendValidation}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.email}>
          <label htmlFor="email" className={styles.label}>
            Электронная почта
          </label>
          <input
            name="email"
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.password}>
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>
          <input
            name="password"
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Войти
        </button>
      </form>
    </div>
  );
};

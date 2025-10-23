import { useContext, useState } from "react";
import { AuthContext } from "../../components/auth-context";

import styles from "./login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginDate = { email, password };

  const { HandleLogin } = useContext(AuthContext);

  const handleSendValidation = async (e) => {
    e.preventDefault();
    HandleLogin(loginDate);
    setEmail("");
    setPassword("");
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
            autoComplete="email"
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
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Войти
        </button>
      </form>
    </div>
  );
};

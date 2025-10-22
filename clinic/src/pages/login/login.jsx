import { /*useContext*/ useState } from "react";
import { useNavigate } from "react-router";
// import { AuthContext } from "../../components/auth-context";
import { useAuth } from "../../components/auth-context";

import styles from "./login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth(); /* кастомный хук */
  // const { login } = useContext(AuthContext); Без хука писать так

  const navigate = useNavigate();

  const handleSendValidation = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const emails = users.map((item) => item.email);
    const passwords = users.map((item) => item.password);
    if (!emails.includes(email)) {
      alert("email not exist");
      return;
    }
    if (!passwords.includes(password)) {
      alert("password not exist");
      return;
    }
    const user_id = users.find((item) => item.email === email).id;
    login(user_id);
    navigate("/requestsList");
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

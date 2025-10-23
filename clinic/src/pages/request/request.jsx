import { useState } from "react";
import InputMask from "react-input-mask";

import styles from "./request.module.css";

export const Request = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendRequest = async (e) => {
    e.preventDefault();

    setIsSending(true);

    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toISOString().slice(11, 16);
    const requestData = { date, time, name, phone, description };

    try {
      const response = await fetch("http://localhost:3000/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Статус: ${response.status}`);
      }
      const result = await response.json();
      console.log("Ответ сервера:", result);
    } catch (error) {
      console.error("Ошибка:", error);
    }

    setName("");
    setPhone("");
    setDescription("");
    setTimeout(() => {
      setIsSending(false);
    }, 3000);
  };

  return (
    <>
      <div className={styles.form_container}>
        <h2 className={isSending ? styles.messageInvisible : styles.message}>
          Ваше сообщение отправлено!
        </h2>

        <form className={styles.form} onSubmit={handleSendRequest}>
          <h1 className={styles.title}>Запись к врачу</h1>
          <div className={styles.name}>
            <label htmlFor="name" className={styles.label}>
              ФИО
            </label>
            <input
              name="name"
              id="name"
              type="text"
              value={name}
              placeholder="Фамилия_Имя_Отчество"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.phone}>
            <label htmlFor="phone" className={styles.label}>
              Телефон
            </label>
            <input
              name="phone"
              id="phone"
              type="tel"
              placeholder="+7 ___ ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className={styles.request}>
            <label htmlFor="request" className={styles.label}>
              Обращение
            </label>
            <textarea
              name="request"
              id="request"
              rows="4"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <input type="submit" value="Отправить данные" disabled={isSending} />
        </form>
      </div>
    </>
  );
};

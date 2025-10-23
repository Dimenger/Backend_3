import { useState, useEffect } from "react";
import { AuthContext } from "./auth-context";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          credentials: "include",
        });
        if (response.ok) {
          // const data = await response.json();
          setIsAuth(true);
        } else if (response.status === 401) {
          // Пользователь не авторизован, ничего делать не нужно
          setIsAuth(false);
        } else {
          // Обработка других ошибок
          throw new Error(`Ошибка: ${response.status}`);
        }
      } catch (error) {
        console.error("Ошибка проверки auth:", error);
      }
    };

    checkAuth();
  }, []);

  const navigate = useNavigate();

  const HandleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        credentials: "include",
      });
      setIsAuth(false);
      const result = await response.json();
      console.log("result:", result);
    } catch (error) {
      console.error("Ошибка:", error);
    }
    navigate("/login", { replace: true });
  };

  const HandleLogin = async (loginDate) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDate),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Статус: ${response.status}`);
      }
      const result = await response.json();
      console.log("result", result);
      setIsAuth(true);
      navigate("/requestsList");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <AuthContext value={{ isAuth, HandleLogout, HandleLogin }}>
      {children}
    </AuthContext>
  );
};

/*   return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
  Старая запись. С 19 версии .Provider не используется*/

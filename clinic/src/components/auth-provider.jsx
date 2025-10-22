import { useState, useEffect } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  // Инициализация статуса при запуске
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    setIsAuth(!!storedUserId);
  }, []);

  // Логика логина — обновляем состояние и храним в localStorage
  const login = (userId) => {
    localStorage.setItem("user_id", userId);
    setIsAuth(true);
  };

  // Логика выхода — удаляем из localStorage и обновляем состояние
  const logout = () => {
    localStorage.removeItem("user_id");
    setIsAuth(false);
  };

  return (
    <AuthContext value={{ isAuth, login, logout }}>{children}</AuthContext>
  );
};

/*   return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
  Старая запись. С 19 версии .Provider не используется*/

/*
import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

кастомный хук для передачи в компоненты
если без него то в компоннетах пишем например

const { login } = useContext(AuthContext); Без хука писать так
export const useAuth = () => useContext(AuthContext);
*/

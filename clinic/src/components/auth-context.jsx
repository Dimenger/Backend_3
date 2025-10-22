import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

// кастомный хук для передачи в компоненты
// если без него то в компоннетах пишем например
// const { login } = useContext(AuthContext); Без хука писать так
export const useAuth = () => useContext(AuthContext);

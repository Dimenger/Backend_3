import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/auth-context";

export const PrivateRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? children : <Navigate to="/login" replace />;
};

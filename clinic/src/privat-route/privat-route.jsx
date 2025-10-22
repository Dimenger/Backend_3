import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("user_id");

  return isAuth ? children : <Navigate to="/login" replace />;
};

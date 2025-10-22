import { Layout } from "./layout/layout";
import { RequestsList } from "./pages/requests-list/requests-list";
import { Login } from "./pages/login/login";
import { Request } from "./pages/request/request";
import { Users } from "./pages/users/users";
import { AddUser } from "./pages/add-user/add-user";
import { PrivateRoute } from "./privat-route/privat-route";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: "/", element: <Request /> },
        { path: "login", element: <Login /> },
        {
          path: "requestsList",
          element: (
            <PrivateRoute>
              <RequestsList />
            </PrivateRoute>
          ),
        },
        {
          path: "users",
          element: (
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          ),
        },
        {
          path: "add_user",
          element: (
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

import { Layout } from "./layout/layout";
import { RequestsList } from "./pages/requests-list/requests-list";
import { Login } from "./pages/login/login";
import { Request } from "./pages/request/request";
import { Staff } from "./pages/staff/staff";
import { AddStaff } from "./pages/add-staff/add-staff";

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
        { path: "login/requestsList", element: <RequestsList /> },
        { path: "staff", element: <Staff /> },
        { path: "add_staff", element: <AddStaff /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

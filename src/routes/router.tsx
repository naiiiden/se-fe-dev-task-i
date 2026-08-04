import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Table from "./pages/Table";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/table",
    element: <Table />,
  },
]);

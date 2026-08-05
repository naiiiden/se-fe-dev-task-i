import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Table from "./pages/Table/Table";

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

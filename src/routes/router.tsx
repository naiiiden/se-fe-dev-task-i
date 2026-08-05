import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Table from "./pages/Table/Table";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/table",
    element: (
      <ProtectedRoute>
        <Table />,
      </ProtectedRoute>
    ),
  },
]);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  </StrictMode>,
);

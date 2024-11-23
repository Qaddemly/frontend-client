import { createRoot } from "react-dom/client";
import "./styles/global.css";
import AppRouter from "./routes/AppRouter.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);

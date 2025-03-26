import { createRoot } from "react-dom/client";
import "./styles/global.css";
import AppRouter from "./routes/AppRouter.tsx";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>,
);

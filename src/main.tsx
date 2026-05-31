import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import App from "./App";
import { SessionProvider } from "./auth/session";
import { KesslerProvider } from "./context/KesslerProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <KesslerProvider>
          <App />
        </KesslerProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);

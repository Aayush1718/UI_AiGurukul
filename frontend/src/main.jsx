import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LogtoProvider } from "@logto/react";

import App from "./App";
import "./index.css";

const logtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APP_ID,
  scopes: ["openid", "profile", "email"],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LogtoProvider config={logtoConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LogtoProvider>
  </React.StrictMode>
);
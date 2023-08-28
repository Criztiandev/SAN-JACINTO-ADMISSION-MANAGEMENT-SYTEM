import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "./context/ThemeContext.jsx";
import { styleTokens } from "../styleTokens.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider tokens={styleTokens}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

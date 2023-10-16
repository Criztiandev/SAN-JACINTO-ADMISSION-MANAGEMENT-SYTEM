import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Routes from "./routes";
import { QueryClientProvider, QueryClient } from "react-query";
import AuthContextProvider from "./context/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

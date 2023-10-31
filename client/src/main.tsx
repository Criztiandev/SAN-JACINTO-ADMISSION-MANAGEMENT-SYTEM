import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Routes from "./routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthContextProvider from "./context/AuthContext";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import ConfigProvider from "./context/ConfigContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <AuthContextProvider>
          <SkeletonTheme baseColor="#cccccc" highlightColor="#eeeeee">
            <Routes />
            <ToastContainer />
            <ReactQueryDevtools />
          </SkeletonTheme>
        </AuthContextProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

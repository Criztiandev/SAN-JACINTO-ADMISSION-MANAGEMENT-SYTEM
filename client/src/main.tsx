import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Routes from "./routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthContextProvider from "./context/AuthContext";
import DrawerProvider from "./context/DrawerContext";

import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DrawerProvider>
          <Suspense fallback={<Loading />}>
            <Routes />
            <ToastContainer />
            <ReactQueryDevtools />
          </Suspense>
        </DrawerProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

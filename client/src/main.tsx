import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Routes from "./routes";
import { QueryClientProvider, QueryClient } from "react-query";
import AuthContextProvider from "./context/AuthContext";
import Loading from "./components/Loading";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Suspense fallback={<Loading />}>
          <Routes />
        </Suspense>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

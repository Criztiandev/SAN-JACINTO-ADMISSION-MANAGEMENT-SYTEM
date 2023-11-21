import ReactDOM from "react-dom/client";
import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Routes from "./routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

// React Query config
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <SkeletonTheme baseColor="#cccccc" highlightColor="#eeeeee">
        <Routes />
        <ToastContainer />
      </SkeletonTheme>
    </AuthContextProvider>
  </QueryClientProvider>
);

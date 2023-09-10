import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import tokens from "../tokens.ts";
import { router } from "./routes/Router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={extendTheme(tokens)}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

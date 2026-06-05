import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "@/styles/base.css";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, refetchOnWindowFocus: false },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
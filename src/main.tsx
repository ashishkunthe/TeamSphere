import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #3f3f46",
          },
        },
        error: {
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid #52525b",
          },
        },
      }}
    />
  </StrictMode>
);

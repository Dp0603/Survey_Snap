import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext"; 
import { NotificationProvider } from "./contexts/NotificationContext"; 
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <NotificationProvider>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </NotificationProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
//在main文件中引入css样式
import "./styles/components/Task/TaskItem.css";
import "./styles/components/Task/AddTask.css";
import "./styles/components/Task/EditTask.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

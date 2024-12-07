import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameProvider } from "./context/GameContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"; // Backend for drag-and-drop
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <GameProvider>
        <App />
      </GameProvider>
    </DndProvider>
  </React.StrictMode>
);


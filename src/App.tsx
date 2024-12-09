import React, { useState } from "react";
import Board from "./components/Board/Board";
import { useGame } from "./context/GameContext";
import { DndContext } from "@dnd-kit/core";

const App: React.FC = () => {
  const game = useGame();
  const [turn, setTurn] = useState(game.getTurn());

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const from = active.id;
      const to = over.id;
      if (game.makeMove(from, to)) {
        setTurn(game.getTurn());
        console.log(`Moved from ${from} to ${to}`);
      }
    }
  };

  const handleMove = (from: string, to: string) => {
    if (game.makeMove(from, to)) {
      setTurn(game.getTurn());
      console.log(`Moved from ${from} to ${to}`);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="top-label">
        <h1 className={turn === "w" ? "white" : "black"}>
          {turn === "w" ? "White" : "Black"}
        </h1>
      </div>
      <Board board={game.getBoard()} onMove={handleMove} />
    </DndContext>
  );
};

export default App;

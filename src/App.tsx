import React, { useState } from "react";
import Board from "./components/Board/Board";
import { useGame } from "./context/GameContext";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
  const game = useGame();
  const [turn, setTurn] = useState(game.getTurn());

  const handleMove = (from: string, to: string) => {
    if (game.makeMove(from, to)) {
      setTurn(game.getTurn());
      console.log(`Moved from ${from} to ${to}`);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="top-label">
        <h1> Current Turn:</h1>
        <h1 className= {turn === "w" ? "white" : "black"}>{turn === "w" ? "White" : "Black"}</h1>
      </div>
      <Board board={game.getBoard()} onMove={handleMove} />
    </DndProvider>
  );
};

export default App



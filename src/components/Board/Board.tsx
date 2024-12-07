import React from "react";
import "./Board.css";
import Square from "../Square/Square.tsx";
import { Game } from "../../game/Game.ts";

interface BoardProps {
  board: ReturnType<Game["getBoard"]>;
  onMove: (from: string, to: string) => void;
}

const Board: React.FC<BoardProps> = ({ board, onMove }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => {
          const position = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
          return (
            <Square
              key={position}
              piece={square}
              position={position}
              onMove={onMove}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;

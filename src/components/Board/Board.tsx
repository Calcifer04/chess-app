import React, { useState } from "react";
import "./Board.css";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";
import { Game } from "../../game/Game";
import { DndContext, DragOverlay } from "@dnd-kit/core";

interface BoardProps {
  board: ReturnType<Game["getBoard"]>;
  onMove: (from: string, to: string) => void;
}

const Board: React.FC<BoardProps> = ({ board, onMove }) => {
  const [activePiece, setActivePiece] = useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActivePiece(event.active.id); // Set the ID of the active piece
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over) {
      onMove(active.id, over.id);
    }
    setActivePiece(null);
  };

  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="board-container">
        {/* Rank Labels */}
        <div className="rank-labels">
          {ranks.map((rank) => (
            <div key={rank} className="rank-label">
              {rank}
            </div>
          ))}
        </div>

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
                  activePiece={activePiece}
                />
              );
            })
          )}
        </div>

        {/* File Labels */}
        <div className="file-labels">
          {files.map((file) => (
            <div key={file} className="file-label">
              {file}
            </div>
          ))}
        </div>
        
        <DragOverlay>
          {activePiece && board[8 - parseInt(activePiece[1])][activePiece.charCodeAt(0) - 97]?.type && (
            <Piece
              id={activePiece}
              type={board[8 - parseInt(activePiece[1])][activePiece.charCodeAt(0) - 97]!.type}
              color={board[8 - parseInt(activePiece[1])][activePiece.charCodeAt(0) - 97]!.color}
            />
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Board;
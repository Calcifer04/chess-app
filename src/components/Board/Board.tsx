import React, { useState } from "react";
import "./Board.css";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";
import { DndContext, DragOverlay } from "@dnd-kit/core";

interface BoardProps {
  board: any[][];
  onMove: (from: string, to: string) => void;
  checkPosition?: string | null;
}

const Board: React.FC<BoardProps> = ({ board, onMove, checkPosition }) => {
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

  const getSquareClass = (position: string) => {
    const file = position.charCodeAt(0) - 97; // 'a' -> 0, 'b' -> 1, etc.
    const rank = 8 - parseInt(position[1]); // '1' -> 7, '2' -> 6, etc.
    
    let className = "square";
    if ((file + rank) % 2 === 0) {
      className += " white";
    } else {
      className += " black";
    }
    if (position === checkPosition) {
      className += " in-check";
    }
    return className;
  };

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
                  className={getSquareClass(position)}
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
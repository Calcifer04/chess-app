import React from "react";
import { useDraggable } from "@dnd-kit/core";
import "./Piece.css";

interface PieceProps {
  id: string;
  type: string;
  color: "w" | "b";
}

const Piece: React.FC<PieceProps> = ({ id, type, color }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  // Map chess piece types to SVG filenames
  const pieceNames: Record<string, string> = {
    p: "Pawn",
    r: "Rook",
    n: "Knight",
    b: "Bishop",
    q: "Queen",
    k: "King",
  };

  const pieceName = pieceNames[type];
  const side = color === "w" ? "White" : "Black";
  const imagePath = `/assets/Piece=${pieceName}, Side=${side}.svg`; // Use SVG instead of PNG

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`piece ${isDragging ? "dragging" : ""} ${!id.startsWith('overlay-') ? '' : 'drag-overlay'}`}
    >
      <img src={imagePath} alt={`${side} ${pieceName}`} />
    </div>
  );
};

export default Piece;
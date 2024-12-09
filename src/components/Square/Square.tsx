import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Piece from "../Piece/Piece";
import "./Square.css";

interface SquareProps {
  piece: { type: string; color: "w" | "b" } | null;
  position: string;
  onMove: (from: string, to: string) => void;
  activePiece?: string | null;
}

const Square: React.FC<SquareProps> = ({ piece, position, onMove, activePiece }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: position,
  });

  const isDark = (position.charCodeAt(0) + parseInt(position[1])) % 2 === 1;
  const showHighlight = isOver && activePiece !== position;

  return (
    <div
      ref={setNodeRef}
      className={`square ${isDark ? "dark" : "light"}`}
    >
      {piece && <Piece id={position} type={piece.type} color={piece.color} />}
      <div className={`${showHighlight ? "over" : ""}`}>

      </div>
    </div>
  );
};

export default Square;

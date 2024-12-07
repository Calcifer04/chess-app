import React from "react";
import { useDrag } from "react-dnd";
import "./Piece.css";

interface PieceProps {
  id: string;
  type: string;
  color: "w" | "b";
}

const Piece: React.FC<PieceProps> = ({ id, type, color }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "piece",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  
  console.log('Dragging:', isDragging, id);

  const pieceSymbols: Record<string, string> = {
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
  };

  return (
    <div
      ref={drag}
      className="piece"
      style={{ color: color === "w" ? "white" : "black" }}
    >
      {pieceSymbols[type]}
    </div>
  );
};

export default Piece;

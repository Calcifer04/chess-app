import React from "react";
import { useDrag } from "react-dnd";
import "./Piece.css";

interface PieceProps {
  id: string;
  type: string; // Piece type, e.g., 'p' for pawn, 'r' for rook
  color: "w" | "b"; // Piece color, 'w' for white, 'b' for black
}

const Piece: React.FC<PieceProps> = ({ id, type, color }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "piece",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Mapping the piece types to their respective names in the naming convention
  const pieceNames: Record<string, string> = {
    p: "Pawn",
    r: "Rook",
    n: "Knight",
    b: "Bishop",
    q: "Queen",
    k: "King",
  };

  // Construct the filename based on the type and color
  const pieceName = pieceNames[type]; // Get the piece name from the type (e.g., 'Pawn', 'Rook')
  const side = color === "w" ? "White" : "Black"; // Determine side (White or Black)

  // Construct the image path based on the naming convention
  const imagePath = `../../assets/Piece=${pieceName}, Side=${side}.png`;

  return (
    <div
      ref={drag}
      className="piece"
      style={{ color: color === "w" ? "white" : "black" }}
    >
      <img src={imagePath} alt={`${side}-${pieceName}`} />
    </div>
  );
};

export default Piece;

import React from "react";
import { useDrop } from "react-dnd";
import Piece from "../Piece/Piece.tsx";
import "./Square.css";

interface SquareProps {
  piece: { type: string; color: "w" | "b" } | null;
  position: string;
  onMove: (from: string, to: string) => void;
}

const Square: React.FC<SquareProps> = ({ piece, position, onMove }) => {
  const [, drop] = useDrop(() => ({
    accept: "piece",
    drop: (item: { id: string }) => {
      console.log("Drop triggered:", item.id, position);
      onMove(item.id, position);
    },
  }));

  const [isSelected, setIsSelected] = React.useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const isDark = (position.charCodeAt(0) + parseInt(position[1])) % 2 === 1;

  return (
    <div
      onClick={handleClick}
      ref={drop}
      className={`square ${isDark ? "dark" : "light"} ${isSelected ? "selected" : ""}`}
    >
      <div>
        {piece && <Piece id={position} type={piece.type} color={piece.color} />}
      </div>
    </div>
  );
};

export default Square;


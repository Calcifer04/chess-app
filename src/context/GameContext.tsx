import React, { createContext, useContext, useState, ReactNode } from "react";
import { Game } from "../game/Game.ts";

interface GameProviderProps {
  children: ReactNode;
}

const GameContext = createContext<Game | null>(null);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [game] = useState(new Game());

  return (
    <GameContext.Provider value={game}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

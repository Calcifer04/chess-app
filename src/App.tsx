import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import { useGame } from "./context/GameContext";
import { DndContext } from "@dnd-kit/core";
import Piece from "./components/Piece/Piece";

interface TimerState {
  white: number;
  black: number;
  isRunning: boolean;
}

const App: React.FC = () => {
  const game = useGame();
  const [turn, setTurn] = useState(game.getTurn());
  const [capturedPieces, setCapturedPieces] = useState(game.getCapturedPieces());
  const [checkPosition, setCheckPosition] = useState<string | null>(null);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [timer, setTimer] = useState<TimerState>({
    white: 0,
    black: 0,
    isRunning: false
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          [turn === 'w' ? 'white' : 'black']: prev[turn === 'w' ? 'white' : 'black'] - 1
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer.isRunning, turn]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startNewGame = (minutes: number) => {
    game.resetGame();
    setTimer({
      white: minutes * 60,
      black: minutes * 60,
      isRunning: true
    });
    setTurn(game.getTurn());
    setCapturedPieces(game.getCapturedPieces());
    setCheckPosition(null);
    setShowNewGameModal(false);
  };

  const calculateScore = (pieces: string[]): number => {
    const values: Record<string, number> = {
      'P': 1,  // Pawn
      'N': 3,  // Knight
      'B': 3,  // Bishop
      'R': 5,  // Rook
      'Q': 9   // Queen
    };
    let score = pieces.reduce((sum, piece) => sum + (values[piece] || 0), 0);
    return score;
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const from = active.id;
      const to = over.id;
      if (game.makeMove(from, to)) {
        setTurn(game.getTurn());
        setCapturedPieces({...game.getCapturedPieces()});
        setCheckPosition(game.getKingInCheckPosition());
        
        if (timer.white <= 0) {
          setTimer(prev => ({ ...prev, isRunning: false }));
          alert("Black wins on time!");
          setShowNewGameModal(true);
        } else if (timer.black <= 0) {
          setTimer(prev => ({ ...prev, isRunning: false }));
          alert("White wins on time!");
          setShowNewGameModal(true);
        }
      }
    }
  };

  const handleMove = (from: string, to: string) => {
    if (game.makeMove(from, to)) {
      setTurn(game.getTurn());
      console.log(`Moved from ${from} to ${to}`);
    }
  };

  useEffect(() => {
    if (timer.isRunning) {
      if (timer.white <= 0) {
        setTimer(prev => ({ ...prev, isRunning: false }));
        alert("Black wins on time!");
        setShowNewGameModal(true);
      } else if (timer.black <= 0) {
        setTimer(prev => ({ ...prev, isRunning: false }));
        alert("White wins on time!");
        setShowNewGameModal(true);
      }
    }
  }, [timer.white, timer.black]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="game-container">
        <div className="timer black-timer">
          {formatTime(timer.black)}
        </div>

        <div className="captured-pieces white">
          {calculateScore(capturedPieces.black) > calculateScore(capturedPieces.white) && (
            <div className="score">+{calculateScore(capturedPieces.black) - calculateScore(capturedPieces.white)}</div>
          )}
          {capturedPieces.black.map((piece, index) => (
            <Piece 
              key={`captured-white-${index}`}
              id={`captured-white-${index}`}
              type={piece.toLowerCase()}
              color="w"
              isCaptured={true}
            />
          ))}
        </div>
        
        <div className="main-board">
          <Board 
            board={game.getBoard()} 
            onMove={handleMove} 
            checkPosition={checkPosition}
          />
        </div>

        <div className="captured-pieces black">
          {calculateScore(capturedPieces.white) > calculateScore(capturedPieces.black) && (
            <div className="score">+{calculateScore(capturedPieces.white) - calculateScore(capturedPieces.black)}</div>
          )}
          {capturedPieces.white.map((piece, index) => (
            <Piece 
              key={`captured-black-${index}`}
              id={`captured-black-${index}`}
              type={piece.toLowerCase()}
              color="b"
              isCaptured={true}
            />
          ))}
        </div>

        <div className="timer white-timer">
          {formatTime(timer.white)}
        </div>

        <button className="new-game-btn" onClick={() => setShowNewGameModal(true)}>
          New Game
        </button>

        {showNewGameModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>New Game</h2>
              <div className="time-options">
                <button onClick={() => startNewGame(5)}>5 Minutes</button>
                <button onClick={() => startNewGame(10)}>10 Minutes</button>
                <button onClick={() => startNewGame(15)}>15 Minutes</button>
                <button onClick={() => startNewGame(30)}>30 Minutes</button>
              </div>
              <button className="cancel-btn" onClick={() => setShowNewGameModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default App;

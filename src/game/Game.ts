import { Chess } from "chess.js";
import { playSound } from "../utils/playSound.ts"; // Import the sound utility

export class Game {
  private chess: Chess;
  private capturedPieces: { white: string[], black: string[] };

  constructor() {
    this.chess = new Chess();
    this.capturedPieces = { white: [], black: [] };
  }

  getBoard() {
    return this.chess.board();
  }

  makeMove(from: string, to: string): boolean {
    const move = this.chess.move({ from, to }); 
    if (move) {
      if (move.captured) {
        const capturedBy = move.color === 'w' ? 'white' : 'black';
        const piece = move.captured.toUpperCase();
        this.capturedPieces[capturedBy].push(piece);
        playSound("Capture.mp3");
      } else {
        playSound("Move.mp3");
      }
    }
    return !!move;
  }

  getCapturedPieces() {
    return this.capturedPieces;
  }

  isGameOver(): boolean {
    return this.chess.isGameOver();
  }

  getTurn(): string {
    return this.chess.turn(); // Returns 'w' for white, 'b' for black
  }

  getKingInCheckPosition(): string | null {
    console.log("Checking king position, in check:", this.chess.inCheck());
    if (this.chess.inCheck()) {
      const board = this.chess.board();
      const color = this.chess.turn(); // 'w' or 'b'
      
      // Find the king's position
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const piece = board[i][j];
          if (piece && piece.type === 'k' && piece.color === color) {
            console.log(`King in check at position: ${String.fromCharCode(97 + j)}${8 - i}`);
            return `${String.fromCharCode(97 + j)}${8 - i}`; // Convert to chess notation (e.g., 'e4')
          }
        }
      }
    }
    return null;
  }

  resetGame(): void {
    this.chess = new Chess();
    this.capturedPieces = { white: [], black: [] };
  }
}
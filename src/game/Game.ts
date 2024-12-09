import { Chess } from "chess.js";
import { playSound } from "../utils/playSound.ts"; // Import the sound utility

export class Game {
  private chess: Chess;

  constructor() {
    this.chess = new Chess();
  }

  getBoard() {
    return this.chess.board();
  }

  makeMove(from: string, to: string): boolean {
    const move = this.chess.move({ from, to }); 
    console.log('makeMove called:', move);
    if (move.captured) {
      playSound("Capture.mp3")
    } else {
      playSound("Move.mp3")
    }
    console.log()
    
    console.log(this.chess.ascii())
    return !!move; // Return true if the move is valid
  }

  isPieceCaptured(move: any) {
    if (move.captured) {
      console.log(`Captured ${move.color === "b" ? "w" : "b"}, ${move.captured}`) 
    
    }
    return move.color, move.captured
  }

  isGameOver(): boolean {
    return this.chess.isGameOver();
  }

  getTurn(): string {
    return this.chess.turn(); // Returns 'w' for white, 'b' for black
  }
}
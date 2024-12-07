import { Chess } from "chess.js";

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
    console.log('makeMove called:', from, to);
    
    console.log(this.chess.ascii())
    return !!move; // Return true if the move is valid
  }

  isGameOver(): boolean {
    return this.chess.isGameOver();
  }

  getTurn(): string {
    return this.chess.turn(); // Returns 'w' for white, 'b' for black
  }
  
}

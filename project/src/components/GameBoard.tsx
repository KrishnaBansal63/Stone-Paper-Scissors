import React from 'react';
import { Hand, Scissors, Square } from 'lucide-react';

type Move = 'stone' | 'paper' | 'scissors' | null;
type GameBoardProps = {
  currentPlayer: 1 | 2;
  mode: 'computer' | 'player';
  onMove: (move: Move) => void;
  score: { player1: number; player2: number };
  gameStatus: string;
  playerMoves: { player1: Move; player2: Move };
};

export function GameBoard({ currentPlayer, mode, onMove, score, gameStatus, playerMoves }: GameBoardProps) {
  const moves: { icon: React.ReactNode; value: Move }[] = [
    { icon: <Square className="w-8 h-8" />, value: 'stone' },
    { icon: <Hand className="w-8 h-8" />, value: 'paper' },
    { icon: <Scissors className="w-8 h-8" />, value: 'scissors' },
  ];

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="flex justify-between w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <p className="font-semibold">Player 1</p>
          <p className="text-2xl text-indigo-600">{score.player1}</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">{mode === 'computer' ? 'Computer' : 'Player 2'}</p>
          <p className="text-2xl text-indigo-600">{score.player2}</p>
        </div>
      </div>

      <div className="text-xl font-semibold text-center mb-4">
        {gameStatus || `${currentPlayer === 1 ? 'Player 1' : (mode === 'computer' ? 'Computer' : 'Player 2')}'s Turn`}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {moves.map(({ icon, value }) => (
          <button
            key={value}
            onClick={() => onMove(value)}
            disabled={!!gameStatus}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {icon}
          </button>
        ))}
      </div>

      {(playerMoves.player1 || playerMoves.player2) && (
        <div className="flex justify-center gap-8 mt-8">
          {playerMoves.player1 && (
            <div className="text-center">
              <p>Player 1</p>
              <div className="p-4 bg-white rounded-lg shadow-md">
                {moves.find(m => m.value === playerMoves.player1)?.icon}
              </div>
            </div>
          )}
          {playerMoves.player2 && (
            <div className="text-center">
              <p>{mode === 'computer' ? 'Computer' : 'Player 2'}</p>
              <div className="p-4 bg-white rounded-lg shadow-md">
                {moves.find(m => m.value === playerMoves.player2)?.icon}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
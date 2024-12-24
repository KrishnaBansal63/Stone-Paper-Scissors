import React, { useState, useEffect } from 'react';
import { GameMode } from './components/GameMode';
import { GameBoard } from './components/GameBoard';
import { WinnerScreen } from './components/WinnerScreen';

type Move = 'stone' | 'paper' | 'scissors' | null;
type GameMode = 'computer' | 'player' | null;

function App() {
  const [mode, setMode] = useState<GameMode>(null);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [playerMoves, setPlayerMoves] = useState<{ player1: Move; player2: Move }>({
    player1: null,
    player2: null,
  });
  const [gameStatus, setGameStatus] = useState('');
  const [winner, setWinner] = useState<string | null>(null);

  const determineWinner = (move1: Move, move2: Move) => {
    if (move1 === move2) return 'tie';
    if (
      (move1 === 'stone' && move2 === 'scissors') ||
      (move1 === 'paper' && move2 === 'stone') ||
      (move1 === 'scissors' && move2 === 'paper')
    ) {
      return 'player1';
    }
    return 'player2';
  };

  const getComputerMove = (): Move => {
    const moves: Move[] = ['stone', 'paper', 'scissors'];
    return moves[Math.floor(Math.random() * moves.length)];
  };

  const handleMove = (move: Move) => {
    if (currentPlayer === 1) {
      setPlayerMoves(prev => ({ ...prev, player1: move }));
      if (mode === 'computer') {
        const computerMove = getComputerMove();
        setPlayerMoves(prev => ({ ...prev, player2: computerMove }));
        const result = determineWinner(move, computerMove);
        handleRoundEnd(result);
      } else {
        setCurrentPlayer(2);
      }
    } else {
      setPlayerMoves(prev => ({ ...prev, player2: move }));
      const result = determineWinner(playerMoves.player1, move);
      handleRoundEnd(result);
    }
  };

  const handleRoundEnd = (result: string) => {
    if (result === 'tie') {
      setGameStatus('It\'s a tie! Next round starting...');
    } else {
      const newScore = { ...score };
      if (result === 'player1') {
        newScore.player1 += 1;
        setGameStatus('Player 1 wins this round!');
      } else {
        newScore.player2 += 1;
        setGameStatus(`${mode === 'computer' ? 'Computer' : 'Player 2'} wins this round!`);
      }
      setScore(newScore);

      if (newScore.player1 >= 3 || newScore.player2 >= 3) {
        setWinner(newScore.player1 >= 3 ? 'Player 1' : (mode === 'computer' ? 'Computer' : 'Player 2'));
        return;
      }
    }

    setTimeout(() => {
      setPlayerMoves({ player1: null, player2: null });
      setCurrentPlayer(1);
      setGameStatus('');
    }, 2000);
  };

  const handleRestart = () => {
    setScore({ player1: 0, player2: 0 });
    setPlayerMoves({ player1: null, player2: null });
    setCurrentPlayer(1);
    setGameStatus('');
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {!mode ? (
          <GameMode onSelectMode={setMode} />
        ) : (
          <GameBoard
            currentPlayer={currentPlayer}
            mode={mode}
            onMove={handleMove}
            score={score}
            gameStatus={gameStatus}
            playerMoves={playerMoves}
          />
        )}
        {winner && <WinnerScreen winner={winner} onRestart={handleRestart} />}
      </div>
    </div>
  );
}

export default App;
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

type WinnerScreenProps = {
  winner: string;
  onRestart: () => void;
};

export function WinnerScreen({ winner, onRestart }: WinnerScreenProps) {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50;

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
        <h2 className="text-4xl font-bold text-indigo-600 mb-4">Congratulations!</h2>
        <p className="text-2xl mb-8">{winner} wins!</p>
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
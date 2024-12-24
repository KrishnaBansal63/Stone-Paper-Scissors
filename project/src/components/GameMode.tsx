import React from 'react';
import { Users, Monitor } from 'lucide-react';

type GameModeProps = {
  onSelectMode: (mode: 'computer' | 'player') => void;
};

export function GameMode({ onSelectMode }: GameModeProps) {
  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8">Stone Paper Scissors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelectMode('computer')}
          className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <Monitor className="w-16 h-16 text-indigo-500" />
          <span className="text-xl font-semibold">vs Computer</span>
        </button>
        <button
          onClick={() => onSelectMode('player')}
          className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <Users className="w-16 h-16 text-indigo-500" />
          <span className="text-xl font-semibold">vs Player</span>
        </button>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { goldenSound } from '../utils/audio';

interface HeaderProps {
  onReset: () => void;
  onOpenGuide: () => void;
  onOpenAllRoles: () => void;
  activeView: 'quiz' | 'result' | 'all-roles';
  mode: 'bot' | 'stepper';
  onToggleMode: (mode: 'bot' | 'stepper') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenGuide,
  onOpenAllRoles,
  activeView,
  mode,
  onToggleMode,
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(goldenSound.enabled);

  const toggleSound = () => {
    goldenSound.enabled = !goldenSound.enabled;
    setSoundOn(goldenSound.enabled);
    if (goldenSound.enabled) {
      goldenSound.playGoldenChime();
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0a0c10]/95 backdrop-blur-md border-b border-amber-500/20 text-amber-100 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title, single line text element wordmark */}
        <button
          onClick={onReset}
          className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded flex items-center gap-2.5"
        >
          <span className="text-xl select-none" aria-hidden="true">👑</span>
          <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 group-hover:brightness-125 transition-all">
            The Golden MIDAS Touch
          </span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium tracking-wide text-amber-200/80">
          <button
            onClick={() => onToggleMode('bot')}
            className={`cursor-pointer transition-colors hover:text-amber-300 whitespace-nowrap ${
              mode === 'bot' && activeView === 'quiz' ? 'text-amber-300 font-bold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            Touch Oracle
          </button>
          <button
            onClick={() => onToggleMode('stepper')}
            className={`cursor-pointer transition-colors hover:text-amber-300 whitespace-nowrap ${
              mode === 'stepper' && activeView === 'quiz' ? 'text-amber-300 font-bold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            Gilded Cards
          </button>
          <button
            onClick={onOpenAllRoles}
            className={`cursor-pointer transition-colors hover:text-amber-300 whitespace-nowrap ${
              activeView === 'all-roles' ? 'text-amber-300 font-bold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            4 Medallions
          </button>
          <button
            onClick={onOpenGuide}
            className="cursor-pointer transition-colors hover:text-amber-300 whitespace-nowrap"
          >
            MIDAS Lore
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Audio Chime Sparkle Toggle */}
          <button
            onClick={toggleSound}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              soundOn
                ? 'bg-amber-950/70 border-amber-500/50 text-amber-300 hover:bg-amber-900/80 shadow-xs'
                : 'bg-stone-900 border-stone-800 text-stone-500 hover:bg-stone-800'
            }`}
            title={soundOn ? 'Golden Chimes: Active' : 'Golden Chimes: Muted'}
          >
            <span>{soundOn ? '🔔 Chimes: On' : '🔇 Muted'}</span>
          </button>

          <button
            onClick={onReset}
            className="px-3.5 py-2 text-xs font-cinzel font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-md shadow-amber-500/20 active:scale-95"
          >
            {activeView === 'result' ? 'Retouch Quiz' : 'Reset'}
          </button>
        </div>
      </div>
    </header>
  );
};

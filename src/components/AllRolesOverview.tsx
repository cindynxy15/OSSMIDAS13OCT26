import React, { useState } from 'react';
import { PersonaKey } from '../types/quiz';
import { PERSONAS } from '../data/quizData';
import { goldenSound } from '../utils/audio';

interface AllRolesOverviewProps {
  onClose: () => void;
}

export const AllRolesOverview: React.FC<AllRolesOverviewProps> = ({ onClose }) => {
  const [selectedKey, setSelectedKey] = useState<PersonaKey>('mentor');
  const persona = PERSONAS[selectedKey];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-12 text-amber-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
        <div>
          <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-400">
            The Golden Treasury of MIDAS · Office of Student Support
          </span>
          <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-200 mt-1">
            The Four Golden Pillars of Student Support
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5 font-serif italic">
            Each role holds a distinct golden touch that elevates Republic Polytechnic scholars to their highest potential.
          </p>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-cinzel font-bold text-amber-200 bg-[#1a2030] hover:bg-[#232b40] border border-amber-500/30 rounded-xl cursor-pointer transition-colors shadow self-start sm:self-auto"
        >
          Return to Gilded Cards
        </button>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(Object.keys(PERSONAS) as PersonaKey[]).map((key) => {
          const item = PERSONAS[key];
          const isSelected = selectedKey === key;
          return (
            <button
              key={key}
              onClick={() => {
                goldenSound.playGoldenChime();
                setSelectedKey(key);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40 shadow-lg text-amber-100'
                  : 'bg-[#10131d] border-stone-800 hover:border-amber-500/50 hover:bg-[#161a29] text-amber-200/70'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-6 h-6 rounded-md font-cinzel font-bold text-xs flex items-center justify-center ${
                    isSelected ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950' : 'bg-[#1c2233] text-amber-300'
                  }`}
                >
                  {item.letter}
                </span>
                <span className="text-xs font-cinzel font-bold text-amber-400 uppercase tracking-wide truncate">
                  {item.midasConnection}
                </span>
              </div>
              <h3 className="font-cinzel text-base font-bold text-amber-200">
                {item.title}
              </h3>
              <p className="text-xs text-amber-200/50 mt-1 font-serif italic line-clamp-1">
                {item.goldenTitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Role Detailed Showcase in Gilded Stage */}
      <div className="bg-[#121624] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="w-60 h-60 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl shadow-amber-500/20 bg-[#090b10]">
              <img
                src={persona.medallionImageSrc}
                alt={persona.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="font-serif italic text-amber-100 text-base font-semibold mt-4">
              {persona.quote}
            </p>
          </div>

          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-amber-400 mb-1">
                <span>Option {persona.letter}</span>
                <span>·</span>
                <span>{persona.midasConnection}</span>
              </div>
              <h2 className="font-cinzel text-3xl font-bold text-amber-100">
                {persona.title}
              </h2>
              <p className="font-serif italic text-sm text-amber-200/80 mt-0.5">
                {persona.goldenTouchLore}
              </p>
            </div>

            <div className="p-4 bg-[#181e30] border border-amber-500/30 rounded-2xl space-y-1">
              <span className="font-cinzel text-xs font-bold text-amber-300 uppercase tracking-wide">
                Core Philosophy
              </span>
              <p className="text-base text-amber-100 leading-relaxed font-medium">
                {persona.statement}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span>⚡</span>
                Superpower
              </span>
              <p className="text-base text-amber-200/90 leading-relaxed">
                {persona.superpower}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-300/90 flex items-center gap-1.5">
                <span>🤝</span>
                Cross-Department Collaboration
              </span>
              <p className="text-sm sm:text-base text-amber-200/80 leading-relaxed">
                {persona.howYouCollaborate}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Partner Collaboration Rows */}
        <div className="mt-8 pt-6 border-t border-amber-500/20 space-y-4">
          <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider">
            Allied OSS Units for {persona.title}:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {persona.collaborations.map((collab) => (
              <div key={collab.partner} className="p-3.5 bg-[#181e30] border border-amber-500/30 rounded-xl">
                <span className="font-cinzel text-xs font-bold text-amber-300 block mb-1">
                  {collab.partner}
                </span>
                <p className="text-xs text-amber-200/80 leading-relaxed font-serif">
                  {collab.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

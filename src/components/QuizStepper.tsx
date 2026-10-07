import React, { useEffect, useState } from 'react';
import { OptionLetter, QuizOption, PersonaKey, QuizQuestion } from '../types/quiz';
import { QUIZ_QUESTIONS, PERSONAS, MIDAS_GOLDEN_AVATAR } from '../data/quizData';
import { goldenSound } from '../utils/audio';

interface QuizStepperProps {
  questions?: QuizQuestion[];
  answers: Record<number, OptionLetter>;
  onSelectOption: (questionId: number, letter: OptionLetter) => void;
  onFinishQuiz: () => void;
}

export const QuizStepper: React.FC<QuizStepperProps> = ({
  questions = QUIZ_QUESTIONS,
  answers,
  onSelectOption,
  onFinishQuiz,
}) => {
  const activeQuestions = questions;
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    for (let i = 0; i < activeQuestions.length; i++) {
      if (!answers[activeQuestions[i].id]) {
        return i;
      }
    }
    return 0;
  });

  // Keep index synchronized when questions are reshuffled on a new attempt
  useEffect(() => {
    for (let i = 0; i < activeQuestions.length; i++) {
      if (!answers[activeQuestions[i].id]) {
        setCurrentIndex(i);
        return;
      }
    }
    setCurrentIndex(0);
  }, [activeQuestions]);

  const [showLivePulse, setShowLivePulse] = useState<boolean>(false);

  const currentQ = activeQuestions[currentIndex] || activeQuestions[0];
  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === activeQuestions.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const key = e.key.toUpperCase();
      let matchedOption: QuizOption | undefined;

      if (key === 'A' || key === '1') matchedOption = currentQ.options[0];
      if (key === 'B' || key === '2') matchedOption = currentQ.options[1];
      if (key === 'C' || key === '3') matchedOption = currentQ.options[2];
      if (key === 'D' || key === '4') matchedOption = currentQ.options[3];

      if (matchedOption) {
        handlePick(matchedOption.letter);
      } else if (e.key === 'ArrowRight' && currentIndex < activeQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ, activeQuestions.length]);

  const handlePick = (letter: OptionLetter) => {
    goldenSound.playGoldenChime();
    onSelectOption(currentQ.id, letter);
    if (currentIndex < activeQuestions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200);
    }
  };

  const liveScores: Record<PersonaKey, number> = {
    mentor: 0,
    navigator: 0,
    detective: 0,
    builder: 0,
  };

  Object.entries(answers).forEach(([qIdStr, chosenLetter]) => {
    const q = activeQuestions.find((item) => item.id === Number(qIdStr)) || QUIZ_QUESTIONS.find((item) => item.id === Number(qIdStr));
    const opt = q?.options.find((o) => o.letter === chosenLetter);
    if (opt) {
      liveScores[opt.personaKey] += 1;
    }
  });

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#121622] border border-amber-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-amber-500/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400 shrink-0">
              <img src={MIDAS_GOLDEN_AVATAR} alt="Midas" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-300">
                  Scenario {currentIndex + 1} of 10
                </span>
                <span className="text-stone-600">·</span>
                <span className="text-xs text-amber-200/60">
                  {answeredCount} Transmuted
                </span>
              </div>
              <h2 className="text-xs sm:text-sm font-medium text-amber-100/80 mt-0.5">
                The Golden Scales of Student Support
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowLivePulse(!showLivePulse)}
              className="px-3 py-1.5 text-xs font-cinzel font-medium text-amber-200/90 hover:text-amber-100 bg-[#1c2233] hover:bg-[#252d42] border border-amber-500/30 rounded-lg cursor-pointer transition-colors"
            >
              {showLivePulse ? 'Hide Balance' : 'Golden Balance'}
            </button>
          </div>
        </div>

        {/* Liquid Gold Progress Bar */}
        <div className="w-full bg-[#0a0c10] border border-amber-500/20 rounded-full h-2.5 mt-5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-300 h-2.5 rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
          />
        </div>

        {/* Live Balance Drawer */}
        {showLivePulse && (
          <div className="mt-5 p-4 bg-[#0a0c12] border border-amber-500/20 rounded-2xl space-y-3">
            <div className="text-xs font-cinzel font-bold text-amber-300 flex items-center justify-between">
              <span>Current Golden Tally ({answeredCount}/10 Logged)</span>
              <span className="text-xs text-amber-200/60 font-normal">Real-time role affinity</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(Object.keys(PERSONAS) as PersonaKey[]).map((key) => {
                const persona = PERSONAS[key];
                const score = liveScores[key];
                return (
                  <div key={key} className="bg-[#141824] p-3 rounded-xl border border-amber-500/20 text-center flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400/80 mb-1.5 shadow bg-stone-900">
                      <img
                        src={persona.medallionImageSrc}
                        alt={persona.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-xs font-cinzel font-semibold text-amber-200 block truncate">
                      {persona.title.replace('The ', '')}
                    </span>
                    <span className="text-base font-bold text-amber-300 font-mono tabular-nums mt-0.5">
                      {score} <span className="text-xs font-normal text-amber-200/50">pts</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Gilded Question Card */}
      <div className="bg-[#121624] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-9 shadow-2xl relative text-amber-100">
        {/* Golden Reflection Musing */}
        {currentQ.goldenPonder && (
          <div className="mb-5 p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-amber-200/90 font-serif italic">
            <span className="text-lg select-none">✨</span>
            <span>{currentQ.goldenPonder}</span>
          </div>
        )}

        <div className="space-y-2 mb-6">
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-200 leading-snug">
            {currentQ.prompt}
          </h3>
          {currentQ.subtext && (
            <p className="text-base text-amber-200/80 font-medium">
              {currentQ.subtext}
            </p>
          )}
        </div>

        {/* 4 Options Grid */}
        <div className="space-y-3">
          {currentQ.options.map((opt) => {
            const isSelected = currentAnswer === opt.letter;
            return (
              <button
                key={`${currentQ.id}-${opt.personaKey}`}
                onClick={() => handlePick(opt.letter)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 group ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30 shadow-lg text-amber-100'
                    : 'bg-[#0d101a] border-stone-800 hover:border-amber-500/60 hover:bg-[#151a2a] text-amber-200/90'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-cinzel font-bold text-sm transition-colors ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 shadow'
                      : 'bg-[#1a2133] text-amber-300 group-hover:bg-amber-500/20'
                  }`}
                >
                  {opt.letter}
                </div>
                <div className="flex-1 pt-0.5">
                  <p
                    className={`text-base leading-relaxed ${
                      isSelected ? 'font-semibold text-amber-100' : 'text-amber-200/90'
                    }`}
                  >
                    {opt.text}
                  </p>
                </div>
                {isSelected && (
                  <div className="shrink-0 text-amber-400 pt-1 font-bold">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Stepper Navigation Footer */}
        <div className="mt-8 pt-5 border-t border-amber-500/20 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`px-4 py-2 text-xs sm:text-sm font-cinzel font-semibold rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed border-stone-800 text-stone-600'
                : 'border-amber-500/30 text-amber-300 hover:bg-amber-500/10'
            }`}
          >
            ← Previous
          </button>

          {/* Quick jump dot indicators */}
          <div className="hidden sm:flex items-center gap-1.5">
            {activeQuestions.map((q, idx) => {
              const hasAnswered = !!answers[q.id];
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-6 h-6 rounded-full text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isCurrent
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 shadow'
                      : hasAnswered
                      ? 'bg-amber-500/30 text-amber-200 hover:bg-amber-500/50'
                      : 'bg-stone-800 text-stone-500 hover:bg-stone-700'
                  }`}
                  title={`Scenario ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {currentIndex === activeQuestions.length - 1 ? (
            <button
              onClick={() => {
                goldenSound.playGoldenFanfare();
                onFinishQuiz();
              }}
              disabled={!isAllAnswered}
              className={`px-5 py-2.5 text-xs sm:text-sm font-cinzel font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                isAllAnswered
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 text-stone-950 shadow-lg shadow-amber-500/25 animate-pulse'
                  : 'bg-stone-800 text-stone-600 cursor-not-allowed'
              }`}
            >
              <span>👑 Reveal Alter Ego</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
              className="px-4 py-2 text-xs sm:text-sm font-cinzel font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 hover:brightness-110 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OptionLetter, ScoreRecord, BlendedPersonaResult, QuizQuestion } from './types/quiz';
import { QUIZ_QUESTIONS, calculatePersonaResult, shuffleQuestions } from './data/quizData';
import { Header } from './components/Header';
import { QuizStepper } from './components/QuizStepper';
import { PersonaResult } from './components/PersonaResult';
import { AllRolesOverview } from './components/AllRolesOverview';
import { MidasGuideModal } from './components/MidasGuideModal';
import { GoldenCursorTrail } from './components/GoldenCursorTrail';

export default function App() {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>(() => shuffleQuestions());
  const [answers, setAnswers] = useState<Record<number, OptionLetter>>({});
  const [view, setView] = useState<'quiz' | 'result' | 'all-roles'>('quiz');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, letter: OptionLetter) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: letter,
    }));
  };

  const handleFinishQuiz = () => {
    setView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setShuffledQuestions(shuffleQuestions());
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate scores
  const scores: ScoreRecord = {
    mentor: 0,
    navigator: 0,
    detective: 0,
    builder: 0,
  };

  Object.entries(answers).forEach(([qIdStr, chosenLetter]) => {
    const q = shuffledQuestions.find((item) => item.id === Number(qIdStr)) || QUIZ_QUESTIONS.find((item) => item.id === Number(qIdStr));
    const opt = q?.options.find((o) => o.letter === chosenLetter);
    if (opt) {
      scores[opt.personaKey] += 1;
    }
  });

  const result: BlendedPersonaResult = calculatePersonaResult(scores);

  return (
    <div className="min-h-screen bg-[#08090d] text-amber-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-100">
      {/* Subtle Golden Cursor Shimmer Trail */}
      <GoldenCursorTrail />

      {/* 3-Zone Top Navigation Contract with Golden MIDAS Touch theme */}
      <Header
        onReset={handleReset}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenAllRoles={() => setView('all-roles')}
        activeView={view}
        onGoToQuiz={() => setView('quiz')}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
        {view === 'quiz' && (
          <div className="flex-1 flex flex-col">
            <QuizStepper
              questions={shuffledQuestions}
              answers={answers}
              onSelectOption={handleSelectOption}
              onFinishQuiz={handleFinishQuiz}
            />
          </div>
        )}

        {view === 'result' && (
          <PersonaResult
            result={result}
            scores={scores}
            onRetake={handleReset}
            onOpenAllRoles={() => setView('all-roles')}
          />
        )}

        {view === 'all-roles' && (
          <AllRolesOverview onClose={() => setView('quiz')} />
        )}
      </main>

      {/* Gilded Obsidian Footer */}
      <footer className="mt-auto border-t border-amber-500/20 bg-[#0c0e15] py-6 text-xs text-amber-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-cinzel">
          <div className="flex items-center gap-2">
            <span>👑</span>
            <span className="font-bold text-amber-300">Office of Student Support</span>
            <span>·</span>
            <span>Republic Polytechnic</span>
          </div>
          <div className="flex items-center gap-4 text-amber-300/80">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-amber-200 cursor-pointer transition-colors"
            >
              The 4 Pillars of MIDAS
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setView('all-roles')}
              className="hover:text-amber-200 cursor-pointer transition-colors"
            >
              The 4 Golden Medallions
            </button>
          </div>
        </div>
      </footer>

      {/* About MIDAS Framework Modal */}
      <MidasGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { OptionLetter, QuizOption } from '../types/quiz';
import { QUIZ_QUESTIONS, MIDAS_GOLDEN_AVATAR } from '../data/quizData';
import { goldenSound } from '../utils/audio';

interface QuizBotProps {
  answers: Record<number, OptionLetter>;
  onSelectOption: (questionId: number, letter: OptionLetter) => void;
  onFinishQuiz: () => void;
  onSwitchToStepper: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'oracle' | 'user';
  text?: string;
  questionId?: number;
  options?: QuizOption[];
  selectedLetter?: OptionLetter;
  isOpening?: boolean;
}

export const QuizBot: React.FC<QuizBotProps> = ({
  answers,
  onSelectOption,
  onFinishQuiz,
  onSwitchToStepper,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTransmuting, setIsTransmuting] = useState<boolean>(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize opening message on mount
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: 'msg-welcome',
        sender: 'oracle',
        isOpening: true,
        text: `*A warm radiant golden light fills the chamber as the Golden MIDAS Touch Oracle awakens...*\n\nWelcome to the "Which MIDAS Role Are You?" quiz!\n\nMIDAS supports RP students through:\n• Mentoring\n• Internships\n• Data & Analytics\n• Administrative Support\n\nAnswer 10 quick questions to discover your MIDAS alter ego.\n\nLet's begin!`,
      },
    ];

    const answeredCount = Object.keys(answers).length;
    let nextIndex = 0;

    for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
      const q = QUIZ_QUESTIONS[i];
      if (answers[q.id]) {
        initialMessages.push({
          id: `q-${q.id}`,
          sender: 'oracle',
          questionId: q.id,
          text: `${q.goldenPonder ? `${q.goldenPonder}\n\n` : ''}${q.prompt}${q.subtext ? `\n\n${q.subtext}` : ''}`,
          options: q.options,
          selectedLetter: answers[q.id],
        });

        const chosenOpt = q.options.find((o) => o.letter === answers[q.id]);
        if (chosenOpt) {
          initialMessages.push({
            id: `a-${q.id}`,
            sender: 'user',
            text: `[Option ${chosenOpt.letter}] ${chosenOpt.text}`,
          });
        }

        if (q.botRemark) {
          initialMessages.push({
            id: `remark-${q.id}`,
            sender: 'oracle',
            text: `*The Golden Oracle reflects:* "${q.botRemark}"`,
          });
        }

        nextIndex = i + 1;
      } else {
        nextIndex = i;
        break;
      }
    }

    if (answeredCount === QUIZ_QUESTIONS.length) {
      initialMessages.push({
        id: 'msg-ready',
        sender: 'oracle',
        text: `✨ *The golden crucible glows with pure brilliance!*\n\nAll 10 workplace scenarios are forged! Your innate MIDAS Golden Touch is ready to be unveiled. Step forward!`,
      });
      setMessages(initialMessages);
      setActiveQuestionIndex(QUIZ_QUESTIONS.length);
    } else {
      const currentQ = QUIZ_QUESTIONS[nextIndex];
      if (currentQ) {
        initialMessages.push({
          id: `q-${currentQ.id}`,
          sender: 'oracle',
          questionId: currentQ.id,
          text: `${currentQ.goldenPonder ? `${currentQ.goldenPonder}\n\n` : ''}${currentQ.prompt}${currentQ.subtext ? `\n\n${currentQ.subtext}` : ''}`,
          options: currentQ.options,
        });
        setActiveQuestionIndex(nextIndex);
      }
      setMessages(initialMessages);
    }
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTransmuting]);

  const handleChoose = (questionId: number, option: QuizOption) => {
    goldenSound.playGoldenChime();
    onSelectOption(questionId, option.letter);

    const userMsg: ChatMessage = {
      id: `user-${questionId}-${Date.now()}`,
      sender: 'user',
      text: `[Option ${option.letter}] ${option.text}`,
    };

    setMessages((prev) => {
      const updated = prev.map((m) =>
        m.questionId === questionId ? { ...m, selectedLetter: option.letter } : m
      );
      return [...updated, userMsg];
    });

    setIsTransmuting(true);
    goldenSound.playAlchemyMusing();

    const currentQ = QUIZ_QUESTIONS.find((q) => q.id === questionId);
    const nextQIndex = QUIZ_QUESTIONS.findIndex((q) => q.id === questionId) + 1;

    setTimeout(() => {
      const newOracleMessages: ChatMessage[] = [];

      if (currentQ?.botRemark) {
        newOracleMessages.push({
          id: `remark-${questionId}-${Date.now()}`,
          sender: 'oracle',
          text: `*The Golden Oracle notes:* "${currentQ.botRemark}"`,
        });
      }

      if (nextQIndex < QUIZ_QUESTIONS.length) {
        const nextQ = QUIZ_QUESTIONS[nextQIndex];
        newOracleMessages.push({
          id: `q-${nextQ.id}`,
          sender: 'oracle',
          questionId: nextQ.id,
          text: `${nextQ.goldenPonder ? `${nextQ.goldenPonder}\n\n` : ''}${nextQ.prompt}${nextQ.subtext ? `\n\n${nextQ.subtext}` : ''}`,
          options: nextQ.options,
        });
        setActiveQuestionIndex(nextQIndex);
      } else {
        newOracleMessages.push({
          id: `ready-${Date.now()}`,
          sender: 'oracle',
          text: `✨ *The transformation is complete!* ✨\n\nEvery scenario has revealed how you turn student effort into pure gold. Behold your MIDAS Alter Ego!`,
        });
        setActiveQuestionIndex(QUIZ_QUESTIONS.length);
      }

      setMessages((prev) => [...prev, ...newOracleMessages]);
      setIsTransmuting(false);
    }, 450);
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-[calc(100vh-5.5rem)] max-h-[820px] bg-[#0d0f15] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden relative">
      {/* Top Golden Light Rim */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-600" />

      {/* Oracle Header */}
      <div className="px-5 py-3.5 bg-[#121620] border-b border-amber-500/20 flex items-center justify-between text-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg shadow-amber-500/20 bg-stone-900 shrink-0">
            <img
              src={MIDAS_GOLDEN_AVATAR}
              alt="Golden Midas"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-cinzel text-sm sm:text-base font-bold text-amber-300 tracking-wide">
                MIDAS Touch Oracle
              </h2>
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <p className="text-xs text-amber-200/60">Office of Student Support · Republic Poly</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-semibold text-amber-300 font-cinzel">
              Scenario {answeredCount} / 10
            </div>
            <div className="w-24 bg-[#0a0c10] border border-amber-500/30 rounded-full h-2 mt-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={onSwitchToStepper}
            className="px-2.5 py-1.5 text-xs font-medium text-amber-300/80 hover:text-amber-200 bg-[#1c2230] hover:bg-[#252d3d] border border-amber-500/30 rounded-lg cursor-pointer transition-colors"
          >
            Gilded Mode
          </button>
        </div>
      </div>

      {/* Chat Messages Stream with obsidian & gold leaf styling */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#0a0c12] bg-[radial-gradient(#202535_1px,transparent_1px)] [background-size:24px_24px]">
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-xs px-4 py-2.5 bg-gradient-to-r from-amber-950/90 to-[#2c200e] border border-amber-500/40 text-amber-100 text-sm shadow-md leading-relaxed">
                  {msg.text}
                </div>
              </div>
            );
          }

          // Oracle message
          const isQuestion = !!msg.questionId;
          const currentSelected = msg.questionId ? answers[msg.questionId] : undefined;

          return (
            <div key={msg.id} className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400/80 shrink-0 bg-stone-900 shadow">
                <img
                  src={MIDAS_GOLDEN_AVATAR}
                  alt="Midas Oracle"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 max-w-[92%] sm:max-w-[85%] space-y-3">
                {/* Gilded Card Bubble */}
                <div className="bg-[#141824] border border-amber-500/30 rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-lg text-amber-100 text-sm sm:text-base leading-relaxed whitespace-pre-line relative">
                  <span className="absolute -top-2 left-4 text-xs bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-cinzel font-bold px-2 py-0.2 rounded shadow">
                    Golden Oracle
                  </span>
                  <div className="pt-1">{msg.text}</div>
                </div>

                {/* If question, render gilded option cards */}
                {isQuestion && msg.options && (
                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {msg.options.map((opt) => {
                      const isChosen = currentSelected === opt.letter;
                      return (
                        <button
                          key={opt.letter}
                          onClick={() => handleChoose(msg.questionId!, opt)}
                          className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 group ${
                            isChosen
                              ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30 text-amber-100 shadow-md'
                              : 'bg-[#10131d] border-stone-800 hover:border-amber-500/60 hover:bg-[#161b29] text-amber-200/90'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-cinzel font-bold text-xs transition-colors ${
                              isChosen
                                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 shadow-sm'
                                : 'bg-[#1c2233] text-amber-300 group-hover:bg-amber-500/20'
                            }`}
                          >
                            {opt.letter}
                          </span>
                          <span className="flex-1 leading-snug text-sm sm:text-base pt-0.5">
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Oracle Transmuting Indicator */}
        {isTransmuting && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-400/80 shrink-0">
              <img src={MIDAS_GOLDEN_AVATAR} alt="Forging" className="w-full h-full object-cover" />
            </div>
            <div className="bg-[#141824] border border-amber-500/40 rounded-2xl rounded-tl-xs px-4 py-3 shadow-md flex items-center gap-2 text-xs font-cinzel text-amber-300">
              <span>Forging your golden answer...</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 bg-[#121620] border-t border-amber-500/20 flex items-center justify-between gap-3 text-amber-200">
        <div className="text-xs text-amber-200/60 flex items-center gap-2 font-cinzel">
          <span>Scenario {Math.min(activeQuestionIndex + 1, 10)} of 10</span>
          <span>·</span>
          <span>Select your instinctive approach</span>
        </div>

        {answeredCount === 10 ? (
          <button
            onClick={() => {
              goldenSound.playGoldenFanfare();
              onFinishQuiz();
            }}
            className="px-6 py-2.5 text-xs sm:text-sm font-cinzel font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/25 flex items-center gap-2 animate-bounce"
          >
            <span>👑 Reveal My MIDAS Alter Ego</span>
          </button>
        ) : (
          <button
            onClick={onSwitchToStepper}
            className="px-3 py-1.5 text-xs font-medium text-amber-300/80 hover:text-amber-200 border border-amber-500/30 rounded-lg hover:bg-[#1a2030] cursor-pointer transition-colors"
          >
            Switch to Gilded Cards
          </button>
        )}
      </div>
    </div>
  );
};

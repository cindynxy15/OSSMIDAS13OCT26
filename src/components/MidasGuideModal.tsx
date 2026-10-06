import React from 'react';

interface MidasGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MidasGuideModal: React.FC<MidasGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#121624] border-2 border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-amber-100 space-y-6 max-h-[90vh] overflow-y-auto relative">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
          <div>
            <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-400">
              Office of Student Support · Republic Polytechnic
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-200 mt-0.5">
              The Four Pillars of MIDAS
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1c2233] hover:bg-[#252d42] text-amber-200 font-bold flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-amber-200/80 leading-relaxed font-serif">
          In mythology, King Midas turned all he touched into pure gold. In Republic Polytechnic’s Office of Student Support (OSS), <strong>MIDAS</strong> is our collective golden touch—four strategic functions that transform student challenges into golden opportunities and lifelong triumphs.
        </p>

        <div className="space-y-3.5">
          <div className="p-4 bg-[#181e30] border border-amber-500/30 rounded-2xl flex items-start gap-3.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-cinzel font-bold flex items-center justify-center shrink-0 shadow-md">
              M
            </span>
            <div>
              <h3 className="font-cinzel text-sm font-bold text-amber-200">
                Mentoring (The Mentor)
              </h3>
              <p className="text-xs text-amber-200/80 leading-relaxed mt-1 font-serif">
                Cultivates personal trust, pastoral care, and psychological safety. Ensures no scholar walks alone through difficult challenges.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#181e30] border border-amber-500/30 rounded-2xl flex items-start gap-3.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-cinzel font-bold flex items-center justify-center shrink-0 shadow-md">
              I
            </span>
            <div>
              <h3 className="font-cinzel text-sm font-bold text-amber-200">
                Internships (The Internship Navigator)
              </h3>
              <p className="text-xs text-amber-200/80 leading-relaxed mt-1 font-serif">
                Builds golden bridges connecting academic classrooms to industry employers, preparing students for meaningful workplace ventures.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#181e30] border border-amber-500/30 rounded-2xl flex items-start gap-3.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-cinzel font-bold flex items-center justify-center shrink-0 shadow-md">
              D
            </span>
            <div>
              <h3 className="font-cinzel text-sm font-bold text-amber-200">
                Data & Analytics (The Data Detective)
              </h3>
              <p className="text-xs text-amber-200/80 leading-relaxed mt-1 font-serif">
                Uncovers engagement patterns, retention metrics, and early warning signs to guide evidence-based decisions across all student programmes.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#181e30] border border-amber-500/30 rounded-2xl flex items-start gap-3.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-cinzel font-bold flex items-center justify-center shrink-0 shadow-md">
              AS
            </span>
            <div>
              <h3 className="font-cinzel text-sm font-bold text-amber-200">
                Administrative Support (The Ecosystem Builder)
              </h3>
              <p className="text-xs text-amber-200/80 leading-relaxed mt-1 font-serif">
                Unites all schools, OSS units (SEN, Counselling, ECG), and community partners in seamless cross-functional harmony and operational alignment.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-cinzel font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 rounded-xl cursor-pointer transition-all shadow-md"
          >
            Understood, Return to Cards
          </button>
        </div>
      </div>
    </div>
  );
};

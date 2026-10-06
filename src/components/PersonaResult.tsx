import React, { useState } from 'react';
import { BlendedPersonaResult, ScoreRecord, PersonaKey } from '../types/quiz';
import { PERSONAS, MIDAS_GOLDEN_AVATAR } from '../data/quizData';
import { goldenSound } from '../utils/audio';
import { GoldenCertificateModal } from './GoldenCertificateModal';

interface PersonaResultProps {
  result: BlendedPersonaResult;
  scores: ScoreRecord;
  onRetake: () => void;
  onOpenAllRoles: () => void;
}

export const PersonaResult: React.FC<PersonaResultProps> = ({
  result,
  scores,
  onRetake,
  onOpenAllRoles,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activePartnerIndex, setActivePartnerIndex] = useState<number>(0);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);

  const primaryPersona = result.primaryPersonas[0];

  const handleShare = async () => {
    goldenSound.playGoldenChime();
    const appUrl = typeof window !== 'undefined' ? window.location.href : '';

    const textToCopy = `✨ MY GOLDEN MIDAS TOUCH RESULT ✨
🏛️ Office of Student Support · Republic Polytechnic

👑 MIDAS Persona: ${result.title}
🌟 Golden Archetype: ${result.goldenTitle}
🎯 MIDAS Pillar: ${result.midasConnection}

📜 Core Philosophy:
"${result.statement}"

⚡ My Superpower:
${result.superpower}

🤝 How I Collaborate Across OSS:
${result.howYouCollaborate}

⚖️ The Golden Crucible Scales:
• The Mentor: ${scores.mentor}/10 pts
• The Internship Navigator: ${scores.navigator}/10 pts
• The Data Detective: ${scores.detective}/10 pts
• The Ecosystem Builder: ${scores.builder}/10 pts

💬 Guiding Creed:
${result.quote}

✨ Discover your MIDAS Alter Ego for Republic Polytechnic!
${appUrl}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers/environments
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setShowShareToast(true);
      setTimeout(() => setCopied(false), 3000);
      setTimeout(() => setShowShareToast(false), 3500);

      // If mobile supports native share, also trigger share sheet
      if (typeof navigator.share === 'function' && window.innerWidth < 768) {
        try {
          await navigator.share({
            title: `My MIDAS Role: ${result.title}`,
            text: textToCopy,
          });
        } catch {
          // User dismissed native share sheet, clipboard is already copied
        }
      }
    } catch {
      // In case of error, show fallback toast
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-14 text-amber-100">
      {/* Top Banner Notice */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161a26] border border-amber-500/40 text-amber-300 text-xs font-cinzel tracking-wider shadow-lg">
          <span>👑</span>
          <span>The MIDAS Crucible Decree</span>
          <span>·</span>
          <span>OSS Republic Poly</span>
        </div>

        <p className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-amber-400/90 font-semibold">
          Your student support alchemy has been revealed
        </p>

        <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-200 tracking-wide drop-shadow-md">
          {result.title}
        </h1>

        <p className="font-serif italic text-amber-200/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {result.goldenTouchLore}
        </p>

        {/* Quick Share Action Row */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={handleShare}
            className="px-5 py-2.5 text-xs font-cinzel font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/25 flex items-center gap-2 active:scale-95"
            title="Copy personalized gold-themed summary to clipboard"
          >
            <span>{copied ? '✓' : '📤'}</span>
            <span>{copied ? 'Copied to Clipboard!' : 'Share Persona Summary'}</span>
          </button>
          <button
            onClick={() => {
              goldenSound.playGoldenChime();
              setIsCertModalOpen(true);
            }}
            className="px-4 py-2.5 text-xs font-cinzel font-bold text-amber-200 bg-[#161d2d] hover:bg-[#20293d] border border-amber-500/40 rounded-xl transition-all cursor-pointer shadow flex items-center gap-2"
          >
            <span>📜</span>
            <span>Certificate (.PNG)</span>
          </button>
        </div>
      </div>

      {/* Main Gilded Medallion & Scroll Card */}
      <div className="bg-[#121624] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative text-amber-100 overflow-hidden">
        {/* Soft radial gold glow background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-yellow-500/5 to-transparent rounded-bl-full pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Sculpted Gold Medallion Image */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-60 h-60 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl shadow-amber-500/20 bg-[#090b10] flex items-center justify-center">
                <img
                  src={result.medallionImageSrc}
                  alt={`${result.title} Golden Medallion`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {result.isBlended && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-200 text-xs font-cinzel font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Dual Golden Touch (Tie Result)
                </div>
              )}
            </div>

            <div className="mt-4 space-y-1">
              <span className="font-cinzel text-xs uppercase tracking-wider text-amber-400 font-bold block">
                Golden Motto
              </span>
              <p className="font-serif italic text-amber-100 text-base font-semibold">
                {result.quote}
              </p>
            </div>
          </div>

          {/* Core Card Details */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 to-yellow-400 px-3 py-1 rounded-lg shadow-sm">
                  MIDAS Connection: {result.midasConnection}
                </span>
                <span className="text-xs font-serif italic text-amber-300/80">
                  {result.goldenTitle}
                </span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-100">
                You are {result.title}.
              </h2>
            </div>

            {/* Core Philosophy */}
            <div className="p-4 sm:p-5 bg-[#181e30] border border-amber-500/30 rounded-2xl">
              <span className="font-cinzel text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                What This Role Represents
              </span>
              <p className="text-base text-amber-100 leading-relaxed font-medium">
                {result.statement}
              </p>
            </div>

            {/* Superpower */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-amber-400">
                <span>⚡</span>
                <span>Your Superpower</span>
              </div>
              <p className="text-base text-amber-200/90 leading-relaxed">
                {result.superpower}
              </p>
            </div>

            {/* How You Collaborate */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-amber-300/90">
                <span>🤝</span>
                <span>How You Collaborate Across OSS</span>
              </div>
              <p className="text-sm sm:text-base text-amber-200/80 leading-relaxed">
                {result.howYouCollaborate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Certificate Claim Card */}
      <div className="bg-gradient-to-r from-[#171e2e] via-[#1f273b] to-[#171e2e] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start sm:items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-950 font-bold text-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
            📜
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider">
                Official Credential
              </span>
              <span className="text-stone-500">·</span>
              <span className="text-xs text-amber-200/60">High-Res 1400×960 PNG</span>
            </div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-amber-100 mt-0.5">
              Claim Your Golden MIDAS Touch Certificate
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/70 mt-1 max-w-xl">
              Download a personalized, framed executive certificate image displaying your name, persona medallion, superpower, and authenticated crucible scores.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            goldenSound.playGoldenChime();
            setIsCertModalOpen(true);
          }}
          className="px-6 py-3 text-xs sm:text-sm font-cinzel font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 shrink-0"
        >
          <span>📥</span>
          <span>Claim Certificate (.PNG)</span>
        </button>
      </div>

      {/* If Blended Persona, showcase both tied medallions side by side */}
      {result.isBlended && (
        <div className="bg-[#121624] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400 shrink-0">
              <img src={MIDAS_GOLDEN_AVATAR} alt="Midas" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-200">
                Dual Golden Alignment: Two Pillars in Harmony
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/70">
                You scored equally high in these complementary functions. Here is how both golden touches enrich your student impact:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {result.primaryPersonas.map((p) => (
              <div key={p.key} className="bg-[#181e30] border border-amber-500/30 rounded-2xl p-5 space-y-3 shadow-md">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-amber-400/80 shrink-0 bg-stone-900">
                    <img src={p.medallionImageSrc} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-cinzel font-semibold text-amber-400 block">
                      {p.midasConnection}
                    </span>
                    <h4 className="font-cinzel text-base font-bold text-amber-100">
                      {p.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-serif">
                  {p.statement}
                </p>

                <div className="pt-2 border-t border-amber-500/20">
                  <span className="text-xs font-cinzel font-bold text-amber-300 block mb-0.5">
                    Individual Superpower:
                  </span>
                  <p className="text-xs text-amber-200/90 leading-normal">
                    {p.superpower}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Golden Scales Breakdown */}
      <div className="bg-[#121624] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-4">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-amber-200">
              The Golden Scales of MIDAS
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/70">
              Point distribution across the four student support pillars:
            </p>
          </div>
          <span className="text-xs font-cinzel text-amber-400 font-bold">
            10 Points Total
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.keys(PERSONAS) as PersonaKey[]).map((key) => {
            const persona = PERSONAS[key];
            const score = scores[key];
            const percent = (score / 10) * 100;
            const isHighest = result.topKeys.includes(key);

            return (
              <div
                key={key}
                className={`p-4 rounded-2xl border transition-all ${
                  isHighest
                    ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400/40 shadow-md'
                    : 'bg-[#0f121c] border-stone-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400/80 shrink-0 bg-stone-900 shadow">
                      <img
                        src={persona.medallionImageSrc}
                        alt={persona.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-cinzel font-bold text-amber-400">
                          {persona.letter} ·
                        </span>
                        <span className="font-cinzel font-bold text-amber-100 text-sm">
                          {persona.title}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-amber-300 font-mono tabular-nums">
                    {score} / 10 <span className="text-xs font-normal text-amber-200/50">({percent}%)</span>
                  </span>
                </div>

                <div className="w-full bg-[#080a10] border border-amber-500/20 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      isHighest
                        ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300'
                        : 'bg-stone-700'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <span className="text-xs text-amber-200/60 block mt-2">
                  Pillar: {persona.midasConnection}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Collaboration Touchpoints */}
      <div className="bg-[#121624] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h3 className="font-cinzel text-xl font-bold text-amber-200">
            OSS Cross-Functional Touchpoints
          </h3>
          <p className="text-sm text-amber-200/70 mt-0.5">
            How {result.title} partners across Republic Polytechnic departments:
          </p>
        </div>

        {/* Partner Guild Tabs */}
        <div className="flex flex-wrap gap-2">
          {primaryPersona.collaborations.map((collab, idx) => (
            <button
              key={collab.partner}
              onClick={() => {
                goldenSound.playGoldenChime();
                setActivePartnerIndex(idx);
              }}
              className={`px-3.5 py-1.5 text-xs font-cinzel font-bold rounded-xl transition-all cursor-pointer ${
                activePartnerIndex === idx
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 shadow-md'
                  : 'bg-[#1a2030] text-amber-200 hover:bg-[#232b40]'
              }`}
            >
              {collab.partner}
            </button>
          ))}
        </div>

        {/* Selected Partner Role Box */}
        <div className="p-5 bg-[#181e30] border border-amber-500/30 rounded-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-sm">👑</span>
            <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-300">
              Collaboration with {primaryPersona.collaborations[activePartnerIndex]?.partner}
            </span>
          </div>
          <p className="text-sm text-amber-100 leading-relaxed font-serif">
            {primaryPersona.collaborations[activePartnerIndex]?.role}
          </p>
        </div>
      </div>

      {/* Colleague Reflection Prompt */}
      <div className="bg-gradient-to-r from-amber-950/50 via-[#20180a] to-amber-950/50 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-amber-400">
          <span>💡</span>
          <span>Colleague Catchup Discussion Prompt</span>
        </div>
        <h4 className="font-cinzel text-lg font-bold text-amber-100">
          Share your Golden MIDAS Profile with your team:
        </h4>
        <p className="text-sm text-amber-200/90 leading-relaxed font-serif">
          &ldquo;As <strong>{result.title}</strong>, my golden touch shines in <em>{result.superpower.toLowerCase()}</em>. Which colleagues with complementary MIDAS strengths can team up with me on our upcoming term projects?&rdquo;
        </p>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-amber-500/20">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleShare}
            className={`px-4 py-2.5 text-xs font-cinzel font-bold rounded-xl transition-all cursor-pointer shadow flex items-center gap-2 ${
              copied
                ? 'bg-amber-400 text-stone-950 font-bold border border-amber-300 shadow-amber-500/25'
                : 'text-amber-200 bg-[#1a2030] hover:bg-[#232b40] border border-amber-500/30'
            }`}
            title="Copy gold-themed summary text to clipboard"
          >
            {copied ? (
              <>
                <span>✓</span>
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <span>📤</span>
                <span>Share Persona Summary</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              goldenSound.playGoldenChime();
              setIsCertModalOpen(true);
            }}
            className="px-4 py-2.5 text-xs font-cinzel font-bold text-amber-200 bg-[#1a2030] hover:bg-[#232b40] border border-amber-500/30 rounded-xl transition-all cursor-pointer shadow flex items-center gap-2"
          >
            <span>📥</span>
            Download Certificate (.PNG)
          </button>

          <button
            onClick={onOpenAllRoles}
            className="px-4 py-2.5 text-xs font-cinzel font-bold text-amber-200 bg-[#1a2030] hover:bg-[#232b40] border border-amber-500/30 rounded-xl transition-all cursor-pointer shadow flex items-center gap-2"
          >
            Explore All 4 Medallions
          </button>
        </div>

        <button
          onClick={onRetake}
          className="px-5 py-2.5 text-xs font-cinzel font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2 active:scale-95"
        >
          <span>👑</span>
          Retake Quiz
        </button>
      </div>

      {/* Styled Golden Certificate Modal */}
      <GoldenCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        result={result}
        scores={scores}
      />

      {/* Floating Golden Toast Notification */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#121624] border-2 border-amber-400 text-amber-100 shadow-2xl shadow-amber-500/30 backdrop-blur-md transition-all">
          <span className="text-xl">✨</span>
          <div>
            <p className="font-cinzel text-xs font-bold text-amber-300">
              Golden Persona Copied to Clipboard!
            </p>
            <p className="text-xs text-amber-200/80">
              Ready to paste directly into Microsoft Teams, Email, or WhatsApp.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

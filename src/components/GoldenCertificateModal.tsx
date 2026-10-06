import React, { useState, useRef, useEffect } from 'react';
import { BlendedPersonaResult, ScoreRecord } from '../types/quiz';
import { goldenSound } from '../utils/audio';

interface GoldenCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: BlendedPersonaResult;
  scores: ScoreRecord;
}

export const GoldenCertificateModal: React.FC<GoldenCertificateModalProps> = ({
  isOpen,
  onClose,
  result,
  scores,
}) => {
  const [recipientName, setRecipientName] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const primaryPersona = result.primaryPersonas[0];

  useEffect(() => {
    if (!isOpen) return;
    renderCertificate();
  }, [isOpen, recipientName, result, scores]);

  const renderCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas (1400 x 960 for sharp print/download)
    const W = 1400;
    const H = 960;
    canvas.width = W;
    canvas.height = H;

    // 1. Obsidian luxury background with radial golden center glow
    const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, W * 0.7);
    bgGrad.addColorStop(0, '#151926');
    bgGrad.addColorStop(0.5, '#0c0f17');
    bgGrad.addColorStop(1, '#05070a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Subtle background geometric pattern / grid
    ctx.strokeStyle = 'rgba(218, 165, 32, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 40; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, H - 40);
      ctx.stroke();
    }
    for (let y = 40; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(W - 40, y);
      ctx.stroke();
    }

    // 3. Double Gold Leaf Border
    const padOuter = 36;
    const padInner = 48;

    // Outer gold border
    const borderGrad = ctx.createLinearGradient(0, 0, W, H);
    borderGrad.addColorStop(0, '#fef08a');
    borderGrad.addColorStop(0.25, '#d97706');
    borderGrad.addColorStop(0.5, '#fef08a');
    borderGrad.addColorStop(0.75, '#b45309');
    borderGrad.addColorStop(1, '#fde047');

    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 3;
    ctx.strokeRect(padOuter, padOuter, W - padOuter * 2, H - padOuter * 2);

    // Inner thin border
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(padInner, padInner, W - padInner * 2, H - padInner * 2);

    // Corner Ornaments
    const drawCorner = (cx: number, cy: number, rot: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(24, 0);
      ctx.lineTo(24, 8);
      ctx.lineTo(8, 8);
      ctx.lineTo(8, 24);
      ctx.lineTo(0, 24);
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(14, 14, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawCorner(padInner, padInner, 0);
    drawCorner(W - padInner, padInner, Math.PI / 2);
    drawCorner(W - padInner, H - padInner, Math.PI);
    drawCorner(padInner, H - padInner, -Math.PI / 2);

    // 4. Header: Republic Polytechnic Office of Student Support
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fde68a';
    ctx.font = '600 16px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('REPUBLIC POLYTECHNIC  ·  OFFICE OF STUDENT SUPPORT', W / 2, 90);

    // Subtle divider
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.beginPath();
    ctx.moveTo(W / 2 - 200, 105);
    ctx.lineTo(W / 2 + 200, 105);
    ctx.stroke();

    // 5. Certificate Title
    const titleGrad = ctx.createLinearGradient(W / 2 - 250, 0, W / 2 + 250, 0);
    titleGrad.addColorStop(0, '#fef08a');
    titleGrad.addColorStop(0.5, '#f59e0b');
    titleGrad.addColorStop(1, '#fde047');

    ctx.fillStyle = titleGrad;
    ctx.font = 'bold 36px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('CERTIFICATE OF MIDAS ALTER EGO', W / 2, 150);

    // 6. Presentation text
    ctx.fillStyle = '#d1d5db';
    ctx.font = 'italic 18px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '0px';
    const recipientText = recipientName.trim()
      ? `This hereby certifies that ${recipientName.trim().toUpperCase()}`
      : 'This hereby certifies that our distinguished colleague in Student Support';
    ctx.fillText(recipientText, W / 2, 195);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('has been endowed with the distinct student support persona of', W / 2, 225);

    // 7. Role Name (Big Golden Banner)
    const roleGrad = ctx.createLinearGradient(W / 2 - 300, 0, W / 2 + 300, 0);
    roleGrad.addColorStop(0, '#fffbeb');
    roleGrad.addColorStop(0.3, '#fde047');
    roleGrad.addColorStop(0.7, '#f59e0b');
    roleGrad.addColorStop(1, '#fef08a');

    ctx.fillStyle = roleGrad;
    ctx.font = '900 48px "Cinzel", Georgia, serif';
    ctx.shadowColor = 'rgba(245, 158, 11, 0.45)';
    ctx.shadowBlur = 18;
    ctx.fillText(result.title.toUpperCase(), W / 2, 285);
    ctx.shadowBlur = 0; // reset shadow

    // Subtitle / Golden Title
    ctx.fillStyle = '#fde68a';
    ctx.font = '600 17px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '2px';
    ctx.fillText(`“${result.goldenTitle.toUpperCase()}”`, W / 2, 322);

    // MIDAS Pillar Tag
    ctx.fillStyle = '#1e2538';
    const tagW = 420;
    const tagH = 32;
    ctx.fillRect(W / 2 - tagW / 2, 340, tagW, tagH);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.strokeRect(W / 2 - tagW / 2, 340, tagW, tagH);

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 13px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(`MIDAS FUNCTION: ${result.midasConnection.toUpperCase()}`, W / 2, 361);

    // 8. Core Philosophy Box
    ctx.fillStyle = 'rgba(22, 27, 41, 0.85)';
    ctx.fillRect(W / 2 - 480, 395, 960, 68);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.strokeRect(W / 2 - 480, 395, 960, 68);

    ctx.fillStyle = '#f3f4f6';
    ctx.font = 'italic 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`“${result.statement}”`, W / 2, 435);

    // 9. Medallion Illustration (Left/Center balanced layout)
    const medalImg = new Image();
    medalImg.crossOrigin = 'anonymous';
    medalImg.src = primaryPersona.medallionImageSrc;

    medalImg.onload = () => {
      // Draw Medallion inside an embossed golden frame
      const mSize = 160;
      const mX = 140;
      const mY = 500;

      // Glow behind medallion
      const mGlow = ctx.createRadialGradient(mX + mSize / 2, mY + mSize / 2, 20, mX + mSize / 2, mY + mSize / 2, mSize);
      mGlow.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
      mGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = mGlow;
      ctx.beginPath();
      ctx.arc(mX + mSize / 2, mY + mSize / 2, mSize * 0.75, 0, Math.PI * 2);
      ctx.fill();

      // Rounded clipping circle for medallion
      ctx.save();
      ctx.beginPath();
      ctx.arc(mX + mSize / 2, mY + mSize / 2, mSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(medalImg, mX, mY, mSize, mSize);
      ctx.restore();

      // Medallion Gold Border Ring
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(mX + mSize / 2, mY + mSize / 2, mSize / 2 + 2, 0, Math.PI * 2);
      ctx.stroke();

      // 10. Superpower & Collaboration details next to medallion
      const textLeft = 330;
      ctx.textAlign = 'left';

      // Superpower block
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 15px "Cinzel", Georgia, serif';
      ctx.fillText('⚡ SUPERPOWER', textLeft, 520);

      ctx.fillStyle = '#e5e7eb';
      ctx.font = '15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(result.superpower, textLeft, 545, 900);

      // Collaboration block
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 15px "Cinzel", Georgia, serif';
      ctx.fillText('🤝 HOW THIS ROLE COLLABORATES IN OSS', textLeft, 595);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(result.howYouCollaborate, textLeft, 620, 900);

      // Golden Motto
      ctx.fillStyle = '#fde68a';
      ctx.font = 'italic 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`Guiding Creed: ${result.quote}`, textLeft, 655);

      // 11. Score Distribution Badges
      const scoreY = 705;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px "Cinzel", Georgia, serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('CRUCIBLE SCENARIO SCORE DISTRIBUTION', W / 2, scoreY);

      const items = [
        { label: 'The Mentor', score: scores.mentor },
        { label: 'The Internship Navigator', score: scores.navigator },
        { label: 'The Data Detective', score: scores.detective },
        { label: 'The Ecosystem Builder', score: scores.builder },
      ];

      const itemW = 220;
      const totalW = itemW * 4 + 30 * 3;
      const startX = (W - totalW) / 2;

      items.forEach((item, idx) => {
        const ix = startX + idx * (itemW + 30);
        const iy = scoreY + 15;

        const isHighest = result.topKeys.includes(
          idx === 0 ? 'mentor' : idx === 1 ? 'navigator' : idx === 2 ? 'detective' : 'builder'
        );

        ctx.fillStyle = isHighest ? 'rgba(245, 158, 11, 0.2)' : 'rgba(20, 24, 36, 0.6)';
        ctx.fillRect(ix, iy, itemW, 36);
        ctx.strokeStyle = isHighest ? '#f59e0b' : 'rgba(107, 114, 128, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(ix, iy, itemW, 36);

        ctx.textAlign = 'left';
        ctx.fillStyle = isHighest ? '#fde047' : '#9ca3af';
        ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(item.label, ix + 12, iy + 23);

        ctx.textAlign = 'right';
        ctx.fillStyle = isHighest ? '#fef08a' : '#d1d5db';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(`${item.score}/10`, ix + itemW - 12, iy + 24);
      });

      // 12. Bottom Seals & Sign-Offs
      const botY = 820;

      // Left: Verification Stamp
      ctx.textAlign = 'left';
      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 13px "Cinzel", Georgia, serif';
      ctx.fillText('MIDAS CRUCIBLE VERIFICATION', 100, botY);
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      const today = new Date().toLocaleDateString('en-SG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      ctx.fillText(`Issued: ${today}`, 100, botY + 20);
      ctx.fillText('Authenticated by RP Office of Student Support', 100, botY + 38);

      // Center: Official Golden Seal
      ctx.beginPath();
      ctx.arc(W / 2, botY + 15, 36, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 18px "Cinzel", Georgia, serif';
      ctx.fillText('MIDAS', W / 2, botY + 14);
      ctx.font = '9px "Cinzel", Georgia, serif';
      ctx.fillText('RP · OSS', W / 2, botY + 28);

      // Right: Mission Motto
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 13px "Cinzel", Georgia, serif';
      ctx.fillText('STUDENT SUCCESS TRANSFORMATION', W - 100, botY);
      ctx.fillStyle = '#6b7280';
      ctx.font = 'italic 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('“Turning student challenges into golden futures”', W - 100, botY + 20);
      ctx.fillText('Republic Polytechnic, Singapore', W - 100, botY + 38);

      setPreviewDataUrl(canvas.toDataURL('image/png'));
    };

    // If image doesn't trigger immediately, generate preliminary preview
    setPreviewDataUrl(canvas.toDataURL('image/png'));
  };

  const handleDownload = () => {
    setIsGenerating(true);
    goldenSound.playGoldenFanfare();

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsGenerating(false);
      return;
    }

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    const safeTitle = result.title.replace(/\s+/g, '_');
    const safeName = recipientName.trim() ? `${recipientName.trim().replace(/\s+/g, '_')}_` : '';
    a.download = `MIDAS_Certificate_${safeName}${safeTitle}.png`;
    a.href = dataUrl;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      setIsGenerating(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0f131d] border-2 border-amber-500/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl text-amber-100 space-y-6 max-h-[92vh] overflow-y-auto relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none" aria-hidden="true">📜</span>
            <div>
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-400">
                Republic Polytechnic · Office of Student Support
              </span>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-200 mt-0.5">
                Golden MIDAS Touch Certificate
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1c2233] hover:bg-[#252d42] text-amber-200 font-bold flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Name Customization Input */}
        <div className="bg-[#141926] p-4 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label htmlFor="colleague-name" className="text-xs font-cinzel font-bold text-amber-300 block">
              Personalize Certificate Name (Optional)
            </label>
            <p className="text-xs text-amber-200/60 mt-0.5">
              Enter your name to display on the official certificate.
            </p>
          </div>
          <div className="w-full sm:w-72">
            <input
              id="colleague-name"
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Cindy Neo"
              className="w-full px-3.5 py-2 text-sm bg-[#0a0d14] border border-amber-500/40 rounded-xl text-amber-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
            />
          </div>
        </div>

        {/* Hidden Canvas for High-Resolution Export */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Live Visual Certificate Preview */}
        <div className="border-2 border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl bg-[#090b10] flex items-center justify-center">
          {previewDataUrl ? (
            <img
              src={previewDataUrl}
              alt="Golden MIDAS Certificate Preview"
              className="w-full h-auto object-contain max-h-[460px] shadow-inner"
            />
          ) : (
            <div className="py-24 text-center text-amber-300 font-cinzel text-sm animate-pulse">
              Forging your golden certificate...
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-amber-500/20">
          <span className="text-xs text-amber-200/60 font-serif italic text-center sm:text-left">
            Exported as high-resolution 1400×960 PNG suitable for sharing or printing.
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-cinzel font-bold text-amber-200 bg-[#1a2030] hover:bg-[#232b40] border border-amber-500/30 rounded-xl transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-cinzel font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>📥</span>
              <span>{isGenerating ? 'Downloading...' : 'Download Certificate (.PNG)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Golden Web Audio API synthesizer for the MIDAS Golden Touch soundscape

class GoldenSoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Crystalline golden bell chime on choosing an option
  playGoldenChime() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Golden harmonic bell (fundamental + high sparkle)
      const freqs = [880, 1760, 2640];
      freqs.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        const vol = 0.05 / (i + 1);
        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35 + i * 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
      });
    } catch {
      // Audio blocked or unsupported
    }
  }

  // Warm golden alchemy tone when the bot deliberates
  playAlchemyMusing() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(261.63, now); // C4
      osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.2); // E4
      osc.frequency.exponentialRampToValueAtTime(392.0, now + 0.4); // G4

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Ignore
    }
  }

  // Regal golden fanfare when the MIDAS persona is revealed
  playGoldenFanfare() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chords = [
        { f: 523.25, t: 0, d: 0.3 },   // C5
        { f: 659.25, t: 0.15, d: 0.3 }, // E5
        { f: 783.99, t: 0.3, d: 0.4 },  // G5
        { f: 1046.5, t: 0.48, d: 0.8 }, // C6 (Golden climax)
      ];

      chords.forEach((c) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(c.f, now + c.t);

        gain.gain.setValueAtTime(0.08, now + c.t);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + c.t + c.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + c.t);
        osc.stop(now + c.t + c.d);
      });
    } catch {
      // Ignore
    }
  }
}

export const goldenSound = new GoldenSoundFX();

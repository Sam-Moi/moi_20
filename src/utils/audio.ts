/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API engine sound generator and UI telemetry sound effects
class SoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initContext() {
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

  // Play a UI telemetry beep/blip
  public playClick(freq = 880, duration = 0.04) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Play realistic Supercar Ignition & Starter Crank + Roar!
  public playIgnition() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Starter Motor Cranking (3 clicks/cranks)
      for (let i = 0; i < 3; i++) {
        const crankOsc = this.ctx.createOscillator();
        const crankGain = this.ctx.createGain();
        crankOsc.type = 'sawtooth';
        crankOsc.frequency.setValueAtTime(110 + i * 20, now + i * 0.12);
        crankGain.gain.setValueAtTime(0.12, now + i * 0.12);
        crankGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.08);
        crankOsc.connect(crankGain);
        crankGain.connect(this.ctx.destination);
        crankOsc.start(now + i * 0.12);
        crankOsc.stop(now + i * 0.12 + 0.09);
      }

      // 2. Engine Fire / Ignition Roar (Bass rumble + Sawtooth sweep)
      const fireTime = now + 0.42;

      // Low rumble sub-bass
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(55, fireTime);
      subOsc.frequency.linearRampToValueAtTime(160, fireTime + 0.3);
      subOsc.frequency.exponentialRampToValueAtTime(65, fireTime + 1.6);
      
      subGain.gain.setValueAtTime(0.01, fireTime);
      subGain.gain.linearRampToValueAtTime(0.28, fireTime + 0.2);
      subGain.gain.exponentialRampToValueAtTime(0.001, fireTime + 1.8);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(fireTime);
      subOsc.stop(fireTime + 1.8);

      // Aggressive V8 / V10 exhaust roar
      const roarOsc = this.ctx.createOscillator();
      const roarGain = this.ctx.createGain();
      const roarFilter = this.ctx.createBiquadFilter();

      roarOsc.type = 'sawtooth';
      roarOsc.frequency.setValueAtTime(90, fireTime);
      roarOsc.frequency.linearRampToValueAtTime(320, fireTime + 0.35); // Initial rev peak
      roarOsc.frequency.exponentialRampToValueAtTime(110, fireTime + 1.7); // Idle settle

      roarFilter.type = 'lowpass';
      roarFilter.frequency.setValueAtTime(800, fireTime);
      roarFilter.frequency.linearRampToValueAtTime(3000, fireTime + 0.35);
      roarFilter.frequency.exponentialRampToValueAtTime(600, fireTime + 1.7);

      roarGain.gain.setValueAtTime(0.01, fireTime);
      roarGain.gain.linearRampToValueAtTime(0.22, fireTime + 0.25);
      roarGain.gain.exponentialRampToValueAtTime(0.001, fireTime + 1.8);

      roarOsc.connect(roarFilter);
      roarFilter.connect(roarGain);
      roarGain.connect(this.ctx.destination);

      roarOsc.start(fireTime);
      roarOsc.stop(fireTime + 1.8);

    } catch {
      // ignore
    }
  }

  // Play High-RPM Car Rev
  public playRev(rpmMultiplier = 1.0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      const baseFreq = 85 * rpmMultiplier;
      const peakFreq = 380 * rpmMultiplier;

      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.linearRampToValueAtTime(peakFreq, now + 0.28);
      osc.frequency.linearRampToValueAtTime(peakFreq * 1.05, now + 0.42);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 1.1);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, now);
      filter.frequency.linearRampToValueAtTime(4500, now + 0.3);
      filter.frequency.exponentialRampToValueAtTime(800, now + 1.1);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.1);
    } catch {
      // ignore
    }
  }

  // Play Achievement unlock chime
  public playUnlock() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.36);
      });
    } catch {
      // ignore
    }
  }
}

export const soundFx = new SoundEngine();

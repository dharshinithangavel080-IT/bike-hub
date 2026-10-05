// Realistic Web Audio Engine Synthesizer for Motorcycle Acoustics

class EngineSoundEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private masterGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private distortion: WaveShaperNode | null = null;
  private isRunning: boolean = false;
  private currentRPMRatio: number = 0.15; // 0.15 is idle, 1.0 is redline
  private animationFrameId: number | null = null;
  private targetRPMRatio: number = 0.15;

  private makeDistortionCurve(amount: number = 20) {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  private createNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  public init() {
    if (this.ctx && this.ctx.state !== 'closed') {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // Audio not supported
    }
  }

  public startEngine(type: 'v4' | 'v-twin' | 'boxer' | 'electric', onRpmUpdate?: (rpmRatio: number) => void) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stopEngine();

    const ctx = this.ctx;
    const now = ctx.currentTime;

    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, now);
    this.masterGain.gain.linearRampToValueAtTime(0.28, now + 0.1);
    this.masterGain.connect(ctx.destination);

    // Distortion
    this.distortion = ctx.createWaveShaper();
    this.distortion.curve = this.makeDistortionCurve(type === 'electric' ? 4 : 25);
    this.distortion.oversample = '2x';

    // Filter
    this.filter = ctx.createBiquadFilter();
    this.filter.type = type === 'electric' ? 'bandpass' : 'lowpass';
    this.filter.frequency.setValueAtTime(type === 'electric' ? 1200 : 380, now);
    this.filter.Q.setValueAtTime(type === 'electric' ? 4 : 2.5, now);

    this.distortion.connect(this.filter);
    this.filter.connect(this.masterGain);

    if (type === 'electric') {
      // High-pitched turbine futuristic sine + saw
      this.osc1 = ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(180, now);

      this.osc2 = ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(360, now);

      this.osc1.connect(this.distortion);
      this.osc2.connect(this.distortion);

      this.osc1.start(now);
      this.osc2.start(now);
    } else {
      // Combustion engine
      const baseFreq = type === 'v-twin' ? 42 : type === 'boxer' ? 48 : 58;

      this.osc1 = ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(baseFreq, now);

      this.osc2 = ctx.createOscillator();
      this.osc2.type = type === 'v-twin' ? 'triangle' : 'sawtooth';
      this.osc2.frequency.setValueAtTime(baseFreq * 1.5, now);

      this.subOsc = ctx.createOscillator();
      this.subOsc.type = 'triangle';
      this.subOsc.frequency.setValueAtTime(baseFreq * 0.5, now);

      this.osc1.connect(this.distortion);
      this.osc2.connect(this.distortion);
      this.subOsc.connect(this.distortion);

      this.osc1.start(now);
      this.osc2.start(now);
      this.subOsc.start(now);

      // Noise generator for intake rush
      try {
        const noiseBuf = this.createNoiseBuffer(ctx);
        this.noiseNode = ctx.createBufferSource();
        this.noiseNode.buffer = noiseBuf;
        this.noiseNode.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(450, now);
        noiseFilter.Q.setValueAtTime(3, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.04, now);

        this.noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);

        this.noiseNode.start(now);
      } catch {
        // Fallback gracefully without noise
      }
    }

    this.isRunning = true;
    this.targetRPMRatio = 0.15;
    this.currentRPMRatio = 0.15;

    // Run animation loop for smooth RPM easing
    const step = () => {
      if (!this.isRunning || !this.ctx) return;

      const smoothing = this.targetRPMRatio > this.currentRPMRatio ? 0.08 : 0.04;
      this.currentRPMRatio += (this.targetRPMRatio - this.currentRPMRatio) * smoothing;

      if (onRpmUpdate) {
        onRpmUpdate(this.currentRPMRatio);
      }

      this.applyAcoustics(type, this.currentRPMRatio);
      this.animationFrameId = requestAnimationFrame(step);
    };

    this.animationFrameId = requestAnimationFrame(step);
  }

  private applyAcoustics(type: 'v4' | 'v-twin' | 'boxer' | 'electric', rpmRatio: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    if (type === 'electric') {
      const baseHz = 160 + rpmRatio * 750;
      if (this.osc1) this.osc1.frequency.setTargetAtTime(baseHz, now, 0.04);
      if (this.osc2) this.osc2.frequency.setTargetAtTime(baseHz * 2.2, now, 0.04);
      if (this.filter) this.filter.frequency.setTargetAtTime(800 + rpmRatio * 2400, now, 0.04);
    } else {
      const baseFreq = type === 'v-twin' ? 42 : type === 'boxer' ? 48 : 58;
      const multiplier = 1 + rpmRatio * 4.8;
      const targetHz = baseFreq * multiplier;

      if (this.osc1) this.osc1.frequency.setTargetAtTime(targetHz, now, 0.03);
      if (this.osc2) this.osc2.frequency.setTargetAtTime(targetHz * 1.5, now, 0.03);
      if (this.subOsc) this.subOsc.frequency.setTargetAtTime(targetHz * 0.5, now, 0.03);

      if (this.filter) {
        const filterCutoff = 350 + rpmRatio * 2200;
        this.filter.frequency.setTargetAtTime(filterCutoff, now, 0.03);
      }
    }
  }

  public setThrottle(isPressed: boolean) {
    this.targetRPMRatio = isPressed ? 0.92 : 0.15;
  }

  public stopEngine() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.masterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.15);
      } catch {
        // Ignore
      }
    }

    setTimeout(() => {
      try {
        this.osc1?.stop();
        this.osc1?.disconnect();
        this.osc2?.stop();
        this.osc2?.disconnect();
        this.subOsc?.stop();
        this.subOsc?.disconnect();
        this.noiseNode?.stop();
        this.noiseNode?.disconnect();
      } catch {
        // Node was already stopped
      }
      this.osc1 = null;
      this.osc2 = null;
      this.subOsc = null;
      this.noiseNode = null;
      this.isRunning = false;
    }, 180);
  }
}

export const engineSound = new EngineSoundEngine();

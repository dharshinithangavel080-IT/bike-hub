import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Flame } from 'lucide-react';
import { engineSound } from '../utils/audioSynth';

interface AudioRevControlProps {
  engineType: 'v4' | 'v-twin' | 'boxer' | 'electric';
  bikeName: string;
}

export const AudioRevControl: React.FC<AudioRevControlProps> = ({ engineType, bikeName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isThrottling, setIsThrottling] = useState(false);
  const [rpmRatio, setRpmRatio] = useState(0.15);
  const throttleActiveRef = useRef(false);

  // Stop engine when component unmounts or engine type changes
  useEffect(() => {
    return () => {
      engineSound.stopEngine();
    };
  }, [engineType]);

  const toggleEngine = () => {
    if (isPlaying) {
      engineSound.stopEngine();
      setIsPlaying(false);
      setRpmRatio(0.15);
    } else {
      setIsPlaying(true);
      engineSound.startEngine(engineType, (ratio) => {
        setRpmRatio(ratio);
      });
    }
  };

  const handleThrottleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isPlaying) {
      setIsPlaying(true);
      engineSound.startEngine(engineType, (ratio) => {
        setRpmRatio(ratio);
      });
    }
    throttleActiveRef.current = true;
    setIsThrottling(true);
    engineSound.setThrottle(true);
  };

  const handleThrottleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    throttleActiveRef.current = false;
    setIsThrottling(false);
    engineSound.setThrottle(false);
  };

  // Convert ratio to realistic RPM
  const maxRpm = engineType === 'v4' ? 16000 : engineType === 'v-twin' ? 10500 : engineType === 'boxer' ? 9000 : 18000;
  const currentRpm = Math.round(1200 + rpmRatio * (maxRpm - 1200));

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left: Engine identity & start toggle */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <button
          onClick={toggleEngine}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
            isPlaying
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
          }`}
        >
          {isPlaying ? <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          <span>{isPlaying ? 'Ignition Active' : 'Start Ignition'}</span>
        </button>

        <div className="text-xs text-zinc-400">
          <span className="font-medium text-zinc-200">{bikeName}</span>
          <span className="mx-1.5 text-zinc-600">·</span>
          <span className="capitalize">{engineType} Sound Profile</span>
        </div>
      </div>

      {/* Middle: Live Tachometer Display */}
      <div className="flex items-center gap-3 w-full md:w-64">
        <div className="w-full bg-zinc-950 rounded-lg p-2 border border-zinc-800/80">
          <div className="flex justify-between items-center text-[10px] text-zinc-400 mb-1">
            <span className="font-mono">RPM × 1000</span>
            <span className="font-mono tabular-nums text-amber-400 font-semibold">{currentRpm.toLocaleString()} RPM</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all duration-75 ${
                rpmRatio > 0.8 ? 'bg-red-500 shadow-sm shadow-red-500' : rpmRatio > 0.5 ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${Math.min(100, Math.max(8, rpmRatio * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Right: Hold to Rev Throttle Button */}
      <div className="w-full md:w-auto">
        <button
          onMouseDown={handleThrottleStart}
          onMouseUp={handleThrottleEnd}
          onMouseLeave={handleThrottleEnd}
          onTouchStart={handleThrottleStart}
          onTouchEnd={handleThrottleEnd}
          className={`w-full md:w-auto select-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
            isThrottling
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 scale-95'
              : 'bg-zinc-800 hover:bg-zinc-750 text-white border border-zinc-700 hover:border-amber-500/50'
          }`}
        >
          <Flame className={`w-4 h-4 ${isThrottling ? 'text-amber-300 animate-bounce' : 'text-zinc-400'}`} />
          <span>{isThrottling ? 'Wide Open Throttle!' : 'Hold To Rev Throttle'}</span>
        </button>
      </div>
    </div>
  );
};

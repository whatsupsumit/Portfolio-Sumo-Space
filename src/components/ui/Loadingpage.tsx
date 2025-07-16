"use client";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("INITIALIZING");
  const fullText = "<Sumit.dev />";
  const phases = [
    "INITIALIZING",
    "LOADING",
    "CONNECTING",
    "READY"
  ];

  useEffect(() => {
    let textIndex = 0;
    let progressValue = 0;
    let phaseIndex = 0;

    const textInterval = setInterval(() => {
      setText(fullText.substring(0, textIndex));
      textIndex++;
      if (textIndex > fullText.length) clearInterval(textInterval);
    }, 120);

    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 4 + 2;
      if (progressValue >= 100) {
        progressValue = 100;
        setProgress(100);
        setPhase("READY");
        clearInterval(progressInterval);
        setTimeout(onComplete, 700);
      } else {
        setProgress(Math.floor(progressValue));
        const newPhaseIndex = Math.floor((progressValue / 100) * (phases.length - 1));
        if (newPhaseIndex !== phaseIndex && newPhaseIndex < phases.length - 1) {
          phaseIndex = newPhaseIndex;
          setPhase(phases[phaseIndex]);
        }
      }
    }, 60);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Lofi glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-pink-400/10 blur-2xl"></div>
      </div>

      {/* Main logo */}
      <div className="relative z-10 mb-10 text-center">
        <span
          className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          style={{
            textShadow: "0 0 12px rgba(34,211,238,0.3), 0 0 24px rgba(236,72,153,0.2)",
            letterSpacing: "0.08em"
          }}
        >
          {text}
        </span>
        <span className="ml-1 text-pink-400 animate-pulse text-3xl align-middle">|</span>
      </div>

      {/* Loading bar */}
      <div className="relative w-[260px] h-3 rounded-full bg-gray-800/60 overflow-hidden shadow-lg border border-gray-700/40 mb-8">
        <div
          className="absolute h-full bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            boxShadow: "0 0 16px 2px rgba(236,72,153,0.3), 0 0 32px 4px rgba(34,211,238,0.2)"
          }}
        />
      </div>

      {/* Loading phase and message */}
      <div className="relative z-10 text-center">
        <div className="text-base font-mono tracking-widest mb-2">
          <span className="text-cyan-400">[</span>
          <span className="mx-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold animate-pulse">
            {phase}
          </span>
          <span className="text-cyan-400">]</span>
        </div>
        <div className="text-sm text-gray-400 font-mono tracking-wider flex items-center justify-center gap-2">
          <span className="text-green-400">{'>'}</span>
          <span>
            {progress < 30 && "Booting lofi vibes"}
            {progress >= 30 && progress < 60 && "Warming up synths"}
            {progress >= 60 && progress < 100 && "Chilling..."}
            {progress >= 100 && "Ready to groove!"}
          </span>
          <span className="animate-pulse text-cyan-400 ml-1">...</span>
          <span className="ml-3 text-cyan-300 font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
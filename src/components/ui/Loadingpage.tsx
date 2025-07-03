"use client";
import { useEffect, useState } from "react";
import styles from "./LoadingPage.module.css";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState("INITIALIZING");
  const fullText = "<Sumit.dev />";

  const loadingPhases = [
    "INITIALIZING",
    "LOADING ASSETS",
    "CONNECTING",
    "OPTIMIZING",
    "FINALIZING",
    "READY"
  ];

  useEffect(() => {
    let textIndex = 0;
    let progressValue = 0;
    let phaseIndex = 0;

    // Text typing animation
    const textInterval = setInterval(() => {
      setText(fullText.substring(0, textIndex));
      textIndex++;

      if (textIndex > fullText.length) {
        clearInterval(textInterval);
      }
    }, 120);

    // Progress and phase animation
    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 3 + 1; // Random increment for realistic loading
      
      if (progressValue >= 100) {
        progressValue = 100;
        setProgress(100);
        setLoadingPhase("READY");
        clearInterval(progressInterval);
        
        setTimeout(() => {
          onComplete();
        }, 800);
      } else {
        setProgress(Math.floor(progressValue));
        
        // Update phase based on progress
        const newPhaseIndex = Math.floor((progressValue / 100) * (loadingPhases.length - 1));
        if (newPhaseIndex !== phaseIndex && newPhaseIndex < loadingPhases.length - 1) {
          phaseIndex = newPhaseIndex;
          setLoadingPhase(loadingPhases[phaseIndex]);
        }
      }
    }, 50);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Matrix-like floating dots */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glowing container for text */}
        <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-r from-gray-900/50 to-slate-900/50 backdrop-blur-xl border border-pink-500/20 shadow-2xl">
          {/* Rotating border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-blue-500 to-cyan-500 p-[2px] animate-spin">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
          </div>
          
          {/* Text content with percentage */}
          <div className="relative z-10 text-center">
            {/* Main logo text */}
            <div className="text-3xl md:text-4xl lg:text-6xl font-mono font-bold mb-4">
              <span 
                className="bg-gradient-to-r from-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse"
                style={{
                  textShadow: "0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)",
                  filter: "drop-shadow(0 0 10px rgba(236, 72, 153, 0.8))",
                }}
              >
                {text}
              </span>
              <span className="animate-bounce ml-2 text-pink-400 text-5xl">|</span>
            </div>

            {/* Percentage display */}
            <div className="relative">
              {/* Glowing percentage background */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-xl rounded-lg"></div>
              
              {/* Percentage text */}
              <div className="relative text-4xl md:text-5xl lg:text-7xl font-mono font-black tracking-wider">
                <span 
                  className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 0 40px rgba(34, 211, 238, 0.8)",
                    filter: "drop-shadow(0 0 15px rgba(34, 211, 238, 0.9))",
                  }}
                >
                  {progress}
                </span>
                <span className="text-gray-400 text-3xl md:text-4xl lg:text-5xl ml-2">%</span>
              </div>
              
              {/* Binary rain effect around percentage */}
              <div className="absolute -top-4 -left-4 text-xs text-green-400 opacity-30 animate-pulse font-mono">
                {Array.from({length: 8}, (_, i) => (
                  <div key={i} className="animate-ping" style={{animationDelay: `${i * 0.2}s`}}>
                    {Math.random() > 0.5 ? '1' : '0'}
                  </div>
                ))}
              </div>
              
              <div className="absolute -top-4 -right-4 text-xs text-green-400 opacity-30 animate-pulse font-mono">
                {Array.from({length: 8}, (_, i) => (
                  <div key={i} className="animate-ping" style={{animationDelay: `${i * 0.15}s`}}>
                    {Math.random() > 0.5 ? '1' : '0'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced loading bar with progress */}
        <div className="relative w-[300px] md:w-[400px] h-3 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50 shadow-xl">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 animate-pulse"></div>
          
          {/* Moving gradient bar */}
          <div 
            className="relative h-full bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(34, 211, 238, 0.4)",
            }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
          </div>
          
          {/* Progress indicator dots */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            {[0, 25, 50, 75, 100].map((milestone) => (
              <div
                key={milestone}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  progress >= milestone 
                    ? 'bg-white shadow-lg shadow-cyan-400/50' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          {/* Sparkling effect */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/4 ${styles.sparkle}`}
          ></div>
        </div>

        {/* Loading text with phase and creative effects */}
        <div className="mt-8 text-center">
          {/* Phase indicator */}
          <div className="text-lg font-mono tracking-widest mb-2">
            <span className="text-pink-400 animate-pulse">{'['}</span>
            <span 
              className="mx-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold"
              style={{
                textShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
              }}
            >
              {loadingPhase}
            </span>
            <span className="text-pink-400 animate-pulse">{']'}</span>
          </div>
          
          {/* Technical loading text */}
          <div className="text-sm text-gray-400 animate-pulse font-mono tracking-wider">
            <span className="text-green-400">{'>'}</span>
            <span className="ml-2">
              {progress < 20 && "Booting quantum core systems"}
              {progress >= 20 && progress < 40 && "Calibrating neural networks"}
              {progress >= 40 && progress < 60 && "Establishing secure connections"}
              {progress >= 60 && progress < 80 && "Optimizing performance matrices"}
              {progress >= 80 && progress < 100 && "Finalizing experience render"}
              {progress >= 100 && "Experience ready for deployment"}
            </span>
            <span className="animate-ping text-cyan-400 ml-1">...</span>
          </div>

          {/* Progress stats */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-xs font-mono">
            <div className="text-center">
              <div className="text-pink-400 font-bold">{Math.floor(progress * 1.2 + 20)}</div>
              <div className="text-gray-500">FILES</div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-bold">{Math.floor(progress * 0.8 + 10)}ms</div>
              <div className="text-gray-500">LATENCY</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold">{Math.floor(progress * 2 + 50)}MB</div>
              <div className="text-gray-500">LOADED</div>
            </div>
          </div>
        </div>

        {/* Enhanced floating elements with progress-based animations */}
        <div className="absolute -top-10 -left-10 w-4 h-4 border border-pink-400 rotate-45 animate-spin" style={{animationDuration: `${3 - (progress/50)}s`}}></div>
        <div className="absolute -top-8 -right-12 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-500"></div>
        <div className="absolute -bottom-12 -left-8 w-2 h-8 bg-gradient-to-t from-pink-500 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute -bottom-10 -right-10 w-6 h-6 border-2 border-blue-400 rounded-full animate-ping delay-1500"></div>
        
        {/* Additional progress-based elements */}
        {progress > 25 && (
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        )}
        {progress > 50 && (
          <div className="absolute bottom-20 right-20 w-3 h-3 border border-cyan-400 animate-spin" style={{animationDuration: '2s'}}></div>
        )}
        {progress > 75 && (
          <div className="absolute top-32 right-16 w-1 h-6 bg-gradient-to-b from-pink-500 to-transparent animate-pulse"></div>
        )}
      </div>
    </div>
  );
};
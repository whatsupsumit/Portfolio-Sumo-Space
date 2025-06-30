"use client";
import { useEffect, useState } from "react";
import styles from "./LoadingPage.module.css";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [text, setText] = useState("");
  const fullText = "<Sumit.dev />";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
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
          
          {/* Text content */}
          <div className="relative z-10 text-3xl md:text-4xl lg:text-6xl font-mono font-bold text-center">
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
        </div>

        {/* Advanced loading bar */}
        <div className="relative w-[300px] md:w-[400px] h-2 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50 shadow-xl">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 animate-pulse"></div>
          
          {/* Moving gradient bar */}
          <div 
            className={`relative h-full bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-cyan-500 rounded-full animate-pulse shadow-lg ${styles.loadingSlide}`}
            style={{
              width: "45%",
              boxShadow: "0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(34, 211, 238, 0.4)",
            }}
          ></div>
          
          {/* Sparkling effect */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/4 ${styles.sparkle}`}
          ></div>
        </div>

        {/* Loading text with typing effect */}
        <div className="mt-8 text-lg text-gray-300 animate-pulse font-mono tracking-wider">
          <span className="text-pink-400">{'>'}</span>
          <span className="ml-2">Initializing quantum experience</span>
          <span className="animate-ping text-cyan-400">...</span>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-10 -left-10 w-4 h-4 border border-pink-400 rotate-45 animate-spin"></div>
        <div className="absolute -top-8 -right-12 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-500"></div>
        <div className="absolute -bottom-12 -left-8 w-2 h-8 bg-gradient-to-t from-pink-500 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute -bottom-10 -right-10 w-6 h-6 border-2 border-blue-400 rounded-full animate-ping delay-1500"></div>
      </div>
    </div>
  );
};
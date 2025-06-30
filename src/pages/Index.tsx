import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sun, Moon } from "lucide-react";

const Index = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showEducation, setShowEducation] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.toggle("light-theme", theme === "light");
    document.documentElement.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`min-h-screen ${theme === "dark" 
        ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white" 
        : "bg-gradient-to-br from-pink-25 via-rose-25 to-pink-50 text-gray-900"} 
      overflow-x-hidden transition-colors duration-300 relative`}
      style={{
        background: theme === "light" 
          ? "linear-gradient(135deg, #fdf2f8 0%, #fef7f7 25%, #fff1f2 50%, #fdf2f8 75%, rgb(249, 215, 224) 100%)"
          : undefined
      }}>
      
      {/* Light mode background effects */}
      {theme === "light" && (
        <>
          {/* Simple light background overlay */}
          <div className="fixed inset-0 bg-gradient-to-br from-white/20 via-pink-50/10 to-rose-50/15 backdrop-blur-[0.5px] pointer-events-none"></div>
        </>
      )}
      
      {/* Theme Toggle Button - Fixed in the top right corner */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className={`rounded-full w-10 h-10 ${theme === "dark" 
            ? "bg-gray-800/80 border-neon-pink/50 text-neon-pink hover:bg-neon-pink hover:text-black" 
            : "bg-white/90 border-pink-500/50 text-pink-600 hover:bg-pink-500 hover:text-white shadow-lg shadow-pink-500/20"} 
            backdrop-blur-sm transition-all duration-150`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>

      {/* Hero Section - Full height to be visible on first load */}
      <section className={`min-h-[100vh] flex items-center container mx-auto px-4 py-20 md:py-32 relative ${
        theme === "light" ? "backdrop-blur-sm" : ""
      }`}>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full relative z-10">
          {/* Left side - Avatar with Sumit.dev text */}
          <div className="flex flex-col justify-center items-center space-y-6">
            {/* Container for both avatar and text with slight left offset */}
            <div className="flex flex-col items-center space-y-4 lg:-translate-x-8">
              {/* Avatar - Centered */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <img
                src="/avatar.png"
                alt="Sumit Kumar Avatar"
                className={`absolute inset-0 w-full h-full object-cover animate-float border-4 ${
                  theme === "dark" ? "border-neon-pink" : "border-pink-500"
                }`}
                style={{
                  boxShadow: theme === "dark"
                    ? "0 0 40px 10px #ff00ff80, 0 0 80px 20px #00ffff40, 0 0 0 8px #1a1a2e inset"
                    : "0 0 30px 8px rgba(236, 72, 153, 0.4), 0 0 60px 15px rgba(219, 39, 119, 0.2), 0 0 0 8px rgba(252, 231, 243, 0.9) inset, inset 0 0 0 4px rgba(236, 72, 153, 0.15)",
                  background: theme === "dark" 
                    ? "black" 
                    : "linear-gradient(135deg, rgba(252, 231, 243, 0.8) 0%, rgba(251, 207, 232, 0.6) 50%, rgba(250, 182, 217, 0.4) 100%)",
                  objectPosition: "center center",
                  borderRadius: "30%",
                }}
              />
              <div
                className={`absolute inset-0 border-4 ${
                  theme === "dark" ? "border-neon-pink/50" : "border-pink-500/60"
                } animate-neon-pulse pointer-events-none`}
                style={{ borderRadius: "30%" }}
              ></div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: theme === "dark"
                    ? "0 0 60px 20px #ff00ff55, 0 0 120px 40px #00ffff33"
                    : "0 0 40px 15px rgba(236, 72, 153, 0.3), 0 0 80px 25px rgba(219, 39, 119, 0.15)",
                  borderRadius: "30%",
                }}
              ></div>
            </div>
            
            {/* Sumit.dev Text - Positioned below avatar */}
            <h3 className={`text-xl md:text-2xl lg:text-3xl font-michroma font-bold ${
              theme === "dark" 
                ? "bg-gradient-to-r from-white via-neon-pink to-neon-blue bg-clip-text text-transparent" 
                : "bg-gradient-to-r from-gray-800 via-pink-600 to-rose-600 bg-clip-text text-transparent"
            }`}
            style={{
              textShadow: theme === "dark" 
                ? "0 0 20px rgba(255, 0, 255, 0.4), 0 0 40px rgba(0, 255, 255, 0.3)"
                : "0 0 15px rgba(236, 72, 153, 0.4), 0 0 25px rgba(219, 39, 119, 0.2)"
            }}>
              Sumit.dev
            </h3>
          </div>
        </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-michroma font-bold leading-tight ${
              theme === "light" ? "text-gray-900" : ""
            }`}>
              Hi, I'm
              <br />
              <span className={`${theme === "dark" 
                ? "bg-gradient-to-r from-neon-pink to-neon-blue" 
                : "bg-gradient-to-r from-pink-600 to-rose-600"} bg-clip-text text-transparent`}>
                Sumit Kumar
              </span>
              <br />
              <span className={`text-3xl md:text-4xl lg:text-5xl ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                Full Stack Developer
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="outline"
                size="lg"
                className={`border-2 ${theme === "dark" 
                  ? "border-neon-pink bg-transparent text-neon-pink hover:bg-neon-pink" 
                  : "border-pink-500 bg-transparent text-pink-600 hover:bg-pink-500 shadow-lg shadow-pink-500/20"} 
                  hover:text-${theme === "dark" ? "black" : "white"} transition-all duration-150 font-semibold relative overflow-hidden group`}
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10">View Projects</span>
                <div className={`absolute inset-0 ${theme === "dark" 
                  ? "bg-gradient-to-r from-neon-pink/20 to-neon-purple/20"
                  : "bg-gradient-to-r from-pink-500/20 to-rose-500/20"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-150`}></div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className={`border-2 ${theme === "dark" 
                  ? "border-neon-blue bg-transparent text-neon-blue hover:bg-neon-blue" 
                  : "border-rose-500 bg-transparent text-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-500/20"} 
                  hover:text-${theme === "dark" ? "black" : "white"} transition-all duration-150 font-semibold relative overflow-hidden group`}
                asChild
              >
                <a href="https://drive.google.com/file/d/1CYsUqzBHIyLuik6GyhgyH2tdAvKsMB-O/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10">Download Resume</span>
                  <div className={`absolute inset-0 ${theme === "dark" 
                    ? "bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20"
                    : "bg-gradient-to-r from-rose-500/20 to-pink-500/20"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-150`}></div>
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className={`border-2 ${theme === "dark" 
                  ? "border-neon-purple bg-transparent text-neon-purple hover:bg-neon-purple" 
                  : "border-pink-600 bg-transparent text-pink-700 hover:bg-pink-600 shadow-lg shadow-pink-600/20"} 
                  hover:text-${theme === "dark" ? "black" : "white"} transition-all duration-150 font-semibold relative overflow-hidden group`}
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10">Hire Me</span>
                <div className={`absolute inset-0 ${theme === "dark" 
                  ? "bg-gradient-to-r from-neon-purple/20 to-neon-pink/20"
                  : "bg-gradient-to-r from-pink-600/20 to-rose-600/20"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-150`}></div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Me & Tech Stack Section - MOVED DOWN */}
      <section id="about" className={`container mx-auto px-4 py-32 mt-20 relative ${
        theme === "light" ? "text-gray-800" : ""
      }`}>
        
        <div className="grid lg:grid-cols-2 gap-16 relative z-10">
          {/* About Me */}
          <div>
            <h2 className="text-3xl md:text-4xl font-michroma font-bold mb-8">
              <span className={`${theme === "dark" 
                ? "bg-gradient-to-r from-neon-purple to-neon-pink" 
                : "bg-gradient-to-r from-pink-600 to-rose-600"} bg-clip-text text-transparent`}>
                About Me
              </span>
            </h2>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEducation(!showEducation);
                  setShowExperience(false);
                  setShowBackground(false);
                }}
                className={`border ${theme === "dark" 
                  ? "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan" 
                  : "border-pink-500/50 bg-pink-500/10 text-pink-600 hover:bg-pink-500 shadow-md shadow-pink-500/20"} 
                  hover:text-${theme === "dark" ? "black" : "white"} transition-all duration-150 rounded-full px-6 ${
                  showEducation ? (theme === "dark" ? "bg-neon-cyan text-black" : "bg-pink-500 text-white") : ""
                }`}
              >
                Education
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowExperience(!showExperience);
                  setShowEducation(false);
                  setShowBackground(false);
                }}
                className={`border ${theme === "dark" 
                  ? "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan" 
                  : "border-pink-500/50 bg-pink-500/10 text-pink-600 hover:bg-pink-500 shadow-md shadow-pink-500/20"} 
                  hover:text-${theme === "dark" ? "black" : "white"} transition-all duration-150 rounded-full px-6 ${
                  showExperience ? (theme === "dark" ? "bg-neon-cyan text-black" : "bg-pink-500 text-white") : ""
                }`}
              >
                Experience
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowBackground(!showBackground);
                  setShowEducation(false);
                  setShowExperience(false);
                }}
                className={`border ${theme === "dark" 
                  ? "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan" 
                  : "border-pink-500/50 bg-pink-500/10 text-pink-600 hover:bg-pink-500 shadow-md shadow-pink-500/20"} 
                  hover:text-${theme === "dark" ? "black" : "white"} transition-all duration-150 rounded-full px-6 ${
                  showBackground ? (theme === "dark" ? "bg-neon-cyan text-black" : "bg-pink-500 text-white") : ""
                }`}
              >
                Background
              </Button>
            </div>

            {/* Education Card - Appears when Education button is clicked */}
            {showEducation && (
              <div className="mb-8 animate-in slide-in-from-top-4 duration-300">
                <Card className={`${
                  theme === "dark" 
                    ? "bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-neon-cyan/30 shadow-2xl shadow-neon-cyan/20" 
                    : "bg-gradient-to-br from-white/95 to-pink-50/90 border border-pink-300/60 shadow-2xl shadow-pink-500/20 backdrop-blur-lg"
                } p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
                style={theme === "light" ? {
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.8) 50%, rgba(251, 207, 232, 0.6) 100%)",
                  backdropFilter: "blur(15px)"
                } : {}}>
                  
                  {/* Decorative elements */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                    theme === "dark" 
                      ? "bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple" 
                      : "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600"
                  }`}></div>
                  
                  {theme === "dark" && (
                    <>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-neon-cyan rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-neon-blue rounded-full animate-pulse"></div>
                    </>
                  )}
                  
                  {theme === "light" && (
                    <>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-pink-500/60 rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-rose-500/60 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 right-2 w-1 h-4 bg-gradient-to-t from-pink-400/20 to-transparent"></div>
                    </>
                  )}

                  <div className="space-y-6 relative z-10">
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        theme === "dark" 
                          ? "bg-neon-cyan/20 border border-neon-cyan/40" 
                          : "bg-pink-500/20 border border-pink-500/40"
                      }`}>
                        <span className="text-xl">🎓</span>
                      </div>
                      <h3 className={`text-2xl font-bold ${
                        theme === "dark" 
                          ? "bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent" 
                          : "bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                      }`}>
                        Education Journey
                      </h3>
                    </div>

                    {/* Education Details */}
                    <div className="space-y-4">
                      {/* Degree 1 */}
                      <div className={`p-4 rounded-lg border ${
                        theme === "dark" 
                          ? "bg-gray-800/40 border-gray-700/50" 
                          : "bg-white/60 border-pink-200/50"
                      } group/item hover:scale-[1.01] transition-all duration-200`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`font-semibold text-lg ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                              Bachelor of Technology (B.Tech)
                            </h4>
                            <p className={`${
                              theme === "dark" 
                                ? "text-neon-cyan group-hover/item:text-neon-blue" 
                                : "text-pink-600 group-hover/item:text-rose-600"
                            } font-medium transition-colors`}>
                              Computer Science & Engineering
                            </p>
                            <p className={`text-sm ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              XYZ University • 2020 - 2024
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            theme === "dark" 
                              ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30" 
                              : "bg-pink-500/20 text-pink-600 border border-pink-500/30"
                          }`}>
                            CGPA: 8.5
                          </div>
                        </div>
                      </div>

                      {/* Degree 2 */}
                      <div className={`p-4 rounded-lg border ${
                        theme === "dark" 
                          ? "bg-gray-800/40 border-gray-700/50" 
                          : "bg-white/60 border-pink-200/50"
                      } group/item hover:scale-[1.01] transition-all duration-200`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`font-semibold text-lg ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                              Higher Secondary Education
                            </h4>
                            <p className={`${
                              theme === "dark" 
                                ? "text-neon-cyan group-hover/item:text-neon-blue" 
                                : "text-pink-600 group-hover/item:text-rose-600"
                            } font-medium transition-colors`}>
                              Science (PCM)
                            </p>
                            <p className={`text-sm ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              ABC School • 2018 - 2020
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            theme === "dark" 
                              ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30" 
                              : "bg-rose-500/20 text-rose-600 border border-rose-500/30"
                          }`}>
                            92.5%
                          </div>
                        </div>
                      </div>

                      {/* Key Achievements */}
                      <div className={`p-4 rounded-lg border-2 border-dashed ${
                        theme === "dark" 
                          ? "border-neon-purple/30 bg-neon-purple/5" 
                          : "border-pink-400/30 bg-pink-400/5"
                      }`}>
                        <h5 className={`font-semibold mb-2 ${
                          theme === "dark" 
                            ? "text-neon-purple" 
                            : "text-pink-700"
                        }`}>
                          🏆 Key Achievements
                        </h5>
                        <ul className={`text-sm space-y-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}>
                          <li>• Dean's List for 3 consecutive semesters</li>
                          <li>• Led university coding club with 200+ members</li>
                          <li>• Won 2nd place in National Hackathon 2023</li>
                          <li>• Published research paper on ML algorithms</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Experience Card - Appears when Experience button is clicked */}
            {showExperience && (
              <div className="mb-8 animate-in slide-in-from-top-4 duration-300">
                <Card className={`${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-neon-cyan/30 shadow-2xl shadow-neon-cyan/20"
                    : "bg-gradient-to-br from-white/95 to-pink-50/90 border border-pink-300/60 shadow-2xl shadow-pink-500/20 backdrop-blur-lg"
                } p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
                style={theme === "light" ? {
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.8) 50%, rgba(251, 207, 232, 0.6) 100%)",
                  backdropFilter: "blur(15px)"
                } : {}}>
                  
                  {/* Decorative elements */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                    theme === "dark" 
                      ? "bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple" 
                      : "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600"
                  }`}></div>
                  
                  {theme === "dark" && (
                    <>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-neon-cyan rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-neon-blue rounded-full animate-pulse"></div>
                    </>
                  )}
                  
                  {theme === "light" && (
                    <>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-pink-500/60 rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-rose-500/60 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 right-2 w-1 h-4 bg-gradient-to-t from-pink-400/20 to-transparent"></div>
                    </>
                  )}

                  <div className="space-y-6 relative z-10">
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        theme === "dark" 
                          ? "bg-neon-cyan/20 border border-neon-cyan/40" 
                          : "bg-pink-500/20 border border-pink-500/40"
                      }`}>
                        <span className="text-xl">💼</span>
                      </div>
                      <h3 className={`text-2xl font-bold ${
                        theme === "dark" 
                          ? "bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent" 
                          : "bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                      }`}>
                        Experience & Achievements
                      </h3>
                    </div>

                    {/* Experience Timeline */}
                    <div className="space-y-4">
                      {/* Notable Projects Header */}
                      <div className={`p-4 rounded-lg border ${
                        theme === "dark" 
                          ? "bg-gray-800/40 border-gray-700/50" 
                          : "bg-white/60 border-pink-200/50"
                      }`}>
                        <h4 className={`font-semibold text-lg mb-4 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                          🛠️ Notable Projects
                        </h4>
                        
                        {/* Project 1 - RentCircle */}
                        <div className="mb-4 pb-4 border-b border-gray-600/30">
                          <h5 className={`font-semibold ${
                            theme === "dark" ? "text-neon-cyan" : "text-pink-600"
                          }`}>
                            RentCircle
                          </h5>
                          <p className={`text-sm mt-1 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}>
                            A peer-to-peer rental platform with real-time chat, rental agreements, and maps integration built using Next.js, TypeScript, and PostgreSQL.
                          </p>
                        </div>

                        {/* Project 2 - SumoArts */}
                        <div className="mb-4 pb-4 border-b border-gray-600/30">
                          <h5 className={`font-semibold ${
                            theme === "dark" ? "text-neon-cyan" : "text-pink-600"
                          }`}>
                            SumoArts
                          </h5>
                          <p className={`text-sm mt-1 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}>
                            A digital art gallery allowing users to upload, share, and view sketch-based artworks, built with React and Imgur integration.
                          </p>
                        </div>

                        {/* Project 3 - CivicCircle */}
                        <div>
                          <h5 className={`font-semibold ${
                            theme === "dark" ? "text-neon-cyan" : "text-pink-600"
                          }`}>
                            CivicCircle
                          </h5>
                          <p className={`text-sm mt-1 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}>
                            A neighborhood community web app for posting and requesting help, featuring real-time updates, map pins, and chat, built using Socket.IO and Node.js.
                          </p>
                        </div>
                      </div>

                      {/* Key Achievements & Skills */}
                      <div className={`p-4 rounded-lg border-2 border-dashed ${
                        theme === "dark" 
                          ? "border-neon-purple/30 bg-neon-purple/5" 
                          : "border-pink-400/30 bg-pink-400/5"
                      }`}>
                        <h5 className={`font-semibold mb-4 ${
                          theme === "dark" 
                            ? "text-neon-purple" 
                            : "text-pink-700"
                        }`}>
                          🌟 Key Achievements & Skills
                        </h5>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Coding & Problem Solving */}
                          <div>
                            <h6 className={`font-semibold mb-3 flex items-center ${
                              theme === "dark" ? "text-gray-200" : "text-gray-800"
                            }`}>
                              🧠 Coding & Problem Solving
                            </h6>
                            <ul className={`text-sm space-y-2 ${
                              theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}>
                              <li>• Solved 500+ coding problems across platforms</li>
                              <li>• Achieved All India Rank 245 in national coding contest</li>
                              <li>• Strong grasp on DSA, OOPs, and system design</li>
                            </ul>
                          </div>

                          {/* Project Highlights */}
                          <div>
                            <h6 className={`font-semibold mb-3 flex items-center ${
                              theme === "dark" ? "text-gray-200" : "text-gray-800"
                            }`}>
                              🚀 Project Highlights
                            </h6>
                            <ul className={`text-sm space-y-2 ${
                              theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}>
                              <li>• Built multiple full-stack applications from scratch</li>
                              <li>• Designed responsive and user-friendly UIs</li>
                              <li>• Integrated real-time features & authentication</li>
                              <li>• Passionate about turning ideas into tech solutions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Background Card - Appears when Background button is clicked */}
            {showBackground && (
              <div className="mb-8 animate-in slide-in-from-top-4 duration-300">
                <Card className={`${
                  theme === "dark" 
                    ? "bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-neon-cyan/30 shadow-2xl shadow-neon-cyan/20" 
                    : "bg-gradient-to-br from-white/95 to-pink-50/90 border border-pink-300/60 shadow-2xl shadow-pink-500/20 backdrop-blur-lg"
                } p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
                style={theme === "light" ? {
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.8) 50%, rgba(251, 207, 232, 0.6) 100%)",
                  backdropFilter: "blur(15px)"
                } : {}}>
                  
                  {/* Decorative elements */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                    theme === "dark" 
                      ? "bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple" 
                      : "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600"
                  }`}></div>
                  
                  {theme === "dark" && (
                    <>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-neon-cyan rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-neon-blue rounded-full animate-pulse"></div>
                    </>
                  )}
                  
                  {theme === "light" && (
                    <>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-pink-500/60 rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-rose-500/60 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 right-2 w-1 h-4 bg-gradient-to-t from-pink-400/20 to-transparent"></div>
                    </>
                  )}

                  <div className="space-y-6 relative z-10">
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        theme === "dark" 
                          ? "bg-neon-cyan/20 border border-neon-cyan/40" 
                          : "bg-pink-500/20 border border-pink-500/40"
                      }`}>
                        <span className="text-xl">🌟</span>
                      </div>
                      <h3 className={`text-2xl font-bold ${
                        theme === "dark" 
                          ? "bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent" 
                          : "bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                      }`}>
                        My Background & Passion
                      </h3>
                    </div>

                    {/* Background Sections */}
                    <div className="space-y-4">
                      {/* Origin Story */}
                      <div className={`p-4 rounded-lg border ${
                        theme === "dark" 
                          ? "bg-gray-800/40 border-gray-700/50" 
                          : "bg-white/60 border-pink-200/50"
                      } group/item hover:scale-[1.01] transition-all duration-200`}>
                        <h4 className={`font-semibold text-lg mb-3 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                          🚀 The Journey Begins
                        </h4>
                        <p className={`text-sm leading-relaxed ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}>
                          My journey into tech started with a curiosity about how websites work. What began as simple HTML pages 
                          evolved into a passionate pursuit of creating digital experiences that blend beautiful design with 
                          powerful functionality. Every line of code is an opportunity to solve problems and build something meaningful.
                        </p>
                      </div>

                      {/* Creative Side */}
                      <div className={`p-4 rounded-lg border ${
                        theme === "dark" 
                          ? "bg-gray-800/40 border-gray-700/50" 
                          : "bg-white/60 border-pink-200/50"
                      } group/item hover:scale-[1.01] transition-all duration-200`}>
                        <h4 className={`font-semibold text-lg mb-3 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                          🎨 Beyond Code
                        </h4>
                        <p className={`text-sm leading-relaxed ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}>
                          I believe great developers are also great problem solvers and storytellers. Alongside my technical growth, 
                          I've always been drawn to the world of art and design—from sketching detailed portraits to exploring creative 
                          coding. My design thinking mindset allows me to approach development with user experience at the forefront.
                          Outside of tech, I'm also a sports enthusiast, having been selected for the Under-14 Basketball Nationals, 
                          which taught me leadership, focus, and teamwork—values I bring into every project and collaboration.
                        </p>
                      </div>

                      {/* Philosophy & Values */}
                      <div className={`p-4 rounded-lg border-2 border-dashed ${
                        theme === "dark" 
                          ? "border-neon-purple/30 bg-neon-purple/5" 
                          : "border-pink-400/30 bg-pink-400/5"
                      }`}>
                        <h5 className={`font-semibold mb-3 ${
                          theme === "dark" 
                            ? "text-neon-purple" 
                            : "text-pink-700"
                        }`}>
                          💡 Core Values & Philosophy
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h6 className={`font-medium mb-2 ${
                              theme === "dark" ? "text-gray-200" : "text-gray-800"
                            }`}>Development Philosophy</h6>
                            <ul className={`text-sm space-y-1 ${
                              theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}>
                              <li>• User-first design thinking</li>
                              <li>• Clean, maintainable code</li>
                              <li>• Continuous learning mindset</li>
                              <li>• Collaborative team spirit</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className={`font-medium mb-2 ${
                              theme === "dark" ? "text-gray-200" : "text-gray-800"
                            }`}>Personal Interests</h6>
                            <div className="flex flex-wrap gap-2">
                              {['UI/UX Design', 'Tech Mentoring', 'Creative Coding', 'Sketch Art & Drawing', 'Basketball & Team Sports'].map((interest) => (
                                <span key={interest} className={`px-2 py-1 rounded-full text-xs ${
                                  theme === "dark" 
                                    ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30" 
                                    : "bg-pink-500/20 text-pink-600 border border-pink-500/30"
                                }`}>
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            <p className={theme === "dark" ? "text-gray-300 leading-relaxed" : "text-gray-700 leading-relaxed"}>
              A passionate and creative Full-Stack Developer with a strong grip
              on technologies like React, Node.js, PHP, and MongoDB. Loves
              turning complex problems into simple, elegant solutions and
              building fast, responsive, and visually appealing web
              applications. Also an artist at heart — blending design with code
              to create immersive digital experiences. From real-world
              innovations to cloud-powered platforms, always focused on clean
              architecture, user experience, and performance.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-3xl md:text-4xl font-michroma font-bold mb-8">
              <span className={`${theme === "dark" 
                ? "bg-gradient-to-r from-neon-blue to-neon-cyan" 
                : "bg-gradient-to-r from-rose-600 to-pink-600"} bg-clip-text text-transparent`}>
                Tech Stack
              </span>
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
              {[
                { name: "DSA", icon: "🧠" },
                { name: "CSS3", icon: "🎨" },
                { name: "JavaScript", icon: "⚡" },
                { name: "NodeJS", icon: "🟢" },
                { name: "React", icon: "⚛️" },
                { name: "TypeScript", icon: "📘" },
                { name: "Tailwind", icon: "🎨" },
                { name: "DevOps", icon: "⚙️" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-lg ${
                    theme === "dark" 
                      ? "bg-gray-800/30 border border-gray-700 hover:border-neon-blue/50" 
                      : "bg-gradient-to-br from-white/90 to-pink-50/80 border border-pink-200/60 hover:border-pink-400/60 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 backdrop-blur-sm"
                  } transition-all duration-150 group hover:scale-105 hover:-translate-y-1`}
                  style={theme === "light" ? {
                    backdropFilter: "blur(10px)",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(252, 231, 243, 0.6) 100%)"
                  } : {}}
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-150">
                    {tech.icon}
                  </div>
                  <span className={`text-sm ${
                    theme === "dark" 
                      ? "text-gray-300 group-hover:text-neon-blue" 
                      : "text-gray-700 group-hover:text-pink-600"
                  } transition-colors font-medium`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-32 relative">
        <h2 className="text-4xl md:text-5xl font-michroma font-bold text-center mb-16">
          <span className={`${theme === "dark" 
            ? "bg-gradient-to-r from-neon-cyan to-neon-blue" 
            : "bg-gradient-to-r from-pink-600 to-rose-600"} bg-clip-text text-transparent`}>
            Projects
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Project One", tech: ["React", "NodeJS", "AWS"] },
            { title: "Project Two", tech: ["React", "AWS", "MongoDB"] },
            { title: "Project Three", tech: ["Express", "AWS", "PostgreSQL"] },
            { title: "Project Four", tech: ["Next.js", "TypeScript", "AWS"] },
          ].map((project, index) => (
            <Card
              key={index}
              className={`${
                theme === "dark" 
                  ? "bg-gray-800/50 border-gray-700 hover:border-neon-pink/50" 
                  : "bg-gradient-to-br from-white/95 to-pink-50/90 border border-pink-200/60 hover:border-pink-400/70 shadow-xl shadow-pink-500/15 hover:shadow-pink-500/25 backdrop-blur-lg"
              } transition-all duration-150 p-6 group hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
              style={theme === "light" ? {
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.8) 50%, rgba(251, 207, 232, 0.6) 100%)",
                backdropFilter: "blur(15px)"
              } : {}}
            >
              <div className="space-y-4">
                <h3 className={`text-xl font-semibold ${
                  theme === "dark" 
                    ? "text-white group-hover:text-neon-pink" 
                    : "text-gray-800 group-hover:text-pink-600"
                } transition-colors`}>
                  {project.title}
                </h3>
                <p className={theme === "dark" ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className={`${
                        theme === "dark" 
                          ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/30" 
                          : "bg-pink-500/10 text-pink-600 border border-pink-500/30 hover:bg-pink-500/20"
                      } transition-colors`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-32 relative">
        <h2 className="text-4xl md:text-5xl font-michroma font-bold text-center mb-16">
          <span className={`${theme === "dark" 
            ? "bg-gradient-to-r from-neon-pink to-neon-purple" 
            : "bg-gradient-to-r from-rose-600 to-pink-600"} bg-clip-text text-transparent`}>
            Testimonials
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Testimonial 1 */}
          <Card className={`${
            theme === "dark" 
              ? "bg-gray-800/50 border-gray-700" 
              : "bg-gradient-to-br from-white/95 to-pink-50/85 border border-pink-200/70 shadow-2xl shadow-pink-500/15 backdrop-blur-xl"
          } p-8 relative overflow-hidden group hover:shadow-pink-500/25 transition-all duration-150`}
          style={theme === "light" ? {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.7) 100%)",
            backdropFilter: "blur(20px)"
          } : {}}>
            {/* Light mode card accent */}
            {theme === "light" && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400/60 to-rose-400/60"></div>
            )}
            <div className="flex items-start space-x-4">
              <Avatar className={`w-12 h-12 border-2 ${
                theme === "dark" ? "border-neon-pink" : "border-pink-500"
              }`}>
                <AvatarFallback className={`${
                  theme === "dark" ? "bg-neon-pink/20 text-neon-pink" : "bg-pink-500/20 text-pink-600"
                }`}>
                  SS
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } mb-4 italic`}>
                  "Sumit is an exceptional developer with a keen eye for clean
                  code and efficient solutions. His problem-solving abilities and
                  attention to detail make him a valuable asset to any team."
                </p>
                <div className="text-sm">
                  <p className={theme === "dark" ? "text-white font-semibold" : "text-gray-900 font-semibold"}>Sitansu Sekhar</p>
                  <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>SDET at CRED</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Testimonial 2 */}
          <Card className={`${
            theme === "dark" 
              ? "bg-gray-800/50 border-gray-700" 
              : "bg-gradient-to-br from-white/95 to-pink-50/85 border border-pink-200/70 shadow-2xl shadow-pink-500/15 backdrop-blur-xl"
          } p-8 relative overflow-hidden group hover:shadow-pink-500/25 transition-all duration-150`}
          style={theme === "light" ? {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.7) 100%)",
            backdropFilter: "blur(20px)"
          } : {}}>
            {/* Light mode card accent */}
            {theme === "light" && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400/60 to-pink-400/60"></div>
            )}
            <div className="flex items-start space-x-4">
              <Avatar className={`w-12 h-12 border-2 ${
                theme === "dark" ? "border-neon-pink" : "border-pink-500"
              }`}>
                <AvatarFallback className={`${
                  theme === "dark" ? "bg-neon-pink/20 text-neon-pink" : "bg-pink-500/20 text-pink-600"
                }`}>
                  AS
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } mb-4 italic`}>
                  "Working with Sumit has been a great experience. His technical
                  expertise, innovative thinking, and collaborative approach
                  consistently deliver outstanding results. He's truly dedicated
                  to writing quality code."
                </p>
                <div className="text-sm">
                  <p className={theme === "dark" ? "text-white font-semibold" : "text-gray-900 font-semibold"}>Abhishek Singh</p>
                  <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>SDE at Juspay</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Send Message Section */}
      <section id="contact" className="container mx-auto px-4 py-32 relative">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-michroma font-bold text-center mb-16">
            <span className={`${theme === "dark" 
              ? "bg-gradient-to-r from-neon-cyan to-neon-blue" 
              : "bg-gradient-to-r from-rose-600 to-pink-600"} bg-clip-text text-transparent`}>
              Send Message
            </span>
          </h2>

          <Card className={`${
            theme === "dark" 
              ? "bg-gray-800/50 border-gray-700" 
              : "bg-gradient-to-br from-white/95 to-pink-50/80 border border-pink-200/70 shadow-2xl shadow-pink-500/20 backdrop-blur-xl"
          } p-8 relative overflow-hidden`}
          style={theme === "light" ? {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.8) 50%, rgba(251, 207, 232, 0.6) 100%)",
            backdropFilter: "blur(25px)"
          } : {}}>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Name"
                    className={`${
                      theme === "dark" 
                        ? "bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-blue focus:ring-neon-blue/20" 
                        : "bg-pink-50/50 border-pink-300 text-gray-900 placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20"
                    }`}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className={`${
                      theme === "dark" 
                        ? "bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-blue focus:ring-neon-blue/20" 
                        : "bg-pink-50/50 border-pink-300 text-gray-900 placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20"
                    }`}
                  />
                </div>
              </div>

              <div>
                <Textarea
                  placeholder="Message"
                  rows={6}
                  className={`${
                    theme === "dark" 
                      ? "bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-blue focus:ring-neon-blue/20" 
                      : "bg-pink-50/50 border-pink-300 text-gray-900 placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20"
                  } resize-none`}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className={`w-full ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-pink" 
                    : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 shadow-lg shadow-pink-500/30"
                } text-white font-semibold transition-all duration-150 transform hover:scale-105`}
              >
                Send
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${
        theme === "dark" ? "border-t border-gray-800" : "border-t border-gray-300"
      } py-8`}>
        <div className="container mx-auto px-4 text-center">
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
            © 2025 Sumit Kumar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

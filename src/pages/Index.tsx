import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sun, Moon, Send, CheckCircle } from "lucide-react";
import emailjs from '@emailjs/browser';
import Lenis from 'lenis';

const Index = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showEducation, setShowEducation] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Contact form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const formRef = useRef<HTMLFormElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // EmailJS configuration - Secured with environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: theme === "dark" ? 1.8 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: theme === "dark" ? 0.8 : 1.0,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update scroll progress
    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      const progress = Math.min(scroll / limit, 1);
      setScrollProgress(progress);
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [theme]);

  // Enhanced scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: -80,
        duration: theme === "dark" ? 1.6 : 1.2,
        easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      });
    }
  };

  // Scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'sksumitboss123@gmail.com', // Your email (fixed the typo)
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Apply theme class to document with smooth transition
    document.documentElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    document.documentElement.classList.toggle("light-theme", theme === "light");
    document.documentElement.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    
    // Create a smooth fade transition effect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"};
      z-index: 9999;
      opacity: 0;
      backdrop-filter: blur(5px);
      transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    `;
    
    document.body.appendChild(overlay);
    
    // Trigger overlay fade in
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    // Change theme during peak opacity
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 200);
    
    // Fade out overlay and cleanup
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(overlay);
        setIsTransitioning(false);
      }, 400);
    }, 400);
  };

  return (
    <div 
      className={`min-h-screen relative overflow-x-hidden`}
      style={{
        background: theme === "dark" 
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #000000 100%)"
          : "linear-gradient(135deg, #fdf2f8 0%, #fef7f7 25%, #fff1f2 50%, #fdf2f8 75%, rgb(249, 215, 224) 100%)",
        color: theme === "dark" ? "#ffffff" : "#111827",
        transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      }}
    >
      
      {/* Scroll Progress Indicator */}
      <div 
        className={`scroll-progress ${theme === "light" ? "light-theme" : ""}`}
        style={{
          transform: `scaleX(${scrollProgress})`,
          opacity: scrollProgress > 0.01 ? 1 : 0
        }}
      ></div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Light mode floating elements */}
        {theme === "light" && (
          <>
            <div 
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20 animate-float"
              style={{
                background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
                animation: "float 8s ease-in-out infinite"
              }}
            ></div>
            <div 
              className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full opacity-15 animate-float"
              style={{
                background: "radial-gradient(circle, rgba(219, 39, 119, 0.4) 0%, transparent 70%)",
                filter: "blur(15px)",
                animation: "float 6s ease-in-out infinite reverse"
              }}
            ></div>
          </>
        )}
        
        {/* Dark mode floating elements */}
        {theme === "dark" && (
          <>
            <div 
              className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full opacity-10 animate-float"
              style={{
                background: "radial-gradient(circle, #ff00ff 0%, transparent 70%)",
                filter: "blur(30px)",
                animation: "float 10s ease-in-out infinite"
              }}
            ></div>
            <div 
              className="absolute bottom-1/4 left-1/3 w-28 h-28 rounded-full opacity-15 animate-float"
              style={{
                background: "radial-gradient(circle, #00ffff 0%, transparent 70%)",
                filter: "blur(25px)",
                animation: "float 7s ease-in-out infinite reverse"
              }}
            ></div>
          </>
        )}
      </div>
      
      {/* Theme Toggle Button with Enhanced Animation */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          disabled={isTransitioning}
          className={`rounded-full w-12 h-12 relative overflow-hidden group ${theme === "dark" 
            ? "bg-gray-800/90 border-neon-pink/60 text-neon-pink hover:bg-neon-pink/20 hover:border-neon-pink" 
            : "bg-white/95 border-pink-500/60 text-pink-600 hover:bg-pink-500/20 hover:border-pink-500 shadow-lg shadow-pink-500/25"} 
            backdrop-blur-md transition-all duration-500 hover:scale-110`}
          style={{
            transform: isTransitioning ? "scale(1.2) rotate(180deg)" : "scale(1) rotate(0deg)",
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
          aria-label="Toggle theme"
        >
          {/* Animated background ripple */}
          <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            theme === "dark" 
              ? "bg-gradient-to-br from-neon-pink/20 to-neon-purple/20" 
              : "bg-gradient-to-br from-pink-500/20 to-rose-500/20"
          }`}></div>
          
          {/* Icon container with smooth transitions */}
          <div className="relative z-10 flex items-center justify-center">
            <Sun 
              className={`absolute h-[1.4rem] w-[1.4rem] transition-all duration-500 ${
                theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
              }`} 
            />
            <Moon 
              className={`absolute h-[1.4rem] w-[1.4rem] transition-all duration-500 ${
                theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`} 
            />
          </div>
          
          {/* Pulse effect when transitioning */}
          {isTransitioning && (
            <div className={`absolute inset-0 rounded-full animate-ping ${
              theme === "dark" ? "bg-neon-pink/30" : "bg-pink-500/30"
            }`}></div>
          )}
        </Button>
      </div>

      {/* Floating Navigation Menu */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <nav className={`flex flex-col space-y-3 p-3 rounded-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
          theme === "dark" 
            ? "bg-gray-800/70 border border-neon-pink/30 hover:border-neon-pink/50 hover:shadow-lg hover:shadow-neon-pink/20" 
            : "bg-white/80 border border-pink-300/50 shadow-lg shadow-pink-500/10 hover:border-pink-400/70 hover:shadow-xl hover:shadow-pink-500/20"
        }`}>
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'about', label: 'About', icon: '👨‍💻' },
            { id: 'projects', label: 'Projects', icon: '🚀' },
            { id: 'testimonials', label: 'Reviews', icon: '💬' },
            { id: 'contact', label: 'Contact', icon: '📧' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id === 'home' ? 'hero' : item.id)}
              className={`group relative flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "hover:bg-neon-pink/20 text-gray-300 hover:text-neon-pink"
                  : "hover:bg-pink-500/20 text-gray-600 hover:text-pink-600"
              }`}
              title={item.label}
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-full ml-3 whitespace-nowrap px-2 py-1 rounded ${
                theme === "dark"
                  ? "bg-gray-800 text-white border border-neon-pink/30"
                  : "bg-white text-gray-800 border border-pink-300/50 shadow-md"
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Hero Section with smooth background transitions */}
      <section 
        id="hero"
        className={`min-h-[100vh] flex items-center container mx-auto px-4 py-20 md:py-32 relative`}
        style={{
          transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full relative z-10">
          {/* Left side - Avatar with enhanced animations */}
          <div className="flex flex-col justify-center items-center space-y-6">
            <div className="flex flex-col items-center space-y-4 lg:-translate-x-8">
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center group/avatar">
                <img
                  src="/avatar.png"
                  alt="Sumit Kumar Avatar"
                  className={`absolute inset-0 w-full h-full object-cover animate-bounce-lr border-4 transition-all duration-1000 group-hover/avatar:animate-float-enhanced ${
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
                    filter: isTransitioning ? "blur(2px)" : "blur(0px)",
                    transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: "scale(1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                
                {/* Enhanced glow effect */}
                <div
                  className={`absolute inset-0 border-4 animate-pulse transition-all duration-1000 ${
                    theme === "dark" ? "border-neon-pink/50" : "border-pink-500/60"
                  }`}
                  style={{ 
                    borderRadius: "30%",
                    opacity: isTransitioning ? 0.3 : 1
                  }}
                ></div>
                
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-1000"
                  style={{
                    boxShadow: theme === "dark"
                      ? "0 0 60px 20px #ff00ff55, 0 0 120px 40px #00ffff33"
                      : "0 0 40px 15px rgba(236, 72, 153, 0.3), 0 0 80px 25px rgba(219, 39, 119, 0.15)",
                    borderRadius: "30%",
                    opacity: isTransitioning ? 0.5 : 1
                  }}
                ></div>
              </div>
            
              <h3 
                className={`text-xl md:text-2xl lg:text-3xl font-michroma font-bold transition-all duration-1000 ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-white via-neon-pink to-neon-blue bg-clip-text text-transparent" 
                    : "bg-gradient-to-r from-gray-800 via-pink-600 to-rose-600 bg-clip-text text-transparent"
                }`}
                style={{
                  textShadow: theme === "dark" 
                    ? "0 0 20px rgba(255, 0, 255, 0.4), 0 0 40px rgba(0, 255, 255, 0.3)"
                    : "0 0 15px rgba(236, 72, 153, 0.4), 0 0 25px rgba(219, 39, 119, 0.2)",
                  filter: isTransitioning ? "blur(1px)" : "blur(0px)"
                }}
              >
                Sumit.dev
              </h3>
            </div>
          </div>

          {/* Right side - Content with smooth transitions */}
          <div 
            className="text-center lg:text-left space-y-8"
            style={{
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: isTransitioning ? "blur(1px)" : "blur(0px)"
            }}
          >
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-michroma font-bold leading-tight transition-colors duration-1000 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}>
              Hi, I'm
              <br />
              <span className={`transition-all duration-1000 ${theme === "dark" 
                ? "bg-gradient-to-r from-neon-pink to-neon-blue" 
                : "bg-gradient-to-r from-pink-600 to-rose-600"} bg-clip-text text-transparent`}>
                Sumit Kumar
              </span>
              <br />
              <span className={`text-3xl md:text-4xl lg:text-5xl transition-colors duration-1000 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                Full Stack Developer
              </span>
            </h1>

            {/* Enhanced buttons with smooth transitions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="outline"
                size="lg"
                className={`border-2 transition-all duration-500 ${theme === "dark" 
                  ? "border-neon-pink bg-transparent text-neon-pink hover:bg-neon-pink hover:text-black" 
                  : "border-pink-500 bg-transparent text-pink-600 hover:bg-pink-500 hover:text-white shadow-lg shadow-pink-500/20"} 
                  font-semibold relative overflow-hidden group hover:scale-105 hover:-translate-y-1`}
                onClick={() => {
                  scrollToSection('projects');
                }}
              >
                <span className="relative z-10">View Projects</span>
                <div className={`absolute inset-0 transition-all duration-500 ${theme === "dark" 
                  ? "bg-gradient-to-r from-neon-pink/20 to-neon-purple/20"
                  : "bg-gradient-to-r from-pink-500/20 to-rose-500/20"
                } opacity-0 group-hover:opacity-100`}></div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className={`border-2 transition-all duration-500 ${theme === "dark" 
                  ? "border-neon-blue bg-transparent text-neon-blue hover:bg-neon-blue hover:text-black" 
                  : "border-rose-500 bg-transparent text-rose-600 hover:bg-rose-500 hover:text-white shadow-lg shadow-rose-500/20"} 
                  font-semibold relative overflow-hidden group hover:scale-105 hover:-translate-y-1`}
                asChild
              >
                <a href="https://drive.google.com/file/d/1CYsUqzBHIyLuik6GyhgyH2tdAvKsMB-O/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10">Download Resume</span>
                  <div className={`absolute inset-0 transition-all duration-500 ${theme === "dark" 
                    ? "bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20"
                    : "bg-gradient-to-r from-rose-500/20 to-pink-500/20"
                  } opacity-0 group-hover:opacity-100`}></div>
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className={`border-2 transition-all duration-500 ${theme === "dark" 
                  ? "border-neon-purple bg-transparent text-neon-purple hover:bg-neon-purple hover:text-black" 
                  : "border-pink-600 bg-transparent text-pink-700 hover:bg-pink-600 hover:text-white shadow-lg shadow-pink-600/20"} 
                  font-semibold relative overflow-hidden group hover:scale-105 hover:-translate-y-1`}
                onClick={() => {
                  scrollToSection('contact');
                }}
              >
                <span className="relative z-10">Hire Me</span>
                <div className={`absolute inset-0 transition-all duration-500 ${theme === "dark" 
                  ? "bg-gradient-to-r from-neon-purple/20 to-neon-pink/20"
                  : "bg-gradient-to-r from-pink-600/20 to-rose-600/20"
                } opacity-0 group-hover:opacity-100`}></div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Me & Tech Stack Section - MOVED DOWN */}
      <section id="about" className={`container mx-auto px-4 py-32 mt-20 relative scroll-reveal ${
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
                                ? "text-neon-cyan group-hover:item:text-neon-blue" 
                                : "text-pink-600 group-hover:item:text-rose-600"
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
                                ? "text-neon-cyan group-hover:item:text-neon-blue" 
                                : "text-pink-600 group-hover:item:text-rose-600"
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
      <section id="projects" className="container mx-auto px-4 py-32 relative scroll-reveal">
        <h2 className="text-4xl md:text-5xl font-michroma font-bold text-center mb-16">
          <span className={`${theme === "dark" 
            ? "bg-gradient-to-r from-neon-cyan to-neon-blue" 
            : "bg-gradient-to-r from-pink-600 to-rose-600"} bg-clip-text text-transparent`}>
            Featured Projects
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Project 1 - CivicCircle */}
          <Card
            className={`scroll-reveal slide-left ${
              theme === "dark" 
                ? "bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-neon-cyan/30 hover:border-neon-pink/50 shadow-2xl shadow-neon-cyan/20 hover:shadow-neon-pink/30" 
                : "bg-gradient-to-br from-white/95 to-pink-50/90 border border-pink-200/60 hover:border-pink-400/70 shadow-xl shadow-pink-500/15 hover:shadow-pink-500/30 backdrop-blur-lg"
            } transition-all duration-300 p-8 group hover:scale-[1.02] hover:-translate-y-3 relative overflow-hidden`}
            style={theme === "light" ? {
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.8) 50%, rgba(251, 207, 232, 0.6) 100%)",
              backdropFilter: "blur(15px)"
            } : {}}
          >
            {/* Animated Background Elements */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              theme === "dark" 
                ? "bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-pink/5"
                : "bg-gradient-to-br from-pink-500/3 via-transparent to-rose-500/3"
            }`}></div>
            
            {/* Top gradient bar */}
            <div className={`absolute top-0 left-0 w-full h-1 ${
              theme === "dark" 
                ? "bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple" 
                : "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600"
            }`}></div>
            
            {/* Floating decorative elements */}
            {theme === "dark" && (
              <>
                <div className="absolute top-6 right-6 w-3 h-3 bg-neon-cyan/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-neon-pink/60 rounded-full animate-ping"></div>
              </>
            )}
            
            {theme === "light" && (
              <>
                <div className="absolute top-6 right-6 w-3 h-3 bg-pink-500/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-rose-500/60 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 right-4 w-1 h-8 bg-gradient-to-t from-pink-400/20 to-transparent"></div>
              </>
            )}

            <div className="relative z-10 space-y-6">
              {/* Project Header */}
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                  theme === "dark" 
                    ? "bg-neon-cyan/20 border-2 border-neon-cyan/40 group-hover:bg-neon-cyan/30" 
                    : "bg-pink-500/20 border-2 border-pink-500/40 group-hover:bg-pink-500/30"
                } transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  🫱‍🫲
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    theme === "dark" 
                      ? "text-white group-hover:text-neon-cyan" 
                      : "text-gray-800 group-hover:text-pink-600"
                  } transition-colors duration-300`}>
                    CivicCircle
                  </h3>
                  <p className={`text-sm font-medium ${
                    theme === "dark" ? "text-neon-cyan/80" : "text-pink-600/80"
                  }`}>
                    Community Platform
                  </p>
                </div>
              </div>

              {/* Project Description */}
              <p className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } text-sm leading-relaxed group-hover:text-opacity-90 transition-all duration-300`}>
                A community-driven platform that brings people together to discuss and solve local civic issues. 
                Features real-time discussions, polls, and organizing tools for local initiatives with a focus on 
                unity and collective social action.
              </p>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h4 className={`text-sm font-semibold ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}>
                  Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'].map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      className={`${
                        theme === "dark" 
                          ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/20 hover:scale-105" 
                          : "bg-pink-500/10 text-pink-600 border border-pink-500/30 hover:bg-pink-500/20 hover:scale-105"
                      } transition-all duration-200 cursor-default`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  size="sm"
                  className={`${
                    theme === "dark" 
                      ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan hover:text-black" 
                      : "bg-pink-500/20 text-pink-600 border border-pink-500/30 hover:bg-pink-500 hover:text-white"
                  } transition-all duration-200 hover:scale-105`}
                >
                  View Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    theme === "dark" 
                      ? "border-neon-pink/30 text-neon-pink hover:bg-neon-pink hover:text-black" 
                      : "border-rose-500/30 text-rose-600 hover:bg-rose-500 hover:text-white"
                  } transition-all duration-200 hover:scale-105`}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </Card>

          {/* Project 2 - SumoArts */}
          <Card
            className={`scroll-reveal slide-right ${
              theme === "dark" 
                ? "bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-neon-purple/30 hover:border-neon-cyan/50 shadow-2xl shadow-neon-purple/20 hover:shadow-neon-cyan/30" 
                : "bg-gradient-to-br from-white/95 to-rose-50/90 border border-rose-200/60 hover:border-rose-400/70 shadow-xl shadow-rose-500/15 hover:shadow-rose-500/30 backdrop-blur-lg"
            } transition-all duration-300 p-8 group hover:scale-[1.02] hover:-translate-y-3 relative overflow-hidden`}
            style={theme === "light" ? {
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 241, 242, 0.8) 50%, rgba(254, 226, 226, 0.6) 100%)",
              backdropFilter: "blur(15px)"
            } : {}}
          >
            {/* Animated Background Elements */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              theme === "dark" 
                ? "bg-gradient-to-br from-neon-purple/5 via-transparent to-neon-cyan/5"
                : "bg-gradient-to-br from-rose-500/3 via-transparent to-pink-500/3"
            }`}></div>
            
            {/* Top gradient bar */}
            <div className={`absolute top-0 left-0 w-full h-1 ${
              theme === "dark" 
                ? "bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan" 
                : "bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600"
            }`}></div>
            
            {/* Floating decorative elements */}
            {theme === "dark" && (
              <>
                <div className="absolute top-6 right-6 w-3 h-3 bg-neon-purple/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-neon-cyan/60 rounded-full animate-ping"></div>
              </>
            )}
            
            {theme === "light" && (
              <>
                <div className="absolute top-6 right-6 w-3 h-3 bg-rose-500/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-pink-500/60 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 right-4 w-1 h-8 bg-gradient-to-t from-rose-400/20 to-transparent"></div>
              </>
            )}

            <div className="relative z-10 space-y-6">
              {/* Project Header */}
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                  theme === "dark" 
                    ? "bg-neon-purple/20 border-2 border-neon-purple/40 group-hover:bg-neon-purple/30" 
                    : "bg-rose-500/20 border-2 border-rose-500/40 group-hover:bg-rose-500/30"
                } transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]`}>
                  🎨
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    theme === "dark" 
                      ? "text-white group-hover:text-neon-purple" 
                      : "text-gray-800 group-hover:text-rose-600"
                  } transition-colors duration-300`}>
                    SumoArts
                  </h3>
                  <p className={`text-sm font-medium ${
                    theme === "dark" ? "text-neon-purple/80" : "text-rose-600/80"
                  }`}>
                    Digital Art Gallery
                  </p>
                </div>
              </div>

              {/* Project Description */}
              <p className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } text-sm leading-relaxed group-hover:text-opacity-90 transition-all duration-300`}>
                An elegant online art gallery platform for digital artwork showcase with AI-powered image enhancement. 
                Features artwork uploads, search functionality, view tracking, and Unsplash integration for high-quality 
                visual experiences.
              </p>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h4 className={`text-sm font-semibold ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}>
                  Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Node.js', 'Unsplash API', 'Firebase', 'Tailwind CSS'].map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      className={`${
                        theme === "dark" 
                          ? "bg-neon-purple/10 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/20 hover:scale-105" 
                          : "bg-rose-500/10 text-rose-600 border border-rose-500/30 hover:bg-rose-500/20 hover:scale-105"
                      } transition-all duration-200 cursor-default`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  size="sm"
                  className={`${
                    theme === "dark" 
                      ? "bg-neon-purple/20 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple hover:text-black" 
                      : "bg-rose-500/20 text-rose-600 border border-rose-500/30 hover:bg-rose-500 hover:text-white"
                  } transition-all duration-200 hover:scale-105`}
                >
                  View Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    theme === "dark" 
                      ? "border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan hover:text-black" 
                      : "border-pink-500/30 text-pink-600 hover:bg-pink-500 hover:text-white"
                  } transition-all duration-200 hover:scale-105`}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </Card>

          {/* Project 3 - RentCircle */}
          <Card
            className={`scroll-reveal slide-left ${
              theme === "dark" 
                ? "bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-neon-blue/30 hover:border-neon-purple/50 shadow-2xl shadow-neon-blue/20 hover:shadow-neon-purple/30" 
                : "bg-gradient-to-br from-white/95 to-blue-50/90 border border-blue-200/60 hover:border-blue-400/70 shadow-xl shadow-blue-500/15 hover:shadow-blue-500/30 backdrop-blur-lg"
            } transition-all duration-300 p-8 group hover:scale-[1.02] hover:-translate-y-3 relative overflow-hidden`}
            style={theme === "light" ? {
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(239, 246, 255, 0.8) 50%, rgba(219, 234, 254, 0.6) 100%)",
              backdropFilter: "blur(15px)"
            } : {}}
          >
            {/* Animated Background Elements */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              theme === "dark" 
                ? "bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5"
                : "bg-gradient-to-br from-blue-500/3 via-transparent to-purple-500/3"
            }`}></div>
            
            {/* Top gradient bar */}
            <div className={`absolute top-0 left-0 w-full h-1 ${
              theme === "dark" 
                ? "bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple" 
                : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
            }`}></div>
            
            {/* Floating decorative elements */}
            {theme === "dark" && (
              <>
                <div className="absolute top-6 right-6 w-3 h-3 bg-neon-blue/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-neon-purple/60 rounded-full animate-ping"></div>
              </>
            )}
            
            {theme === "light" && (
              <>
                <div className="absolute top-6 right-6 w-3 h-3 bg-blue-500/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-purple-500/60 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 right-4 w-1 h-8 bg-gradient-to-t from-blue-400/20 to-transparent"></div>
              </>
            )}

            <div className="relative z-10 space-y-6">
              {/* Project Header */}
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                  theme === "dark" 
                    ? "bg-neon-blue/20 border-2 border-neon-blue/40 group-hover:bg-neon-blue/30" 
                    : "bg-blue-500/20 border-2 border-blue-500/40 group-hover:bg-blue-500/30"
                } transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  🔄
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    theme === "dark" 
                      ? "text-white group-hover:text-neon-blue" 
                      : "text-gray-800 group-hover:text-blue-600"
                  } transition-colors duration-300`}>
                    RentCircle
                  </h3>
                  <p className={`text-sm font-medium ${
                    theme === "dark" ? "text-neon-blue/80" : "text-blue-600/80"
                  }`}>
                    P2P Rental Platform
                  </p>
                </div>
              </div>

              {/* Project Description */}
              <p className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } text-sm leading-relaxed group-hover:text-opacity-90 transition-all duration-300`}>
                A comprehensive peer-to-peer rental platform enabling users to rent and lend items within their community. 
                Features real-time chat, rental agreements, admin dashboard, and payment integration for a sustainable 
                sharing economy.
              </p>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h4 className={`text-sm font-semibold ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}>
                  Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'Socket.io'].map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      className={`${
                        theme === "dark" 
                          ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/20 hover:scale-105" 
                          : "bg-blue-500/10 text-blue-600 border border-blue-500/30 hover:bg-blue-500/20 hover:scale-105"
                      } transition-all duration-200 cursor-default`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  size="sm"
                  className={`${
                    theme === "dark" 
                      ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue hover:text-black" 
                      : "bg-blue-500/20 text-blue-600 border border-blue-500/30 hover:bg-blue-500 hover:text-white"
                  } transition-all duration-200 hover:scale-105`}
                >
                  View Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    theme === "dark" 
                      ? "border-neon-purple/30 text-neon-purple hover:bg-neon-purple hover:text-black" 
                      : "border-purple-500/30 text-purple-600 hover:bg-purple-500 hover:text-white"
                  } transition-all duration-200 hover:scale-105`}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </Card>

          {/* Project 4 - TalkTactics */}
          <Card
            className={`scroll-reveal slide-right ${
              theme === "dark" 
                ? "bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-neon-pink/30 hover:border-neon-blue/50 shadow-2xl shadow-neon-pink/20 hover:shadow-neon-blue/30" 
                : "bg-gradient-to-br from-white/95 to-green-50/90 border border-green-200/60 hover:border-green-400/70 shadow-xl shadow-green-500/15 hover:shadow-green-500/30 backdrop-blur-lg"
            } transition-all duration-300 p-8 group hover:scale-[1.02] hover:-translate-y-3 relative overflow-hidden`}
            style={theme === "light" ? {
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.8) 50%, rgba(220, 252, 231, 0.6) 100%)",
              backdropFilter: "blur(15px)"
            } : {}}
          >
            {/* Animated Background Elements */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              theme === "dark" 
                ? "bg-gradient-to-br from-neon-pink/5 via-transparent to-neon-blue/5"
                : "bg-gradient-to-br from-green-500/3 via-transparent to-emerald-500/3"
            }`}></div>
            
            {/* Top gradient bar */}
            <div className={`absolute top-0 left-0 w-full h-1 ${
              theme === "dark" 
                ? "bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue" 
                : "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600"
            }`}></div>
            
            {/* Floating decorative elements */}
            {theme === "dark" && (
              <>
                <div className="absolute top-6 right-6 w-3 h-3 bg-neon-pink/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-neon-blue/60 rounded-full animate-ping"></div>
              </>
            )}
            
            {theme === "light" && (
              <>
                <div className="absolute top-6 right-6 w-3 h-3 bg-green-500/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-emerald-500/60 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 right-4 w-1 h-8 bg-gradient-to-t from-green-400/20 to-transparent"></div>
              </>
            )}

            <div className="relative z-10 space-y-6">
              {/* Project Header */}
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                  theme === "dark" 
                    ? "bg-neon-pink/20 border-2 border-neon-pink/40 group-hover:bg-neon-pink/30" 
                    : "bg-green-500/20 border-2 border-green-500/40 group-hover:bg-green-500/30"
                } transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]`}>
                  🗣️
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    theme === "dark" 
                      ? "text-white group-hover:text-neon-pink" 
                      : "text-gray-800 group-hover:text-green-600"
                  } transition-colors duration-300`}>
                    TalkTactics
                  </h3>
                  <p className={`text-sm font-medium ${
                    theme === "dark" ? "text-neon-pink/80" : "text-green-600/80"
                  }`}>
                    Interactive Gaming Platform
                  </p>
                </div>
              </div>

              {/* Project Description */}
              <p className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } text-sm leading-relaxed group-hover:text-opacity-90 transition-all duration-300`}>
                A multiplayer platform featuring strategic communication games like Chain Story, Truth or Tactical Dare, 
                and Online Debates. Includes player profiles, real-time interactions, and a collaborative doubt-solving arena 
                for enhanced learning.
              </p>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h4 className={`text-sm font-semibold ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}>
                  Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Node.js', 'Express', 'MongoDB', 'WebSockets', 'Firebase Auth'].map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      className={`${
                        theme === "dark" 
                          ? "bg-neon-pink/10 text-neon-pink border border-neon-pink/30 hover:bg-neon-pink/20 hover:scale-105" 
                          : "bg-green-500/10 text-green-600 border border-green-500/30 hover:bg-green-500/20 hover:scale-105"
                      } transition-all duration-200 cursor-default`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  size="sm"
                  className={`${
                    theme === "dark" 
                      ? "bg-neon-pink/20 text-neon-pink border border-neon-pink/30 hover:bg-neon-pink hover:text-black" 
                      : "bg-green-500/20 text-green-600 border border-green-500/30 hover:bg-green-500 hover:text-white"
                  } transition-all duration-200 hover:scale-105`}
                >
                  View Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    theme === "dark" 
                      ? "border-neon-blue/30 text-neon-blue hover:bg-neon-blue hover:text-black" 
                      : "border-emerald-500/30 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                  } transition-all duration-200 hover:scale-105`}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className={`${
              theme === "dark" 
                ? "bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-white" 
                : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-pink-500/30"
            } font-semibold px-8 py-3 transition-all duration-300 hover:scale-105 hover:-translate-y-1`}
          >
            View All Projects →
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-32 relative scroll-reveal">
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

      {/* Send Message Section - Updated */}
      <section id="contact" className="container mx-auto px-4 py-32 relative scroll-reveal">
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
            
            {/* Success Message */}
            {isSubmitted && (
              <div className={`mb-6 p-4 rounded-lg border ${
                theme === "dark" 
                  ? "bg-green-900/20 border-green-500/50 text-green-400"
                  : "bg-green-50 border-green-300 text-green-700"
              } flex items-center space-x-3 animate-in slide-in-from-top-4 duration-300`}>
                <CheckCircle className="w-5 h-5" />
                <p className="font-medium">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    disabled={isSubmitting}
                    className={`${
                      theme === "dark" 
                        ? "bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-blue focus:ring-neon-blue/20" 
                        : "bg-pink-50/50 border-pink-300 text-gray-900 placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20"
                    } disabled:opacity-50`}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    disabled={isSubmitting}
                    className={`${
                      theme === "dark" 
                        ? "bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-blue focus:ring-neon-blue/20" 
                        : "bg-pink-50/50 border-pink-300 text-gray-900 placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20"
                    } disabled:opacity-50`}
                  />
                </div>
              </div>

              <div>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={6}
                  required
                  disabled={isSubmitting}
                  className={`${
                    theme === "dark" 
                      ? "bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-neon-blue focus:ring-neon-blue/20" 
                      : "bg-pink-50/50 border-pink-300 text-gray-900 placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20"
                  } resize-none disabled:opacity-50`}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || isSubmitted}
                className={`w-full ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-pink" 
                    : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 shadow-lg shadow-pink-500/30"
                } text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </div>
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

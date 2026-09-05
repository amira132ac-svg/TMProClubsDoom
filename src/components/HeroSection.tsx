import React, { useState, useEffect } from 'react';
import { Shield, ChevronDown, Swords, Send, Trophy, Users } from 'lucide-react';
import { TELEGRAM_CHANNEL_URL, TELEGRAM_CHANNEL_HANDLE } from '../data/tournamentData';

interface HeroSectionProps {
  onViewStandings: () => void;
  onViewMatches: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewStandings,
  onViewMatches,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#030504]"
    >
      {/* 1. Base Layer: Dark Abandoned Industrial Stadium Interior Architecture */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Stadium Floodlights & Concrete Girders (SVG vector art) */}
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Industrial Ceiling Truss & Beams */}
          <path d="M 0 0 L 720 180 L 1440 0" stroke="#1e293b" strokeWidth="6" />
          <path d="M 200 0 L 720 180 L 1240 0" stroke="#0f172a" strokeWidth="4" />
          <path d="M 0 100 L 720 240 L 1440 100" stroke="#111827" strokeWidth="3" />
          
          {/* Vertical Stadium Concrete Pillars */}
          <line x1="120" y1="0" x2="120" y2="900" stroke="#0a0f0c" strokeWidth="40" />
          <line x1="300" y1="0" x2="260" y2="900" stroke="#08140e" strokeWidth="20" />
          <line x1="1320" y1="0" x2="1320" y2="900" stroke="#0a0f0c" strokeWidth="40" />
          <line x1="1140" y1="0" x2="1180" y2="900" stroke="#08140e" strokeWidth="20" />
          
          {/* Stadium Tier Seating Silhouette */}
          <path d="M 0 750 L 300 680 L 720 710 L 1140 680 L 1440 750 L 1440 900 L 0 900 Z" fill="#040806" />

          {/* Volumetric Floodlight Beams cutting through mist */}
          <polygon points="120,40 500,600 700,600 160,40" fill="url(#stadiumLightBeamLeft)" opacity="0.4" />
          <polygon points="1320,40 940,600 740,600 1280,40" fill="url(#stadiumLightBeamRight)" opacity="0.4" />

          <defs>
            <linearGradient id="stadiumLightBeamLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ff66" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#042f1f" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#030504" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="stadiumLightBeamRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00ff66" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#042f1f" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#030504" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Diagonal Scratches & Grunge Overlay */}
        <div className="absolute inset-0 bg-doomsday-scratches pointer-events-none opacity-45" />

        {/* Deep Industrial Grid lines */}
        <div className="absolute inset-0 bg-industrial-grid pointer-events-none opacity-25" />

        {/* Apocalyptic Toxic Green Fog & Radial Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-radial-doom opacity-75 blur-3xl" />
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-[#00ff66]/10 rounded-full blur-[120px] pointer-events-none animate-fog-slow" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#00ff66]/08 rounded-full blur-[140px] pointer-events-none animate-fog-slow" />
      </div>

      {/* 2. Hero Content Stack */}
      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Large Metallic Cracked Football with Subtle Green Illumination as explicitly required:
            "Large football in the center/top area.
             The football should look dark metallic / cracked with subtle green illumination."
        */}
        <div
          className="relative mb-6 sm:mb-8 transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`,
          }}
        >
          {/* Subtle Green Backlight Aura */}
          <div className="absolute inset-0 -inset-x-8 bg-[#00ff66]/20 rounded-full blur-2xl -z-10 animate-pulse-glow" />

          {/* Cracked Dark Metallic Football SVG */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 relative flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] drop-shadow-[0_0_20px_rgba(0,255,102,0.35)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Metallic Dark Sphere Gradient */}
                <radialGradient id="metallicSphere" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="25%" stopColor="#1e293b" />
                  <stop offset="65%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020604" />
                </radialGradient>

                {/* Toxic Green Fissure Glow */}
                <filter id="neonGlowFissure" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Sphere Base */}
              <circle cx="100" cy="100" r="88" fill="url(#metallicSphere)" stroke="#1e293b" strokeWidth="2" />

              {/* Dark Pentagon Plates (Soccer Ball Geometry) */}
              <polygon points="100,55 125,72 116,102 84,102 75,72" fill="#090d0b" stroke="#334155" strokeWidth="1.5" />
              <polygon points="100,20 115,38 95,50 85,38" fill="#131b17" stroke="#334155" strokeWidth="1" opacity="0.8" />
              <polygon points="145,60 168,75 160,98 135,92 128,72" fill="#131b17" stroke="#334155" strokeWidth="1" opacity="0.8" />
              <polygon points="55,60 72,72 65,92 40,98 32,75" fill="#131b17" stroke="#334155" strokeWidth="1" opacity="0.8" />
              <polygon points="120,135 140,118 162,130 152,152 128,150" fill="#131b17" stroke="#334155" strokeWidth="1" opacity="0.8" />
              <polygon points="80,135 72,150 48,152 38,130 60,118" fill="#131b17" stroke="#334155" strokeWidth="1" opacity="0.8" />
              <polygon points="100,105 118,122 108,145 92,145 82,122" fill="#090d0b" stroke="#334155" strokeWidth="1.5" />

              {/* Connecting Seam Grooves */}
              <path d="M 100 55 L 95 20 M 125 72 L 155 60 M 116 102 L 138 118 M 84 102 L 62 118 M 75 72 L 45 60" stroke="#1e293b" strokeWidth="2" />

              {/* Glowing Toxic Green Cracks & Fissures Seeping From Core */}
              <g filter="url(#neonGlowFissure)">
                {/* Crack 1: Main central jagged rupture */}
                <path
                  d="M 68 45 L 82 62 L 78 80 L 98 88 L 105 110 L 96 130 L 112 155 L 125 178"
                  stroke="#00ff66"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* Secondary branching fissures */}
                <path
                  d="M 82 62 L 95 68 L 105 58 M 78 80 L 60 88 L 48 82 M 98 88 L 118 84 L 135 90 M 105 110 L 122 118 L 140 114 M 96 130 L 80 138"
                  stroke="#00ff66"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.85"
                />
                {/* Internal green core glow dots */}
                <circle cx="98" cy="88" r="3" fill="#ffffff" />
                <circle cx="105" cy="110" r="2.5" fill="#ffffff" />
                <circle cx="82" cy="62" r="2" fill="#ffffff" />
              </g>

              {/* Surface Scratch Marks */}
              <path d="M 40 40 L 70 30 M 130 35 L 155 25 M 30 110 L 50 120 M 150 140 L 175 130" stroke="#94a3b8" strokeWidth="0.8" opacity="0.4" />
              <path d="M 50 145 L 75 160 M 120 160 L 145 172" stroke="#94a3b8" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Small badge: DOOMSDAY as explicitly required:
            "Add a small badge:
             DOOMSDAY"
        */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#05130b] border border-[#00ff66]/50 text-[#00ff66] text-xs sm:text-sm font-tech font-bold tracking-[0.3em] uppercase mb-4 shadow-[0_0_15px_rgba(0,255,102,0.2)]">
          <Shield className="w-3.5 h-3.5 text-[#00ff66]" />
          <span>DOOMSDAY</span>
          <span className="w-1.5 h-1.5 bg-[#00ff66] rounded-full animate-ping" />
        </div>

        {/* Main title: FINAL CROWN as explicitly required:
            "Make 'FINAL CROWN' extremely large, metallic silver, sharp-edged esports typography with a subtle green outer glow."
        */}
        <h1 className="font-esports font-black text-6xl sm:text-8xl md:text-9xl tracking-tight uppercase leading-[0.85] text-metallic-title mb-3 select-none">
          FINAL CROWN
        </h1>

        {/* Under it: TM PROCLUBS as explicitly required:
            "Under it:
             TM PROCLUBS
             Use spaced-out uppercase lettering."
        */}
        <div className="font-tech font-extrabold text-lg sm:text-2xl md:text-3xl text-slate-200 tracking-[0.4em] uppercase mb-6 flex items-center justify-center gap-3">
          <span className="h-[1px] w-8 sm:w-16 bg-[#00ff66]/60" />
          <span>TM PROCLUBS</span>
          <span className="h-[1px] w-8 sm:w-16 bg-[#00ff66]/60" />
        </div>

        {/* Sub-headline / Tournament Narrative */}
        <p className="font-condensed text-base sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-snug tracking-wide">
          The Premier 11v11 Apocalyptic Esports Arena. 16 Elite Squads. One Final Crown.
          <span className="block mt-1 text-[#00ff66] font-bold tracking-widest text-sm sm:text-base font-tech">
            ELITE 11v11 EA FC PRO CLUBS • LEAGUE 1 & LEAGUE 2
          </span>
        </p>

        {/* Add CTA buttons: VIEW TEAMS & VIEW MATCHES as explicitly required:
            "Add CTA buttons:
             VIEW TEAMS
             VIEW MATCHES
             Buttons should be dark metallic with thin neon-green borders."
        */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto mb-12">
          <button
            type="button"
            onClick={onViewStandings}
            className="w-full sm:w-auto flex-1 btn-metallic flex items-center justify-center gap-3 px-8 py-4 font-condensed font-bold text-lg text-white tracking-[0.2em] uppercase rounded-sm cursor-pointer group"
          >
            <Trophy className="w-5 h-5 text-[#00ff66] transition-transform group-hover:scale-110" />
            <span>VIEW STANDINGS</span>
          </button>

          <button
            type="button"
            onClick={onViewMatches}
            className="w-full sm:w-auto flex-1 btn-metallic flex items-center justify-center gap-3 px-8 py-4 font-condensed font-bold text-lg text-white tracking-[0.2em] uppercase rounded-sm cursor-pointer group"
          >
            <Swords className="w-5 h-5 text-[#00ff66] transition-transform group-hover:rotate-12" />
            <span>VIEW MATCHES</span>
          </button>
        </div>

        {/* Pre-Season Official Telegram Announcement Card (No fake timers or held matches) */}
        <div className="glass-panel p-4 sm:p-5 rounded-sm border border-[#00ff66]/30 max-w-xl w-full shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 text-xs font-tech text-slate-400">
            <span className="flex items-center gap-2 text-[#00ff66] font-bold">
              <Shield className="w-3.5 h-3.5" />
              OFFICIAL FIXTURES & DRAW CHANNEL
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 font-bold">
              PRE-SEASON
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mb-4">
            <div className="bg-[#050b08] p-2.5 rounded-sm border border-white/5">
              <span className="font-esports font-black text-2xl text-white block leading-none text-[#00ff66]">
                16
              </span>
              <span className="text-[10px] font-tech font-bold text-slate-400 tracking-wider uppercase">
                CLUBS
              </span>
            </div>
            <div className="bg-[#050b08] p-2.5 rounded-sm border border-white/5">
              <span className="font-esports font-black text-2xl text-white block leading-none text-white">
                2
              </span>
              <span className="text-[10px] font-tech font-bold text-slate-400 tracking-wider uppercase">
                LEAGUES
              </span>
            </div>
            <div className="bg-[#050b08] p-2.5 rounded-sm border border-white/5">
              <span className="font-esports font-black text-2xl text-white block leading-none text-slate-300">
                0
              </span>
              <span className="text-[10px] font-tech font-bold text-slate-400 tracking-wider uppercase">
                MATCHES
              </span>
            </div>
            <div className="bg-[#050b08] p-2.5 rounded-sm border border-white/5">
              <span className="font-esports font-black text-2xl text-white block leading-none text-[#00ff66]">
                11v11
              </span>
              <span className="text-[10px] font-tech font-bold text-slate-400 tracking-wider uppercase">
                FORMAT
              </span>
            </div>
          </div>

          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-sm bg-[#061e12] border border-[#00ff66]/50 hover:border-[#00ff66] hover:bg-[#082a1a] text-[#00ff66] font-tech text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-[0_0_12px_rgba(0,255,102,0.15)] group"
          >
            <Send className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>JOIN {TELEGRAM_CHANNEL_HANDLE} FOR MATCH SCHEDULES</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 flex flex-col items-center gap-1 text-slate-500 hover:text-[#00ff66] transition-colors cursor-pointer" onClick={onViewStandings}>
          <span className="text-[10px] font-tech tracking-[0.3em] uppercase">VIEW STANDINGS</span>
          <ChevronDown className="w-4 h-4 text-[#00ff66] animate-bounce" />
        </div>

      </div>
    </section>
  );
};

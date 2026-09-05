import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Trophy, Send } from 'lucide-react';
import { TELEGRAM_CHANNEL_URL, TELEGRAM_CHANNEL_HANDLE } from '../data/tournamentData';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  liveMatchCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  liveMatchCount = 1,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'standings', label: 'STANDINGS' },
    { id: 'matches', label: 'MATCHES' },
    { id: 'stats', label: 'STATS' },
    { id: 'teams', label: 'TEAMS' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030504]/90 backdrop-blur-xl py-3 shadow-2xl shadow-black/80'
          : 'bg-[#030504]/60 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Navigation Menu (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                className={`relative py-1 font-condensed font-bold text-sm lg:text-base tracking-[0.18em] transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-[#00ff66]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#00ff66] shadow-[0_0_8px_#00ff66]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Center: TM PROCLUBS logo / wordmark */}
        <div
          onClick={() => handleItemClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group px-4 py-1"
        >
          {/* Stylized sharp TM icon */}
          <div className="w-8 h-8 rounded-sm bg-[#07150e] border border-[#00ff66]/50 flex items-center justify-center relative group-hover:border-[#00ff66] transition-all duration-300">
            <span className="font-esports font-black text-lg text-white group-hover:text-[#00ff66] leading-none">
              TM
            </span>
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#00ff66] rounded-full" />
          </div>

          <div className="flex flex-col items-start leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-esports font-black text-xl sm:text-2xl tracking-[0.15em] text-white uppercase">
                TM
              </span>
              <span className="font-esports font-black text-xl sm:text-2xl tracking-[0.15em] text-[#00ff66] uppercase">
                PROCLUBS
              </span>
            </div>
            <span className="text-[9px] font-tech tracking-[0.3em] text-slate-400 uppercase -mt-0.5">
              DOOMSDAY • FINAL CROWN
            </span>
          </div>
        </div>

        {/* Right side: DOOMSDAY badge & Official Telegram link */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 justify-end">
          {/* DOOMSDAY Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#05110a] border border-[#00ff66]/40 text-[#00ff66] text-xs font-tech font-bold tracking-widest uppercase">
            <Shield className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>DOOMSDAY</span>
          </div>

          {/* Official Telegram Channel Link */}
          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-sm bg-[#061e12] border border-[#00ff66]/50 text-white text-xs font-tech font-bold tracking-wider hover:border-[#00ff66] hover:bg-[#092b1a] transition-all cursor-pointer group shadow-[0_0_12px_rgba(0,255,102,0.2)]"
            title="Official Telegram Channel"
          >
            <Send className="w-3.5 h-3.5 text-[#00ff66] group-hover:scale-110 transition-transform" />
            <span className="text-white group-hover:text-[#00ff66] transition-colors hidden xs:inline">
              TELEGRAM
            </span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#00ff66] text-black font-black">
              JOIN
            </span>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded border border-white/10 hover:border-[#00ff66]/40 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Subtle neon-green line underneath the header as explicitly required:
          "Add a subtle neon-green line underneath the header."
      */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00ff66]/40 to-transparent shadow-[0_0_8px_rgba(0,255,102,0.3)] mt-2 sm:mt-3" />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050907]/95 border-b border-[#00ff66]/30 px-6 py-6 space-y-4 backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-tech text-[#00ff66] tracking-widest uppercase">
              TOURNAMENT NAVIGATION
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <Trophy className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>FINAL CROWN</span>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                className={`text-left font-condensed font-bold text-lg tracking-[0.2em] py-1.5 transition-colors ${
                  activeSection === item.id ? 'text-[#00ff66]' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-tech text-slate-400">STATUS: PRE-SEASON (0 PTS)</span>
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-tech text-[#00ff66] font-bold flex items-center gap-1 hover:underline"
            >
              <Send className="w-3 h-3" />
              {TELEGRAM_CHANNEL_HANDLE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

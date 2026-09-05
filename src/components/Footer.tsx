import React from 'react';
import { Shield, ArrowUp, Send } from 'lucide-react';
import { TELEGRAM_CHANNEL_URL, TELEGRAM_CHANNEL_HANDLE } from '../data/tournamentData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#020403] pt-16 pb-12 text-slate-400 text-sm relative overflow-hidden">
      {/* Subtle bottom green glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#00ff66]/05 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#06170e] border border-[#00ff66]/60 flex items-center justify-center font-esports font-black text-xl text-white">
                TM
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 font-esports font-black text-2xl text-white tracking-widest leading-none">
                  <span>TM</span>
                  <span className="text-[#00ff66]">PROCLUBS</span>
                </div>
                <span className="text-[10px] font-tech text-slate-500 tracking-[0.25em] uppercase">
                  DOOMSDAY • FINAL CROWN
                </span>
              </div>
            </div>

            <p className="font-condensed text-slate-400 text-base max-w-md leading-relaxed">
              The premier competitive 11v11 EA FC Pro Clubs tournament network in the Middle East. High-stakes competition, certified anti-cheat standards, and dedicated low-latency servers.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-tech text-slate-500">FORMAT:</span>
              <span className="text-xs font-tech text-[#00ff66] font-bold px-2 py-0.5 rounded bg-[#00ff66]/10 border border-[#00ff66]/30">
                11v11 EA FC COMPETITIVE
              </span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h4 className="font-tech font-bold text-xs text-[#00ff66] tracking-[0.25em] uppercase mb-4">
              TOURNAMENT SECTIONS
            </h4>
            <ul className="space-y-2.5 font-condensed text-base">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home / Arena
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('teams')}
                  className="hover:text-[#00ff66] transition-colors cursor-pointer"
                >
                  League 1 & League 2 Squads
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('matches')}
                  className="hover:text-[#00ff66] transition-colors cursor-pointer"
                >
                  Doomsday Match Center
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('standings')}
                  className="hover:text-[#00ff66] transition-colors cursor-pointer"
                >
                  League Table Standings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('stats')}
                  className="hover:text-[#00ff66] transition-colors cursor-pointer"
                >
                  Player Stats (Goals & Assists)
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support & Liaison */}
          <div>
            <h4 className="font-tech font-bold text-xs text-[#00ff66] tracking-[0.25em] uppercase mb-4">
              OFFICIAL CHANNEL
            </h4>
            <p className="font-condensed text-xs text-slate-400 mb-4 leading-relaxed">
              For official fixtures draw, live broadcast alerts, rules, and bracket announcements:
            </p>
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#07190f] border border-[#00ff66]/40 hover:border-[#00ff66] text-[#00ff66] text-xs font-tech font-bold transition-all shadow-[0_0_15px_rgba(0,255,102,0.15)] group"
            >
              <Send className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>{TELEGRAM_CHANNEL_HANDLE} on Telegram</span>
            </a>

            <div className="mt-5">
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-2 text-xs font-tech text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#00ff66]" />
                <span>RETURN TO APEX</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00ff66]" />
            <span>TM PROCLUBS — DOOMSDAY: FINAL CROWN • 2026 OFFICIAL COMPETITION</span>
          </div>

          <div className="text-slate-400">
            ALL TRADEMARKS & LOGOS BELONG TO RESPECTIVE PRO CLUBS SQUADS
          </div>
        </div>
      </div>
    </footer>
  );
};

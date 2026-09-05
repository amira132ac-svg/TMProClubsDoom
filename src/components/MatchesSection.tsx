import React from 'react';
import { Swords, Send, Shield, Trophy, Users, Bell, ArrowRight } from 'lucide-react';
import { TOURNAMENT_MATCHES, TELEGRAM_CHANNEL_URL, TELEGRAM_CHANNEL_HANDLE, GROUP_A_TEAMS, GROUP_B_TEAMS } from '../data/tournamentData';

interface MatchesSectionProps {
  onSelectTeamByName?: (name: string) => void;
}

export const MatchesSection: React.FC<MatchesSectionProps> = ({ onSelectTeamByName }) => {
  return (
    <section id="matches" className="py-20 sm:py-24 relative overflow-hidden bg-[#030504]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#00ff66]/05 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-doomsday-scratches opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#05140b] border border-[#00ff66]/40 text-[#00ff66] text-xs font-tech font-bold tracking-[0.25em] uppercase mb-3">
              <Swords className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>OFFICIAL FIXTURES & RESULTS</span>
            </div>
            <h2 className="font-esports font-black text-4xl sm:text-6xl uppercase text-metallic-title tracking-tight leading-none">
              DOOMSDAY MATCH CENTER
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-sm bg-[#07190f] border border-[#00ff66]/30 text-[#00ff66] font-tech text-xs font-bold tracking-widest uppercase">
              STATUS: PRE-TOURNAMENT
            </span>
          </div>
        </div>

        {/* Pre-Tournament State: No matches held yet & no dates set */}
        <div className="panel-doomsday panel-corner-accents rounded-sm p-8 sm:p-12 relative overflow-hidden border border-[#00ff66]/30 text-center max-w-4xl mx-auto shadow-2xl">
          {/* Decorative Corner Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00ff66]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#00ff66]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Icon Header */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-sm bg-[#06170e] border border-[#00ff66]/50 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(0,255,102,0.2)]">
            <Swords className="w-8 h-8 sm:w-10 sm:h-10 text-[#00ff66]" />
          </div>

          <span className="inline-block text-xs font-tech font-bold tracking-[0.3em] text-[#00ff66] uppercase mb-2">
            ROUND 1 FIXTURES PENDING ANNOUNCEMENT
          </span>

          <h3 className="font-esports font-black text-2xl sm:text-4xl text-white tracking-wider uppercase mb-4 text-metallic-silver">
            NO MATCHES HELD YET
          </h3>

          <p className="font-condensed text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            The tournament has not commenced yet. All 16 clubs have finalized their 11v11 rosters and stand at 0 points. Match pairings, kickoff dates, and official live streaming links will be released exclusively on our official Telegram channel.
          </p>

          {/* Key Tournament Structure Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8 text-left">
            <div className="bg-[#050e08] p-3 rounded-sm border border-white/5">
              <span className="text-[10px] font-tech text-slate-400 uppercase block">FORMAT</span>
              <span className="font-condensed font-bold text-sm sm:text-base text-white">EA FC 11v11</span>
            </div>
            <div className="bg-[#050e08] p-3 rounded-sm border border-white/5">
              <span className="text-[10px] font-tech text-slate-400 uppercase block">REGISTERED</span>
              <span className="font-condensed font-bold text-sm sm:text-base text-[#00ff66]">16 SQUADS</span>
            </div>
            <div className="bg-[#050e08] p-3 rounded-sm border border-white/5">
              <span className="text-[10px] font-tech text-slate-400 uppercase block">LEAGUES</span>
              <span className="font-condensed font-bold text-sm sm:text-base text-white">LEAGUE 1 & 2</span>
            </div>
            <div className="bg-[#050e08] p-3 rounded-sm border border-white/5">
              <span className="text-[10px] font-tech text-slate-400 uppercase block">STATUS</span>
              <span className="font-condensed font-bold text-sm sm:text-base text-[#00ff66]">PRE-SEASON</span>
            </div>
          </div>

          {/* Official Channel Telegram CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-[#082214] border border-[#00ff66] text-[#00ff66] hover:bg-[#00ff66] hover:text-black font-condensed font-bold text-base sm:text-lg tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,255,102,0.25)] group cursor-pointer"
            >
              <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>JOIN OFFICIAL CHANNEL: {TELEGRAM_CHANNEL_HANDLE}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <p className="text-xs font-tech text-slate-500 mt-4 tracking-wider">
            Match results, scoreboards, and official replay VODs will update live here as matches conclude.
          </p>
        </div>

      </div>
    </section>
  );
};

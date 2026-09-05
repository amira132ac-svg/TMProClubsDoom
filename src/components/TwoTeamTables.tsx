import React, { useState } from 'react';
import { GROUP_A_TEAMS, GROUP_B_TEAMS } from '../data/tournamentData';
import { TournamentTeam } from '../types';
import { TmBrushLogo } from './TmBrushLogo';
import { Shield, Sparkles, ChevronRight, Activity } from 'lucide-react';

interface TwoTeamTablesProps {
  onSelectTeam: (team: TournamentTeam) => void;
}

export const TwoTeamTables: React.FC<TwoTeamTablesProps> = ({ onSelectTeam }) => {
  const [hoveredTeamId, setHoveredTeamId] = useState<string | null>(null);

  return (
    <section id="teams" className="py-20 sm:py-24 relative overflow-hidden bg-[#030504]">
      {/* Background Ambience & Scratches */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-radial-doom opacity-40 blur-3xl" />
        <div className="absolute inset-0 bg-doomsday-scratches opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header as explicitly required:
            "Create a large central section titled:
             DOOMSDAY — FINAL CROWN"
        */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#05140b] border border-[#00ff66]/40 text-[#00ff66] text-xs font-tech font-bold tracking-[0.25em] uppercase mb-3 shadow-[0_0_15px_rgba(0,255,102,0.15)]">
            <Shield className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>OFFICIAL TOURNAMENT ROSTER BOARD</span>
          </div>

          <h2 className="font-esports font-black text-4xl sm:text-6xl md:text-7xl uppercase text-metallic-title tracking-tight leading-none mb-3">
            DOOMSDAY — FINAL CROWN
          </h2>

          <p className="font-condensed text-slate-300 text-base sm:text-lg tracking-wider">
            16 Contenders divided across League 1 & League 2. Click any squad to inspect verified 11v11 player rosters, stats and match history.
          </p>
        </div>

        {/* Mobile-Only TM Logo Container (Top of teams list as specified in Responsive requirements:
            "Order on mobile:
             TM LOGO
             LEFT TEAM LIST
             RIGHT TEAM LIST
             MATCH CENTER
             STANDINGS")
        */}
        <div className="lg:hidden flex flex-col items-center justify-center mb-10">
          <TmBrushLogo size="md" />
        </div>

        {/* Desktop Layout:
            LEFT TABLE | CENTER LOGO | RIGHT TABLE
            With equal width panels and non-overlapping center logo
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-8 xl:gap-10">
          
          {/* ======================================================== */}
          {/* LEFT PANEL: LEAGUE 1 / لیگ یک                            */}
          {/* ======================================================== */}
          <div className="w-full">
            <div className="panel-doomsday panel-corner-accents rounded-sm p-5 sm:p-7 relative overflow-hidden">
              
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="diamond-marker" />
                  <h3 className="font-esports font-black text-2xl sm:text-3xl tracking-widest text-white uppercase">
                    LEAGUE 1 • لیگ یک
                  </h3>
                </div>
                <span className="text-[11px] font-tech text-[#00ff66] tracking-widest uppercase px-2.5 py-1 rounded-sm bg-[#07190f] border border-[#00ff66]/30 font-bold">
                  8 SQUADS
                </span>
              </div>

              {/* Roster Rows for Group A */}
              <div className="space-y-1.5">
                {GROUP_A_TEAMS.map((team, index) => {
                  const isHovered = hoveredTeamId === team.id;
                  return (
                    <div
                      key={team.id}
                      onClick={() => onSelectTeam(team)}
                      onMouseEnter={() => setHoveredTeamId(team.id)}
                      onMouseLeave={() => setHoveredTeamId(null)}
                      className={`group relative flex items-center justify-between px-3 sm:px-4 py-3 sm:py-3.5 rounded-sm border cursor-pointer transition-all duration-200 select-none ${
                        isHovered
                          ? 'bg-[#081b11] border-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.25)] translate-x-1.5'
                          : 'bg-[#050b08]/80 border-white/5 hover:border-[#00ff66]/40'
                      }`}
                    >
                      {/* Left: Ranking number + Diamond marker + Team name */}
                      <div className="flex items-center gap-3 sm:gap-4 z-10">
                        {/* Decorative diamond marker */}
                        <div
                          className={`transition-all duration-200 ${
                            isHovered ? 'diamond-marker scale-125' : 'diamond-marker-dim'
                          }`}
                        />

                        {/* Ranking Number */}
                        <span className="font-tech font-bold text-sm sm:text-base text-[#00ff66] tracking-wider w-6">
                          {team.rank}
                        </span>

                        {/* Team Name */}
                        <span
                          className={`font-condensed font-extrabold text-base sm:text-xl tracking-wider transition-all duration-200 ${
                            isHovered
                              ? 'text-white text-shadow drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                              : 'text-slate-200'
                          }`}
                        >
                          {team.name}
                        </span>
                      </div>

                      {/* Right: Soundwave / Energy Indicator + Seed Badge + Chevron */}
                      <div className="flex items-center gap-3 z-10">
                        
                        {/* Subtle Sound-wave / Energy effect bar when hovered as requested */}
                        <div
                          className={`flex items-end gap-0.5 h-3 transition-opacity duration-200 ${
                            isHovered ? 'opacity-100' : 'opacity-20'
                          }`}
                        >
                          <span className={`w-0.5 bg-[#00ff66] rounded-full ${isHovered ? 'animate-pulse h-3' : 'h-1.5'}`} />
                          <span className={`w-0.5 bg-[#00ff66] rounded-full ${isHovered ? 'animate-bounce h-2' : 'h-2'}`} />
                          <span className={`w-0.5 bg-[#00ff66] rounded-full ${isHovered ? 'animate-pulse h-3.5' : 'h-1'}`} />
                          <span className={`w-0.5 bg-[#00ff66] rounded-full ${isHovered ? 'animate-bounce h-2.5' : 'h-2'}`} />
                        </div>

                        {/* Seed Points */}
                        <span className="hidden sm:inline-block text-[11px] font-tech text-slate-400 font-bold group-hover:text-[#00ff66] transition-colors">
                          {team.points} PTS
                        </span>

                        <ChevronRight
                          className={`w-4 h-4 transition-all duration-200 ${
                            isHovered ? 'text-[#00ff66] translate-x-0.5' : 'text-slate-600'
                          }`}
                        />
                      </div>

                      {/* Small green animated underline as requested */}
                      <span
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-[#00ff66] shadow-[0_0_8px_#00ff66] transition-all duration-300 ${
                          isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Panel Footer */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-tech text-slate-400">
                <span>QUALIFICATION: TOP 4 ADVANCE</span>
                <span className="text-[#00ff66]">LIVE BRACKET SEEDING</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CENTER LOGO AREA (Desktop)                               */}
          {/* ======================================================== */}
          <div className="hidden lg:flex flex-col items-center justify-center px-4 shrink-0">
            <TmBrushLogo size="lg" />
          </div>

          {/* ======================================================== */}
          {/* RIGHT PANEL: LEAGUE 2 / لیگ دو                           */}
          {/* ======================================================== */}
          <div className="w-full">
            <div className="panel-doomsday panel-corner-accents rounded-sm p-5 sm:p-7 relative overflow-hidden">
              
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="diamond-marker" />
                  <h3 className="font-esports font-black text-2xl sm:text-3xl tracking-widest text-white uppercase">
                    LEAGUE 2 • لیگ دو
                  </h3>
                </div>
                <span className="text-[11px] font-tech text-[#00ff66] tracking-widest uppercase px-2.5 py-1 rounded-sm bg-[#07190f] border border-[#00ff66]/30 font-bold">
                  8 SQUADS
                </span>
              </div>

              {/* Roster Rows for Group B */}
              <div className="space-y-1.5">
                {GROUP_B_TEAMS.map((team, index) => {
                  const isHovered = hoveredTeamId === team.id;
                  return (
                    <div
                      key={team.id}
                      onClick={() => onSelectTeam(team)}
                      onMouseEnter={() => setHoveredTeamId(team.id)}
                      onMouseLeave={() => setHoveredTeamId(null)}
                      className={`group relative flex items-center justify-between px-3 sm:px-4 py-3 sm:py-3.5 rounded-sm border cursor-pointer transition-all duration-200 select-none ${
                        isHovered
                          ? 'bg-[#081b11] border-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.25)] -translate-x-1.5'
                          : 'bg-[#050b08]/80 border-white/5 hover:border-[#00ff66]/40'
                      }`}
                    >
                      {/* Left: Ranking number + Diamond marker + Team name */}
                      <div className="flex items-center gap-3 sm:gap-4 z-10">
                        {/* Decorative diamond marker */}
                        <div
                          className={`transition-all duration-200 ${
                            isHovered ? 'diamond-marker scale-125' : 'diamond-marker-dim'
                          }`}
                        />

                        {/* Ranking Number */}
                        <span className="font-tech font-bold text-sm sm:text-base text-[#00ff66] tracking-wider w-6">
                          {team.rank}
                        </span>

                        {/* Team Name */}
                        <span
                          className={`font-condensed font-extrabold text-base sm:text-xl tracking-wider transition-all duration-200 ${
                            isHovered
                              ? 'text-white text-shadow drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                              : 'text-slate-200'
                          }`}
                        >
                          {team.name}
                        </span>
                      </div>

                      {/* Right: Soundwave / Energy Indicator + Seed Badge + Chevron */}
                      <div className="flex items-center gap-3 z-10">
                        
                        {/* Subtle Sound-wave / Energy effect bar */}
                        <div
                          className={`flex items-end gap-0.5 h-3 transition-opacity duration-200 ${
                            isHovered ? 'opacity-100' : 'opacity-20'
                          }`}
                        >
                          <span className={`w-0.5 bg-[#00ff66] rounded-full ${isHovered ? 'animate-pulse h-3' : 'h-1.5'}`} />
                          <span className={`w-0.5 bg-[#00ff66] rounded-full ${isHovered ? 'animate-bounce h-2' : 'h-2'}`} />
                          <span className={`w-0.5 bg-[#00ff66] rounded-full ${isHovered ? 'animate-pulse h-3.5' : 'h-1'}`} />
                          <span className={`w-0.5 bg-[#00ff66] rounded-full ${isHovered ? 'animate-bounce h-2.5' : 'h-2'}`} />
                        </div>

                        {/* Seed Points */}
                        <span className="hidden sm:inline-block text-[11px] font-tech text-slate-400 font-bold group-hover:text-[#00ff66] transition-colors">
                          {team.points} PTS
                        </span>

                        <ChevronRight
                          className={`w-4 h-4 transition-all duration-200 ${
                            isHovered ? 'text-[#00ff66] -translate-x-0.5' : 'text-slate-600'
                          }`}
                        />
                      </div>

                      {/* Small green animated underline as requested */}
                      <span
                        className={`absolute bottom-0 right-0 h-[1.5px] bg-[#00ff66] shadow-[0_0_8px_#00ff66] transition-all duration-300 ${
                          isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Panel Footer */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-tech text-slate-400">
                <span>QUALIFICATION: TOP 4 ADVANCE</span>
                <span className="text-[#00ff66]">LIVE BRACKET SEEDING</span>
              </div>
            </div>
          </div>

        </div>

        {/* Tactical Info Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-sm bg-[#040906] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-[#00ff66] shrink-0" />
            <p className="text-xs sm:text-sm font-condensed text-slate-300 tracking-wide">
              Official EA FC Pro Clubs 11v11 competitive format. All 16 clubs commence at 0 PTS. Fixtures draw announced on Telegram <span className="text-[#00ff66] font-bold">@TM_Proclubs</span>.
            </p>
          </div>
          <a
            href="https://t.me/TM_Proclubs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-tech text-[#00ff66] hover:underline uppercase tracking-widest font-bold shrink-0 flex items-center gap-1.5"
          >
            <span>JOIN @TM_Proclubs</span>
          </a>
        </div>

      </div>
    </section>
  );
};

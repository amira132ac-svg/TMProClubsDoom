import React, { useState } from 'react';
import { Swords, Calendar, Clock, Shield, CheckCircle2, ChevronRight, Send, ArrowRight, Layers, Flame } from 'lucide-react';
import { TOURNAMENT_MATCHES, TELEGRAM_CHANNEL_URL, TELEGRAM_CHANNEL_HANDLE } from '../data/tournamentData';
import { TournamentMatch } from '../types';

interface MatchesSectionProps {
  onSelectTeamByName?: (name: string) => void;
}

export const MatchesSection: React.FC<MatchesSectionProps> = ({ onSelectTeamByName }) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'LEAGUE 1' | 'LEAGUE 2' | 'RESULTS'>('ALL');

  // Separate completed results and upcoming fixtures
  const completedMatches = TOURNAMENT_MATCHES.filter((m) => m.status === 'FINISHED');
  const upcomingMatches = TOURNAMENT_MATCHES.filter((m) => m.status === 'UPCOMING')
    .slice()
    .sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));

  // Filter logic
  const filteredUpcoming = upcomingMatches.filter((m) => {
    if (activeFilter === 'LEAGUE 1') return m.league === 'LEAGUE 1';
    if (activeFilter === 'LEAGUE 2') return m.league === 'LEAGUE 2';
    if (activeFilter === 'RESULTS') return false;
    return true;
  });

  const showResults = activeFilter === 'ALL' || activeFilter === 'RESULTS';
  const showUpcoming = activeFilter !== 'RESULTS';

  const handleTeamClick = (teamName: string) => {
    if (onSelectTeamByName) {
      onSelectTeamByName(teamName);
    }
  };

  return (
    <section id="matches" className="py-20 sm:py-24 relative overflow-hidden bg-[#030504]">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#00ff66]/05 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#00ff66]/03 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-doomsday-scratches opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#05140b] border border-[#00ff66]/40 text-[#00ff66] text-xs font-tech font-bold tracking-[0.25em] uppercase mb-3">
              <Swords className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>OFFICIAL FIXTURES & BEST-OF-3 RESULTS</span>
            </div>
            <h2 className="font-esports font-black text-4xl sm:text-6xl uppercase text-metallic-title tracking-tight leading-none">
              DOOMSDAY MATCH CENTER
            </h2>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#050b08] p-1.5 rounded-sm border border-white/10 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveFilter('ALL')}
              className={`px-4 py-2 rounded-sm font-tech text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeFilter === 'ALL'
                  ? 'bg-[#00ff66] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL FIXTURES ({upcomingMatches.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('LEAGUE 1')}
              className={`px-4 py-2 rounded-sm font-tech text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeFilter === 'LEAGUE 1'
                  ? 'bg-[#00ff66] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LEAGUE 1 (8)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('LEAGUE 2')}
              className={`px-4 py-2 rounded-sm font-tech text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeFilter === 'LEAGUE 2'
                  ? 'bg-[#00ff66] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LEAGUE 2 (7)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('RESULTS')}
              className={`px-4 py-2 rounded-sm font-tech text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'RESULTS'
                  ? 'bg-[#00ff66] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>RESULTS ({completedMatches.length})</span>
            </button>
          </div>
        </div>

        {/* Format & Rules Banner */}
        <div className="mb-8 p-4 rounded-sm bg-[#05140b] border border-[#00ff66]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-tech">
          <div className="flex items-center gap-2.5 text-[#00ff66]">
            <Shield className="w-4 h-4 shrink-0" />
            <span className="font-bold tracking-wider">
              ALL FIXTURES ARE OFFICIAL BEST-OF-3 (BO3) SERIES • WINNER OF 2 GAMES TAKES THE SERIES (+3 PTS)
            </span>
          </div>
          <span className="text-slate-400">
            Series scores count as ONE result in the official standings table.
          </span>
        </div>

        {/* ======================================================== */}
        {/* COMPLETED BEST-OF-3 RESULTS SECTION                       */}
        {/* ======================================================== */}
        {showResults && completedMatches.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse shadow-[0_0_8px_#00ff66]" />
              <h3 className="font-esports font-bold text-lg sm:text-xl text-white tracking-widest uppercase">
                COMPLETED BEST-OF-3 SERIES RESULTS
              </h3>
            </div>

            <div className="space-y-4">
              {completedMatches.map((match) => (
                <div
                  key={match.id}
                  className="panel-doomsday panel-corner-accents rounded-sm p-5 sm:p-7 border border-[#00ff66]/40 relative overflow-hidden shadow-2xl bg-gradient-to-r from-[#040c07] via-[#05130b] to-[#040c07]"
                >
                  {/* Card Top Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 mb-4 text-xs font-tech">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-sm bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 font-bold uppercase tracking-wider">
                        {match.league ?? 'LEAGUE 1'}
                      </span>
                      <span className="px-2 py-0.5 rounded-sm bg-white/5 text-slate-300 border border-white/10 font-bold">
                        BEST-OF-3 SERIES (BO3)
                      </span>
                      <span className="text-slate-400 hidden sm:inline">
                        • {match.arena}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-[#00ff66]">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff66]" />
                      <span>SERIES FINAL: {match.homeTeam} (2 – 0)</span>
                    </div>
                  </div>

                  {/* Main Head-to-Head Series Row */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 py-2">
                    {/* Home Team (Winner) */}
                    <div
                      onClick={() => handleTeamClick(match.homeTeam)}
                      className="flex items-center gap-4 cursor-pointer group text-left"
                    >
                      <div className="w-12 h-12 rounded-sm bg-[#071f11] border-2 border-[#00ff66] flex items-center justify-center font-esports font-black text-xl text-[#00ff66] shadow-[0_0_15px_rgba(0,255,102,0.3)] shrink-0 group-hover:scale-105 transition-transform">
                        TLG
                      </div>
                      <div>
                        <span className="text-[10px] font-tech text-[#00ff66] uppercase tracking-widest font-bold block">
                          SERIES WINNER (+3 PTS)
                        </span>
                        <h4 className="font-esports font-black text-xl sm:text-2xl text-white tracking-wider group-hover:text-[#00ff66] transition-colors">
                          {match.homeTeam}
                        </h4>
                        <span className="text-xs font-tech text-slate-400">
                          Total Goals: <strong className="text-white">6</strong> (+4 GD)
                        </span>
                      </div>
                    </div>

                    {/* Series Center Score Display */}
                    <div className="flex flex-col items-center justify-center px-6 py-2 bg-[#030805] rounded-sm border border-white/10 shrink-0">
                      <span className="text-[10px] font-tech font-bold text-[#00ff66] uppercase tracking-[0.2em] mb-1">
                        SERIES SCORE
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="font-esports font-black text-3xl sm:text-4xl text-[#00ff66]">
                          {match.seriesScore?.homeWins ?? 2}
                        </span>
                        <span className="text-slate-600 font-tech text-lg font-bold">—</span>
                        <span className="font-esports font-black text-3xl sm:text-4xl text-slate-400">
                          {match.seriesScore?.awayWins ?? 0}
                        </span>
                      </div>
                      <span className="text-[10px] font-tech text-slate-400 uppercase tracking-widest mt-1">
                        BO3 COMPLETED
                      </span>
                    </div>

                    {/* Away Team (Banger) */}
                    <div
                      onClick={() => handleTeamClick(match.awayTeam)}
                      className="flex items-center justify-end gap-4 cursor-pointer group text-right"
                    >
                      <div>
                        <span className="text-[10px] font-tech text-slate-500 uppercase tracking-widest font-bold block">
                          SERIES RUNNER-UP (0 PTS)
                        </span>
                        <h4 className="font-esports font-black text-xl sm:text-2xl text-white tracking-wider group-hover:text-[#00ff66] transition-colors">
                          {match.awayTeam}
                        </h4>
                        <span className="text-xs font-tech text-slate-400">
                          Total Goals: <strong className="text-white">2</strong> (-4 GD)
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-sm bg-[#120808] border-2 border-red-900/60 flex items-center justify-center font-esports font-black text-xl text-slate-300 shrink-0 group-hover:scale-105 transition-transform">
                        BNG
                      </div>
                    </div>
                  </div>

                  {/* Individual Game Scores (Explicitly Required to remain visible in Results) */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2.5">
                      <span className="uppercase font-bold tracking-wider flex items-center gap-1.5 text-white">
                        <Layers className="w-3.5 h-3.5 text-[#00ff66]" />
                        INDIVIDUAL MATCH BREAKDOWN (BOTH MATCH SCORES)
                      </span>
                      <span className="text-[11px] text-[#00ff66] font-bold">
                        COUNTED AS 1 SERIES IN STANDINGS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Game 1 */}
                      <div className="p-3 rounded-sm bg-[#020704] border border-[#00ff66]/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 flex items-center justify-center text-[10px] font-tech font-bold">
                            G1
                          </span>
                          <span className="font-condensed font-bold text-sm sm:text-base text-white">
                            Tehran Legacy <span className="text-[#00ff66]">3</span> – <span className="text-slate-300">1</span> Banger
                          </span>
                        </div>
                        <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-white/5 text-slate-400 font-bold uppercase">
                          MATCH 1 (FT)
                        </span>
                      </div>

                      {/* Game 2 */}
                      <div className="p-3 rounded-sm bg-[#020704] border border-[#00ff66]/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 flex items-center justify-center text-[10px] font-tech font-bold">
                            G2
                          </span>
                          <span className="font-condensed font-bold text-sm sm:text-base text-white">
                            Tehran Legacy <span className="text-[#00ff66]">3</span> – <span className="text-slate-300">1</span> Banger
                          </span>
                        </div>
                        <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-white/5 text-slate-400 font-bold uppercase">
                          MATCH 2 (FT)
                        </span>
                      </div>
                    </div>

                    {/* Official Standings Rule Callout */}
                    <div className="mt-3 p-2.5 rounded-sm bg-[#07130b] border border-white/5 text-[11px] font-tech text-slate-300 flex items-center justify-between">
                      <span>
                        <strong className="text-[#00ff66]">Standings Rule Applied:</strong> Both matches recorded as <strong>ONE completed series</strong>. Tehran Legacy: +1 Win, 6 GF, 2 GA, +4 GD, +3 PTS. Banger: +1 Loss, 2 GF, 6 GA, -4 GD, 0 PTS.
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* UPCOMING FIXTURES (CHRONOLOGICALLY SORTED)                */}
        {/* ======================================================== */}
        {showUpcoming && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00ff66]" />
                <h3 className="font-esports font-bold text-lg sm:text-xl text-white tracking-widest uppercase">
                  SCHEDULED FIXTURES • CHRONOLOGICAL ORDER ({filteredUpcoming.length})
                </h3>
              </div>
              <span className="text-xs font-tech text-slate-400">
                ALL TIMES IRST / LOCAL TOURNAMENT TIME
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUpcoming.map((fixture, index) => {
                const isLeague1 = fixture.league === 'LEAGUE 1';

                return (
                  <div
                    key={fixture.id}
                    className="panel-doomsday panel-corner-accents rounded-sm p-4 sm:p-5 border border-white/10 hover:border-[#00ff66]/60 transition-all duration-300 relative group overflow-hidden bg-[#040806]"
                  >
                    {/* Fixture Top Header: Day, Date, Time & League */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-xs font-tech">
                      <div className="flex items-center gap-2">
                        {/* Day & Date in English as explicitly required */}
                        <div className="flex items-center gap-1.5 text-white font-bold">
                          <Calendar className="w-3.5 h-3.5 text-[#00ff66]" />
                          <span>{fixture.day}, {fixture.date.split(',')[1]?.trim() ?? fixture.date}</span>
                        </div>
                        {/* Time in English as explicitly required */}
                        <div className="flex items-center gap-1 text-[#00ff66] font-bold bg-[#07190f] px-2 py-0.5 rounded-sm border border-[#00ff66]/30">
                          <Clock className="w-3 h-3 text-[#00ff66]" />
                          <span>{fixture.time}</span>
                        </div>
                      </div>

                      {/* League Badge */}
                      <span
                        className={`px-2 py-0.5 rounded-sm text-[10px] font-tech font-bold uppercase tracking-wider border ${
                          isLeague1
                            ? 'bg-[#00ff66]/10 text-[#00ff66] border-[#00ff66]/40'
                            : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                        }`}
                      >
                        {fixture.league}
                      </span>
                    </div>

                    {/* Matchup Teams Row */}
                    <div className="flex items-center justify-between gap-3 py-2">
                      {/* Home Team */}
                      <button
                        type="button"
                        onClick={() => handleTeamClick(fixture.homeTeam)}
                        className="flex-1 text-left group/team cursor-pointer"
                      >
                        <span className="font-esports font-bold text-base sm:text-lg text-white group-hover/team:text-[#00ff66] transition-colors block truncate">
                          {fixture.homeTeam}
                        </span>
                        <span className="text-[10px] font-tech text-slate-500 uppercase tracking-widest block">
                          HOME SQUAD
                        </span>
                      </button>

                      {/* VS & Format Badge */}
                      <div className="flex flex-col items-center justify-center px-3 shrink-0">
                        <span className="font-tech font-extrabold text-xs text-slate-400 bg-[#07140b] px-2.5 py-1 rounded-sm border border-white/10 group-hover:border-[#00ff66] group-hover:text-[#00ff66] transition-colors">
                          VS
                        </span>
                        <span className="text-[9px] font-tech font-bold text-[#00ff66] uppercase tracking-wider mt-1">
                          BO3
                        </span>
                      </div>

                      {/* Away Team */}
                      <button
                        type="button"
                        onClick={() => handleTeamClick(fixture.awayTeam)}
                        className="flex-1 text-right group/team cursor-pointer"
                      >
                        <span className="font-esports font-bold text-base sm:text-lg text-white group-hover/team:text-[#00ff66] transition-colors block truncate">
                          {fixture.awayTeam}
                        </span>
                        <span className="text-[10px] font-tech text-slate-500 uppercase tracking-widest block">
                          AWAY SQUAD
                        </span>
                      </button>
                    </div>

                    {/* Fixture Footer */}
                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-tech text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3 h-3 text-[#00ff66]" />
                        <span>Best-of-3 Series</span>
                      </span>
                      <span className="text-slate-500">
                        {fixture.arena}
                      </span>
                    </div>

                    {/* Hover glow line */}
                    <span className="absolute bottom-0 left-0 h-[1.5px] bg-[#00ff66] shadow-[0_0_8px_#00ff66] transition-all duration-300 w-0 group-hover:w-full opacity-0 group-hover:opacity-100" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Telegram Updates Callout Footer */}
        <div className="mt-12 p-5 sm:p-6 rounded-sm bg-[#05110a] border border-[#00ff66]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-sm bg-[#082214] border border-[#00ff66]/40 flex items-center justify-center text-[#00ff66] shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-base text-white tracking-wide">
                OFFICIAL MATCH LIAISON & STREAMING BROADCASTS
              </h4>
              <p className="text-xs font-tech text-slate-400">
                Kickoff streams, Discord match rooms, and server passwords are administered through our official channel.
              </p>
            </div>
          </div>

          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#082214] border border-[#00ff66] text-[#00ff66] hover:bg-[#00ff66] hover:text-black font-condensed font-bold text-sm tracking-wider uppercase transition-all duration-300 shrink-0"
          >
            <span>JOIN {TELEGRAM_CHANNEL_HANDLE}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};

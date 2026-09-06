import React, { useState } from 'react';
import { Trophy, Target, Shield, Send, Activity, Sparkles, Medal } from 'lucide-react';
import { TOP_SCORERS, TOP_ASSISTS, TELEGRAM_CHANNEL_URL, TELEGRAM_CHANNEL_HANDLE } from '../data/tournamentData';

interface StatsSectionProps {
  onSelectTeamByName?: (teamName: string) => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ onSelectTeamByName }) => {
  const [activeTab, setActiveTab] = useState<'scorers' | 'assists'>('scorers');
  const [selectedGroup, setSelectedGroup] = useState<'ALL' | 'A' | 'B'>('ALL');

  const rawList = activeTab === 'scorers' ? TOP_SCORERS : TOP_ASSISTS;
  const filteredList = rawList.filter(
    (player) => selectedGroup === 'ALL' || player.group === selectedGroup
  );

  const topScorer = TOP_SCORERS.find(
    (player) => selectedGroup === 'ALL' || player.group === selectedGroup
  );
  const topAssister = TOP_ASSISTS.find(
    (player) => selectedGroup === 'ALL' || player.group === selectedGroup
  );

  return (
    <section id="stats" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00ff66]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#00ff66]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] text-xs font-tech font-bold uppercase tracking-widest mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>PLAYER STATS & LEADERBOARDS</span>
          </div>

          <h2 className="font-esports font-black text-3xl sm:text-5xl text-white tracking-wider uppercase mb-3">
            TOURNAMENT STATS • <span className="text-[#00ff66] text-shadow drop-shadow-[0_0_15px_rgba(0,255,102,0.4)]">GOALS & ASSISTS</span>
          </h2>
          <p className="font-condensed text-base sm:text-lg text-slate-400">
            Official leaderboards for Top Scorers (Golden Boot) and Playmakers in TM PROCLUBS DOOMSDAY
          </p>
        </div>

        {/* 4 Metric Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          
          {/* Top Scorer Card */}
          <div className="panel-doomsday p-4 sm:p-5 rounded-sm border border-[#00ff66]/40 relative overflow-hidden group hover:border-[#00ff66] transition-all bg-[#051109]">
            <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
              <span className="uppercase tracking-wider flex items-center gap-1.5 text-white">
                <Target className="w-3.5 h-3.5 text-[#00ff66]" />
                TOP SCORER
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00ff66]/20 text-[#00ff66] font-bold">
                {topScorer ? `${topScorer.goals} GOALS` : '0 GOALS'}
              </span>
            </div>
            <div className="font-esports font-black text-xl sm:text-2xl text-white tracking-wide truncate">
              {topScorer ? topScorer.name : 'AWAITING STATS'}
            </div>
            <div className="text-[11px] font-tech text-[#00ff66] mt-1 flex items-center justify-between">
              <span>{topScorer ? `${topScorer.team} (${topScorer.matchesPlayed} MATCHES)` : 'ROUND 1 PENDING'}</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Medal className="w-3 h-3" />
                BOOT
              </span>
            </div>
          </div>

          {/* Top Assist Card */}
          <div className="panel-doomsday p-4 sm:p-5 rounded-sm border border-[#00ff66]/40 relative overflow-hidden group hover:border-[#00ff66] transition-all bg-[#051109]">
            <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
              <span className="uppercase tracking-wider flex items-center gap-1.5 text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#00ff66]" />
                TOP ASSIST
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00ff66]/20 text-[#00ff66] font-bold">
                {topAssister ? `${topAssister.assists} ASSISTS` : '0 ASSISTS'}
              </span>
            </div>
            <div className="font-esports font-black text-xl sm:text-2xl text-white tracking-wide truncate">
              {topAssister
                ? topAssister.team === 'INVADERZ' && selectedGroup !== 'B'
                  ? `${topAssister.name} & m.asli`
                  : topAssister.name
                : 'AWAITING STATS'}
            </div>
            <div className="text-[11px] font-tech text-[#00ff66] mt-1 flex items-center justify-between">
              <span>{topAssister ? `${topAssister.team}` : 'ROUND 1 PENDING'}</span>
              <span className="text-[#00ff66] font-bold">PLAYMAKER</span>
            </div>
          </div>

          {/* Total Goals in Tournament */}
          <div className="panel-doomsday p-4 sm:p-5 rounded-sm border border-white/10 relative overflow-hidden group hover:border-[#00ff66]/50 transition-all">
            <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
              <span className="uppercase tracking-wider flex items-center gap-1.5 text-white">
                <Activity className="w-3.5 h-3.5 text-[#00ff66]" />
                TOTAL GOALS
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00ff66]/10 text-[#00ff66] font-bold">
                LEAGUE 1 & 2
              </span>
            </div>
            <div className="font-esports font-black text-2xl sm:text-3xl text-white tracking-wide">
              84 <span className="text-xs font-tech text-[#00ff66] font-bold">GOALS SCORED</span>
            </div>
            <div className="text-[11px] font-tech text-slate-400 mt-1">
              Completed Matches: <span className="text-white font-bold">18 Matches (9 Series)</span>
            </div>
          </div>

          {/* Registered Clubs Card */}
          <div className="panel-doomsday p-4 sm:p-5 rounded-sm border border-white/10 relative overflow-hidden group hover:border-[#00ff66]/50 transition-all">
            <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
              <span className="uppercase tracking-wider flex items-center gap-1.5 text-white">
                <Shield className="w-3.5 h-3.5 text-[#00ff66]" />
                CLUBS
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                11v11
              </span>
            </div>
            <div className="font-esports font-black text-2xl sm:text-3xl text-[#00ff66] tracking-wide">
              16 <span className="text-xs font-tech text-slate-400 font-normal">TEAMS IN RACE</span>
            </div>
            <div className="text-[11px] font-tech text-slate-400 mt-1">
              League 1: <span className="text-white font-bold">8</span> • League 2: <span className="text-white font-bold">8</span>
            </div>
          </div>

        </div>

        {/* Official Notice Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-sm bg-[#040906] border border-[#00ff66]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#081e11] border border-[#00ff66]/40 flex items-center justify-center text-[#00ff66] shrink-0 mt-0.5">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-base text-white tracking-wide flex items-center gap-2">
                OFFICIAL PLAYER SCORECARD REGISTERED
                <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/40 font-bold">
                  VERIFIED STATS
                </span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5 leading-relaxed">
                Official goal and assist records updated for INVADERZ, HANGOVER, SPIRITS, PARS LEGION, FC ADAB, SOROUSH FC, TEHRAN LEGACY, BANGER, and ROYAL MADRID FC. Remaining club statistics will be updated upon scorecard submission.
              </p>
            </div>
          </div>

          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-sm bg-[#071c10] border border-[#00ff66]/50 hover:border-[#00ff66] text-[#00ff66] text-xs font-tech font-bold uppercase tracking-wider transition-all group"
          >
            <Send className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>JOIN {TELEGRAM_CHANNEL_HANDLE}</span>
          </a>
        </div>

        {/* Tab & Filter Controls - Only Top Scorers & Top Assists */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          
          {/* Main Category Tabs: ONLY Scorers and Assists */}
          <div className="flex items-center gap-2 bg-[#050b07] p-1.5 rounded-sm border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('scorers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs sm:text-sm font-condensed font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'scorers'
                  ? 'bg-[#00ff66] text-black shadow-[0_0_12px_rgba(0,255,102,0.4)] font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>TOP SCORERS (GOALS)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('assists')}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs sm:text-sm font-condensed font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'assists'
                  ? 'bg-[#00ff66] text-black shadow-[0_0_12px_rgba(0,255,102,0.4)] font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>TOP ASSISTS (PLAYMAKERS)</span>
            </button>
          </div>

          {/* League Filter */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs font-tech">
            <span className="text-slate-500 mr-1 uppercase">LEAGUE:</span>
            {(['ALL', 'A', 'B'] as const).map((grp) => (
              <button
                key={grp}
                type="button"
                onClick={() => setSelectedGroup(grp)}
                className={`px-3 py-1 rounded-sm border font-bold transition-colors cursor-pointer ${
                  selectedGroup === grp
                    ? 'bg-[#092214] border-[#00ff66] text-[#00ff66]'
                    : 'bg-[#050a07] border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {grp === 'ALL' ? 'ALL LEAGUES' : grp === 'A' ? 'LEAGUE 1' : 'LEAGUE 2'}
              </button>
            ))}
          </div>

        </div>

        {/* Stats Table Panel */}
        <div className="panel-doomsday rounded-sm border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#061109] text-slate-400 text-xs font-tech uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-14 text-center">#</th>
                  <th className="py-3.5 px-4">PLAYER</th>
                  <th className="py-3.5 px-4">CLUB</th>
                  <th className="py-3.5 px-4 text-center w-24">MATCHES</th>
                  <th className="py-3.5 px-4 text-center w-28 text-[#00ff66]">
                    {activeTab === 'scorers' ? 'GOALS' : 'ASSISTS'}
                  </th>
                  <th className="py-3.5 px-4 text-center w-24 hidden sm:table-cell">
                    {activeTab === 'scorers' ? 'ASSISTS' : 'GOALS'}
                  </th>
                  <th className="py-3.5 px-4 text-center w-24 hidden md:table-cell">RATIO</th>
                  <th className="py-3.5 px-4 text-center w-36">HONOR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-condensed">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 font-tech">
                      <Shield className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <p className="text-white font-bold text-sm">NO PLAYERS FOUND FOR SELECTED LEAGUE</p>
                      <p className="text-xs text-slate-500 mt-1">Player stats for this league will appear once submitted by match directors.</p>
                    </td>
                  </tr>
                ) : (
                  filteredList.map((player, idx) => {
                    const rank = idx + 1;
                    const primaryStat = activeTab === 'scorers' ? player.goals : player.assists;
                    const secondaryStat = activeTab === 'scorers' ? player.assists : player.goals;
                    const ratio = (primaryStat / Math.max(player.matchesPlayed, 1)).toFixed(2);

                    return (
                      <tr
                        key={player.id}
                        className={`hover:bg-white/[0.03] transition-colors ${
                          rank === 1 ? 'bg-[#00ff66]/[0.03]' : ''
                        }`}
                      >
                        {/* Rank */}
                        <td className="py-3.5 px-4 text-center font-tech font-bold">
                          {rank === 1 ? (
                            <span className="w-7 h-7 mx-auto rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center text-xs font-black shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                              01
                            </span>
                          ) : rank === 2 ? (
                            <span className="w-7 h-7 mx-auto rounded bg-slate-300/15 text-slate-200 border border-slate-300/30 flex items-center justify-center text-xs font-bold">
                              02
                            </span>
                          ) : rank === 3 ? (
                            <span className="w-7 h-7 mx-auto rounded bg-amber-700/20 text-amber-500 border border-amber-700/30 flex items-center justify-center text-xs font-bold">
                              03
                            </span>
                          ) : (
                            <span className="text-slate-500 text-xs">
                              {rank < 10 ? `0${rank}` : rank}
                            </span>
                          )}
                        </td>

                        {/* Player */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-sm flex items-center justify-center font-tech text-xs font-bold ${
                              rank === 1
                                ? 'bg-[#00ff66]/20 border border-[#00ff66] text-[#00ff66]'
                                : 'bg-[#08150c] border border-white/10 text-slate-300'
                            }`}>
                              {player.teamShortCode}
                            </div>
                            <div>
                              <span className="font-bold text-white tracking-wide block text-sm sm:text-base">
                                {player.name}
                              </span>
                              <span className="text-[11px] font-tech text-slate-400 block sm:hidden">
                                {player.team}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Club */}
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => onSelectTeamByName?.(player.team)}
                            className="inline-flex items-center gap-1.5 text-xs font-tech text-slate-300 hover:text-[#00ff66] transition-colors cursor-pointer"
                          >
                            <span className="font-bold uppercase tracking-wide">{player.team}</span>
                          </button>
                        </td>

                        {/* Matches */}
                        <td className="py-3.5 px-4 text-center font-tech text-slate-300 font-bold">
                          {player.matchesPlayed}
                        </td>

                        {/* Primary Stat Count (Goals or Assists) */}
                        <td className="py-3.5 px-4 text-center font-esports font-black text-xl text-[#00ff66]">
                          {primaryStat}
                        </td>

                        {/* Secondary Stat (Assists or Goals) */}
                        <td className="py-3.5 px-4 text-center font-tech text-slate-400 hidden sm:table-cell">
                          {secondaryStat}
                        </td>

                        {/* Ratio */}
                        <td className="py-3.5 px-4 text-center font-tech text-slate-400 hidden md:table-cell">
                          {ratio} / m
                        </td>

                        {/* Status / Honor */}
                        <td className="py-3.5 px-4 text-center">
                          {rank === 1 ? (
                            <span className="text-[10px] font-tech font-bold px-2.5 py-1 rounded bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/50 shadow-[0_0_8px_rgba(0,255,102,0.3)]">
                              {activeTab === 'scorers' ? 'GOLDEN BOOT #1' : 'PLAYMAKER #1'}
                            </span>
                          ) : rank <= 3 ? (
                            <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                              TOP 3
                            </span>
                          ) : (
                            <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                              VERIFIED
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-[#040806] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-tech text-slate-400">
            <span>TM PROCLUBS OFFICIAL STATS • VERIFIED BY MATCH DIRECTORS</span>
            <span className="text-[#00ff66] font-bold">
              MATCH FIXTURES & UPDATES ON TELEGRAM {TELEGRAM_CHANNEL_HANDLE}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};


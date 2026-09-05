import React, { useState } from 'react';
import { Trophy, Target, Shield, Send, Activity, Sparkles } from 'lucide-react';
import { TOP_SCORERS, TOP_ASSISTS, TELEGRAM_CHANNEL_URL, TELEGRAM_CHANNEL_HANDLE } from '../data/tournamentData';

interface StatsSectionProps {
  onSelectTeamByName?: (teamName: string) => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ onSelectTeamByName }) => {
  const [activeTab, setActiveTab] = useState<'scorers' | 'assists'>('scorers');
  const [selectedGroup, setSelectedGroup] = useState<'ALL' | 'A' | 'B'>('ALL');

  return (
    <section id="stats" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00ff66]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#00ff66]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header (English) */}
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
          <div className="panel-doomsday p-4 sm:p-5 rounded-sm border border-white/10 relative overflow-hidden group hover:border-[#00ff66]/50 transition-all">
            <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
              <span className="uppercase tracking-wider flex items-center gap-1.5 text-white">
                <Target className="w-3.5 h-3.5 text-[#00ff66]" />
                TOP SCORER
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                0 GOALS
              </span>
            </div>
            <div className="font-esports font-black text-xl sm:text-2xl text-white tracking-wide truncate">
              AWAITING KICKOFF
            </div>
            <div className="text-[11px] font-tech text-[#00ff66] mt-1 flex items-center justify-between">
              <span>ROUND 1 PENDING</span>
              <span className="text-slate-500 font-bold">GOLDEN BOOT</span>
            </div>
          </div>

          {/* Top Assist Card */}
          <div className="panel-doomsday p-4 sm:p-5 rounded-sm border border-white/10 relative overflow-hidden group hover:border-[#00ff66]/50 transition-all">
            <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
              <span className="uppercase tracking-wider flex items-center gap-1.5 text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#00ff66]" />
                TOP ASSIST
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                0 ASSISTS
              </span>
            </div>
            <div className="font-esports font-black text-xl sm:text-2xl text-white tracking-wide truncate">
              AWAITING KICKOFF
            </div>
            <div className="text-[11px] font-tech text-[#00ff66] mt-1 flex items-center justify-between">
              <span>ROUND 1 PENDING</span>
              <span className="text-slate-500 font-bold">PLAYMAKER</span>
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
                LEAGUE 1 ACTIVE
              </span>
            </div>
            <div className="font-esports font-black text-2xl sm:text-3xl text-white tracking-wide">
              20 <span className="text-xs font-tech text-[#00ff66] font-bold">GOALS SCORED</span>
            </div>
            <div className="text-[11px] font-tech text-slate-400 mt-1">
              Matches Played: <span className="text-white font-bold">6 Matches (3 Fixtures)</span>
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
                PLAYER SCORECARD SUBMISSIONS
                <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 font-bold">
                  PENDING VERIFICATION
                </span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5 leading-relaxed">
                Individual player scorers and assisters for Tehran Legacy vs Banger (8 total goals) and upcoming fixtures will be published immediately upon tournament director verification.
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
                  ? 'bg-[#00ff66] text-black shadow-[0_0_12px_rgba(0,255,102,0.4)]'
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
                  ? 'bg-[#00ff66] text-black shadow-[0_0_12px_rgba(0,255,102,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>TOP ASSISTS (ASSISTS)</span>
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
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">PLAYER</th>
                  <th className="py-3 px-4">CLUB</th>
                  <th className="py-3 px-4 text-center w-24">MATCHES</th>
                  <th className="py-3 px-4 text-center w-28 text-[#00ff66]">
                    {activeTab === 'scorers' ? 'GOALS' : 'ASSISTS'}
                  </th>
                  <th className="py-3 px-4 text-center w-24 hidden sm:table-cell">RATIO</th>
                  <th className="py-3 px-4 text-center w-32">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-condensed">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => (
                  <tr
                    key={slot}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center font-tech font-bold text-slate-500">
                      {slot === 1 ? (
                        <span className="w-6 h-6 mx-auto rounded-sm bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 flex items-center justify-center text-xs">
                          01
                        </span>
                      ) : (
                        `0${slot}`
                      )}
                    </td>

                    {/* Player */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-sm bg-[#08150c] border border-white/10 flex items-center justify-center text-slate-500 font-tech text-xs">
                          --
                        </div>
                        <div>
                          <span className="font-bold text-white tracking-wide block">
                            AWAITING ROUND 1
                          </span>
                          <span className="text-[11px] font-tech text-slate-500">
                            PLAYER #{slot}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Club */}
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-tech text-slate-400">
                        {selectedGroup === 'B' ? 'LEAGUE 2 CLUBS' : selectedGroup === 'A' ? 'LEAGUE 1 CLUBS' : '16 TOURNAMENT CLUBS'}
                      </span>
                    </td>

                    {/* Matches */}
                    <td className="py-3.5 px-4 text-center font-tech text-slate-400 font-bold">
                      0
                    </td>

                    {/* Stat Count (Goals or Assists) */}
                    <td className="py-3.5 px-4 text-center font-esports font-bold text-lg text-[#00ff66]">
                      0
                    </td>

                    {/* Ratio */}
                    <td className="py-3.5 px-4 text-center font-tech text-slate-500 hidden sm:table-cell">
                      0.00
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                        PENDING KICKOFF
                      </span>
                    </td>
                  </tr>
                ))}
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

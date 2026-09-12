import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Award, Shield, ChevronRight } from 'lucide-react';
import { GROUP_A_TEAMS, GROUP_B_TEAMS } from '../data/tournamentData';
import { TournamentTeam } from '../types';

interface StandingsSectionProps {
  onSelectTeam: (team: TournamentTeam) => void;
}

export const StandingsSection: React.FC<StandingsSectionProps> = ({ onSelectTeam }) => {
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');

  const currentTeams = (activeTab === 'A' ? GROUP_A_TEAMS : GROUP_B_TEAMS)
    .slice()
    .sort((a, b) => b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) || a.seed - b.seed);

  return (
    <section id="standings" className="py-20 sm:py-24 relative overflow-hidden bg-[#030504]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute bottom-10 left-1/3 w-[700px] h-[500px] bg-[#00ff66]/05 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-doomsday-scratches opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header as explicitly required:
            "Create a professional standings section."
        */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#05140b] border border-[#00ff66]/40 text-[#00ff66] text-xs font-tech font-bold tracking-[0.25em] uppercase mb-3">
              <Trophy className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>LEAGUE TABLE • جدول لیگ</span>
            </div>
            <h2 className="font-esports font-black text-4xl sm:text-6xl uppercase text-metallic-title tracking-tight leading-none">
              DOOMSDAY STANDINGS
            </h2>
          </div>

          {/* Group Switcher Tabs */}
          <div className="flex items-center gap-2 bg-[#050b08] p-1 rounded-sm border border-white/10 self-start md:self-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setActiveTab('A')}
              className={`px-5 py-2 rounded-sm font-tech text-xs sm:text-sm font-bold tracking-widest transition-all cursor-pointer ${
                activeTab === 'A'
                  ? 'bg-[#00ff66] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LEAGUE 1 • لیگ ۱
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setActiveTab('B')}
              className={`px-5 py-2 rounded-sm font-tech text-xs sm:text-sm font-bold tracking-widest transition-all cursor-pointer ${
                activeTab === 'B'
                  ? 'bg-[#00ff66] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LEAGUE 2 • لیگ ۲
            </motion.button>
          </div>
        </div>

        {/* 2-Match Fixture Standings Rule Notice */}
        <div className="mb-4 px-4 py-3 rounded-sm bg-[#05110a] border border-[#00ff66]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-tech text-slate-300">
          <span className="flex items-center gap-2 text-[#00ff66] font-bold">
            <Shield className="w-4 h-4 text-[#00ff66]" />
            2-MATCH FIXTURE FORMAT: 3 POINTS PER WIN (UP TO 6 PTS TOTAL)
          </span>
          <span className="text-slate-400">
            Win = 3 PTS • Draw = 1 PTS • Loss = 0 PTS
          </span>
        </div>

        {/* Standings Table in Doomsday Visual Language */}
        <div className="panel-doomsday panel-corner-accents rounded-sm overflow-hidden border border-[#00ff66]/30">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-white/10 bg-[#040806] text-[12px] font-tech font-bold text-[#00ff66] uppercase tracking-wider">
                  <th className="py-4 px-4 sm:px-6 w-16 text-center">#</th>
                  <th className="py-4 px-4 sm:px-6">تیم • TEAM</th>
                  <th className="py-4 px-4 text-center" title="تعداد بازی • Matches Played">بازی • P</th>
                  <th className="py-4 px-4 text-center" title="تفاضل گل • Goal Difference">تفاضل • GD</th>
                  <th className="py-4 px-4 sm:px-6 text-right" title="امتیاز کل • Total Points">امتیاز • PTS</th>
                </tr>
              </thead>
              <AnimatePresence mode="wait">
                <motion.tbody
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="divide-y divide-white/5 font-condensed"
                >
                  {currentTeams.map((team, idx) => {
                    const isTopFour = idx < 4;
                    const isLeader = idx === 0;
                    const goalDiff = team.goalsFor - team.goalsAgainst;

                    return (
                      <motion.tr
                        whileHover={{ backgroundColor: 'rgba(0, 255, 102, 0.04)' }}
                        key={team.id}
                        onClick={() => onSelectTeam(team)}
                        className={`transition-colors duration-200 cursor-pointer group select-none ${
                          isLeader
                            ? 'bg-[#081f13]/60 shadow-[inset_0_0_20px_rgba(0,255,102,0.08)]'
                            : isTopFour
                            ? 'bg-[#05110a]/40'
                            : 'bg-transparent'
                        }`}
                      >
                      {/* Rank Column */}
                      <td className="py-4 px-4 sm:px-6 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {isTopFour && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_6px_#00ff66]" />
                          )}
                          <span
                            className={`font-tech font-bold text-sm sm:text-base ${
                              isLeader ? 'text-[#00ff66]' : isTopFour ? 'text-slate-200' : 'text-slate-500'
                            }`}
                          >
                            {idx + 1}
                          </span>
                        </div>
                      </td>

                      {/* Team Name Column */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-[#06140b] border border-white/10 group-hover:border-[#00ff66] flex items-center justify-center font-esports font-bold text-sm text-white transition-colors">
                            {team.shortCode}
                          </div>
                          <div>
                            <span
                              className={`font-extrabold text-base sm:text-lg tracking-wider transition-colors block leading-tight ${
                                isLeader
                                  ? 'text-white text-shadow drop-shadow-[0_0_8px_rgba(0,255,102,0.5)]'
                                  : 'text-slate-200 group-hover:text-white'
                              }`}
                            >
                              {team.name}
                            </span>
                            {team.played > 0 && (
                              <span className="text-[10px] font-tech text-[#00ff66] font-bold">
                                {team.played} بازی • {team.points} امتیاز
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Played */}
                      <td className="py-4 px-4 text-center text-sm sm:text-base font-tech text-slate-200 font-bold">
                        {team.played}
                      </td>

                      {/* Goal Difference */}
                      <td className="py-4 px-4 text-center text-sm sm:text-base font-tech">
                        <span className={goalDiff > 0 ? 'text-[#00ff66] font-bold' : goalDiff < 0 ? 'text-red-400 font-bold' : 'text-slate-400 font-bold'}>
                          {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                        </span>
                      </td>

                      {/* Points */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span
                            className={`font-esports font-black text-xl sm:text-2xl tracking-wider ${
                              isLeader
                                ? 'text-[#00ff66] drop-shadow-[0_0_10px_rgba(0,255,102,0.8)]'
                                : isTopFour
                                ? 'text-white'
                                : 'text-slate-300'
                            }`}
                          >
                            {team.points}
                          </span>
                          <span className="text-[10px] font-tech text-slate-500 font-bold">PTS</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#00ff66] transition-colors" />
                        </div>
                      </td>
                      </motion.tr>
                    );
                  })}
                </motion.tbody>
              </AnimatePresence>
            </table>
          </div>

          {/* Table Legend */}
          <div className="px-6 py-4 bg-[#040806] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-tech text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66]" />
                <span>CHAMPIONS BRACKET (TOP 4)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span>ELIMINATION ZONE (5-8)</span>
              </div>
            </div>

            <span className="text-slate-500">
              CRITERIA: POINTS &gt; GOAL DIFFERENCE &gt; GOALS FOR
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

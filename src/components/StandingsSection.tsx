import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Shield, Clock, Calendar, Swords, Flame, ChevronDown, ChevronUp, ChevronRight, Crown, Sparkles } from 'lucide-react';
import { ALL_TEAMS, GROUP_A_TEAMS, GROUP_B_TEAMS, WEDNESDAY_SCHEDULE } from '../data/tournamentData';
import { TournamentTeam } from '../types';

interface StandingsSectionProps {
  onSelectTeam: (team: TournamentTeam) => void;
}

export const StandingsSection: React.FC<StandingsSectionProps> = ({ onSelectTeam }) => {
  const [showArchive, setShowArchive] = useState(false);
  const [activeArchiveGroup, setActiveArchiveGroup] = useState<'A' | 'B'>('A');

  const currentArchiveTeams = (activeArchiveGroup === 'A' ? GROUP_A_TEAMS : GROUP_B_TEAMS)
    .slice()
    .sort((a, b) => b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) || a.seed - b.seed);

  const handleTeamClickByName = (teamName: string) => {
    const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const target = clean(teamName);
    const found = ALL_TEAMS.find((t) => {
      const c = clean(t.name);
      return c === target || c.includes(target) || target.includes(c);
    });
    if (found) {
      onSelectTeam(found);
    }
  };

  return (
    <section id="standings" className="py-16 sm:py-24 relative overflow-hidden bg-[#030504]">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[500px] bg-[#00ff66]/06 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[400px] bg-[#00ff66]/04 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-doomsday-scratches opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#05140b] border border-[#00ff66]/40 text-[#00ff66] text-xs font-tech font-bold tracking-[0.25em] uppercase mb-3">
              <Calendar className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>OFFICIAL WEDNESDAY FIXTURES • جدول مسابقات روز چهارشنبه</span>
            </div>
            <h2 className="font-esports font-black text-4xl sm:text-6xl uppercase text-metallic-title tracking-tight leading-none">
              DOOMSDAY SCHEDULE
            </h2>
            <p className="font-condensed text-slate-300 text-sm sm:text-base mt-2 tracking-wide">
              جدول بازی‌های روز چهارشنبه • سوپر فینال و مرحله پلی‌آف نهایی
            </p>
          </div>

          {/* Quick Info Capsule */}
          <div className="flex items-center gap-2 bg-[#05110a] border border-[#00ff66]/30 px-4 py-2 rounded-sm text-xs font-tech text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
            <span className="text-[#00ff66] font-bold">روز مسابقات: چهارشنبه</span>
            <span className="text-slate-500">|</span>
            <span>شروع از ساعت ۱۱:۰۰</span>
          </div>
        </div>

        {/* 1. SUPER FINAL CARD (Hangover vs Alnahd) */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-amber-400" />
            <h3 className="font-esports font-bold text-xl sm:text-2xl text-white tracking-wider uppercase">
              SUPER FINAL • دیدار قهرمانان
            </h3>
            <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30">
              چهارشنبه • ساعت توافقی
            </span>
          </div>

          <div className="panel-doomsday panel-corner-accents rounded-sm p-6 sm:p-8 border border-amber-400/40 relative overflow-hidden bg-gradient-to-r from-[#0a0f07] via-[#0d1c0f] to-[#0a0f07] shadow-[0_0_35px_rgba(251,191,36,0.1)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 text-xs font-tech">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-sm bg-amber-400/15 text-amber-300 border border-amber-400/30 font-bold uppercase tracking-wider">
                  SUPER FINAL
                </span>
                <span className="text-slate-400">
                  تقابل صدرنشینان لیگ یک و لیگ دو
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Clock className="w-4 h-4" />
                <span>ساعت : توافقی</span>
              </div>
            </div>

            {/* Teams Matchup */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 py-4">
              
              {/* Team 1: Hangover */}
              <div
                onClick={() => handleTeamClickByName('Hangover')}
                className="flex items-center justify-start md:justify-end gap-4 p-4 rounded-sm bg-[#040a06]/80 border border-white/10 hover:border-[#00ff66] transition-all cursor-pointer group"
              >
                <div className="text-left md:text-right">
                  <span className="text-[11px] font-tech text-[#00ff66] font-bold block uppercase tracking-wider">
                    LEAGUE 2 CHAMPION • صدرنشین لیگ ۲
                  </span>
                  <h4 className="font-esports font-black text-2xl sm:text-3xl text-white group-hover:text-[#00ff66] transition-colors leading-tight">
                    Hangover
                  </h4>
                </div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-sm bg-[#071f11] border-2 border-[#00ff66] flex items-center justify-center font-esports font-bold text-lg sm:text-xl text-[#00ff66] shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,255,102,0.3)]">
                  HNG
                </div>
              </div>

              {/* VS Pill */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-300 font-esports font-black text-sm">
                  VS
                </div>
                <span className="text-[11px] font-tech font-bold text-amber-300 uppercase tracking-widest mt-2">
                  روز چهارشنبه
                </span>
                <span className="text-[10px] font-tech text-slate-400 mt-0.5">
                  ساعت : توافقی
                </span>
              </div>

              {/* Team 2: Alnahd */}
              <div
                onClick={() => handleTeamClickByName('AL NAHD')}
                className="flex items-center justify-start gap-4 p-4 rounded-sm bg-[#040a06]/80 border border-white/10 hover:border-amber-400 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-sm bg-[#171408] border-2 border-amber-400 flex items-center justify-center font-esports font-bold text-lg sm:text-xl text-amber-300 shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                  ALN
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-tech text-amber-300 font-bold block uppercase tracking-wider">
                    LEAGUE 1 CHAMPION • صدرنشین لیگ ۱
                  </span>
                  <h4 className="font-esports font-black text-2xl sm:text-3xl text-white group-hover:text-amber-300 transition-colors leading-tight">
                    Alnahd
                  </h4>
                </div>
              </div>

            </div>

            {/* Footer Note */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-tech text-slate-400">
              <span className="text-[#00ff66]">
                دیدار سوپر فینال قهرمانان • روز چهارشنبه
              </span>
              <span className="text-amber-300 font-bold">
                ساعت برگزاری: توافقی بین دو تیم
              </span>
            </div>
          </div>
        </div>

        {/* 2. PLAYOFFS & GRAND FINAL BRACKET */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-[#00ff66]" />
              <h3 className="font-esports font-bold text-xl sm:text-2xl text-white tracking-wider uppercase">
                PLAYOFFS & GRAND FINAL • مرحله حذفی و فینال
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#05110a] border border-[#00ff66]/30 text-xs font-tech text-[#00ff66] font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>شروع از ساعت ۱۱ و بازی نهایی پس از اتمام بازی اول</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            
            {/* Match 1: AdabFC vs ParsLegion */}
            <div className="panel-doomsday panel-corner-accents rounded-sm p-5 border border-[#00ff66]/40 flex flex-col justify-between bg-[#05120a] relative overflow-hidden group hover:border-[#00ff66] transition-all">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-4 text-xs font-tech">
                  <span className="px-2 py-0.5 rounded bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 font-bold">
                    نیمه‌نهایی ۱
                  </span>
                  <span className="text-[#00ff66] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ساعت ۱۱:۰۰
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Home */}
                  <div
                    onClick={() => handleTeamClickByName('FC ADAB')}
                    className="flex items-center justify-between p-3 rounded bg-[#030805] border border-white/10 hover:border-[#00ff66] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-[#071f11] border border-[#00ff66] flex items-center justify-center font-esports font-bold text-xs text-[#00ff66]">
                        ADB
                      </div>
                      <span className="font-esports font-bold text-lg text-white">
                        AdabFC
                      </span>
                    </div>
                    <span className="text-[10px] font-tech text-slate-400">تیم ۱</span>
                  </div>

                  {/* Away */}
                  <div
                    onClick={() => handleTeamClickByName('PARS LEGION')}
                    className="flex items-center justify-between p-3 rounded bg-[#030805] border border-white/10 hover:border-[#00ff66] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-[#071f11] border border-[#00ff66] flex items-center justify-center font-esports font-bold text-xs text-[#00ff66]">
                        PRS
                      </div>
                      <span className="font-esports font-bold text-lg text-white">
                        ParsLegion
                      </span>
                    </div>
                    <span className="text-[10px] font-tech text-slate-400">تیم ۲</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-tech text-slate-400">
                <span>روز چهارشنبه</span>
                <span className="text-[#00ff66] font-bold">شروع از ساعت ۱۱:۰۰</span>
              </div>
            </div>

            {/* Match 2: Tehran Legacy vs ZNG BZN 110 */}
            <div className="panel-doomsday panel-corner-accents rounded-sm p-5 border border-[#00ff66]/40 flex flex-col justify-between bg-[#05120a] relative overflow-hidden group hover:border-[#00ff66] transition-all">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-4 text-xs font-tech">
                  <span className="px-2 py-0.5 rounded bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 font-bold">
                    نیمه‌نهایی ۲
                  </span>
                  <span className="text-[#00ff66] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ساعت ۱۱:۰۰
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Home */}
                  <div
                    onClick={() => handleTeamClickByName('TEHRAN LEGACY')}
                    className="flex items-center justify-between p-3 rounded bg-[#030805] border border-white/10 hover:border-[#00ff66] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-[#071f11] border border-[#00ff66] flex items-center justify-center font-esports font-bold text-xs text-[#00ff66]">
                        TLG
                      </div>
                      <span className="font-esports font-bold text-lg text-white">
                        Tehran Legacy
                      </span>
                    </div>
                    <span className="text-[10px] font-tech text-slate-400">تیم ۱</span>
                  </div>

                  {/* Away */}
                  <div
                    onClick={() => handleTeamClickByName('110')}
                    className="flex items-center justify-between p-3 rounded bg-[#030805] border border-white/10 hover:border-[#00ff66] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-[#071f11] border border-[#00ff66] flex items-center justify-center font-esports font-bold text-xs text-[#00ff66]">
                        110
                      </div>
                      <span className="font-esports font-bold text-lg text-white">
                        ZNG BZN 110
                      </span>
                    </div>
                    <span className="text-[10px] font-tech text-slate-400">تیم ۲</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-tech text-slate-400">
                <span>روز چهارشنبه</span>
                <span className="text-[#00ff66] font-bold">شروع از ساعت ۱۱:۰۰</span>
              </div>
            </div>

            {/* Match 3: GRAND FINAL (بازی نهایی) */}
            <div className="panel-doomsday panel-corner-accents rounded-sm p-5 border-2 border-amber-400/50 flex flex-col justify-between bg-gradient-to-b from-[#141208] via-[#0a0f07] to-[#05110a] relative overflow-hidden shadow-[0_0_25px_rgba(251,191,36,0.15)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-4 text-xs font-tech">
                  <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    بازی نهایی پلی‌آف
                  </span>
                  <span className="text-amber-300 font-bold">
                    GRAND FINAL
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded bg-[#050e07] border border-amber-400/20">
                    <span className="text-[10px] font-tech text-slate-400 block mb-0.5">فینالیست اول:</span>
                    <span className="font-esports font-bold text-base text-amber-200">
                      برنده AdabFC / ParsLegion
                    </span>
                  </div>

                  <div className="p-3 rounded bg-[#050e07] border border-amber-400/20">
                    <span className="text-[10px] font-tech text-slate-400 block mb-0.5">فینالیست دوم:</span>
                    <span className="font-esports font-bold text-base text-amber-200">
                      برنده Tehran Legacy / 110
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-amber-400/20 flex flex-col gap-1 text-xs font-tech">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    زمان برگزاری:
                  </span>
                  <span>پس از اتمام بازی اول</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  دیدار فینال بلافاصله پس از پایان بازی‌های اول برگزار می‌گردد
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 3. ARCHIVED GROUP STAGE STANDINGS (COLLAPSIBLE) */}
        <div className="border-t border-white/10 pt-8">
          <button
            type="button"
            onClick={() => setShowArchive(!showArchive)}
            className="w-full flex items-center justify-between p-4 rounded-sm bg-[#05110a] border border-white/10 hover:border-[#00ff66]/40 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#00ff66]" />
              <div>
                <span className="font-esports font-bold text-base sm:text-lg text-white block">
                  آرشیو جدول رده‌بندی مرحله گروهی (پایان یافته)
                </span>
                <span className="text-xs font-tech text-slate-400">
                  جهت مشاهده امتیازات و تفاضل گل مسابقات گذشته کلیک کنید
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#00ff66] text-xs font-tech font-bold">
              <span>{showArchive ? 'بستن آرشیو' : 'مشاهده جدول آرشیو'}</span>
              {showArchive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          <AnimatePresence>
            {showArchive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-4"
              >
                {/* Group Switcher Tabs */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveArchiveGroup('A')}
                    className={`px-4 py-2 rounded-sm font-tech text-xs font-bold transition-all cursor-pointer ${
                      activeArchiveGroup === 'A'
                        ? 'bg-[#00ff66] text-black font-extrabold shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                        : 'bg-[#050b08] text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    جدول آرشیو لیگ ۱ (LEAGUE 1)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveArchiveGroup('B')}
                    className={`px-4 py-2 rounded-sm font-tech text-xs font-bold transition-all cursor-pointer ${
                      activeArchiveGroup === 'B'
                        ? 'bg-[#00ff66] text-black font-extrabold shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                        : 'bg-[#050b08] text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    جدول آرشیو لیگ ۲ (LEAGUE 2)
                  </button>
                </div>

                <div className="panel-doomsday panel-corner-accents rounded-sm overflow-hidden border border-white/10">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[540px]">
                      <thead>
                        <tr className="border-b border-white/10 bg-[#040806] text-[12px] font-tech font-bold text-[#00ff66] uppercase tracking-wider">
                          <th className="py-3 px-4 w-16 text-center">#</th>
                          <th className="py-3 px-4">تیم • TEAM</th>
                          <th className="py-3 px-4 text-center">بازی • P</th>
                          <th className="py-3 px-4 text-center">تفاضل • GD</th>
                          <th className="py-3 px-4 text-right">امتیاز • PTS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-condensed">
                        {currentArchiveTeams.map((team, idx) => {
                          const goalDiff = team.goalsFor - team.goalsAgainst;
                          return (
                            <tr
                              key={team.id}
                              onClick={() => onSelectTeam(team)}
                              className="hover:bg-white/[0.03] transition-colors cursor-pointer"
                            >
                              <td className="py-3 px-4 text-center font-tech font-bold text-slate-400 text-sm">
                                {idx + 1}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2.5">
                                  <span className="text-xs font-esports font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                                    {team.shortCode}
                                  </span>
                                  <span className="font-bold text-sm text-white">
                                    {team.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-center font-tech text-slate-300 text-sm">
                                {team.played}
                              </td>
                              <td className="py-3 px-4 text-center font-tech text-sm">
                                <span className={goalDiff > 0 ? 'text-[#00ff66] font-bold' : goalDiff < 0 ? 'text-red-400 font-bold' : 'text-slate-400'}>
                                  {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right font-esports font-black text-lg text-white">
                                {team.points}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

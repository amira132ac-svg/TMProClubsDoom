import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Activity, Flag, Calendar, Award } from 'lucide-react';
import { TournamentTeam } from '../types';
import { TELEGRAM_CHANNEL_URL, TELEGRAM_CHANNEL_HANDLE } from '../data/tournamentData';

interface TeamModalProps {
  team: TournamentTeam | null;
  onClose: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ team, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (team) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [team, onClose]);

  const recentMatches = team?.recentMatches || [];
  const form = team?.form || [];
  const goalDiff = team ? team.goalsFor - team.goalsAgainst : 0;

  return (
    <AnimatePresence>
      {team && (
        <div
          id="team-profile-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Dark Translucent Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Container Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.93,
              y: 16,
              transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-[#060c08] border border-[#00ff66]/50 rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(0,255,102,0.15)] z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#00ff66] to-transparent" />

            {/* Header Bar */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#040806]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#0a1e12] border border-[#00ff66]/60 flex flex-col items-center justify-center text-[#00ff66] shadow-[0_0_12px_rgba(0,255,102,0.25)]">
                  <span className="text-[9px] font-tech text-slate-400 leading-none">RANK</span>
                  <span className="font-esports font-black text-base text-[#00ff66] leading-none mt-0.5">
                    {team.rank}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-tech text-[#00ff66] tracking-[0.2em] uppercase font-bold">
                      {team.group === 'A' ? 'LEAGUE 1 • لیگ ۱' : 'LEAGUE 2 • لیگ ۲'}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[10px] font-tech text-slate-400 uppercase">
                      SEED #{team.seed}
                    </span>
                    {team.shortCode && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-slate-300">
                        {team.shortCode}
                      </span>
                    )}
                  </div>
                  <h3 className="font-esports font-black text-xl sm:text-2xl text-white tracking-wider leading-tight mt-0.5">
                    {team.name}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg border border-white/10 hover:border-[#00ff66] text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="بستن"
                title="بستن پنجره"
              >
                <X className="w-5 h-5 text-slate-300 hover:text-[#00ff66]" />
              </motion.button>
            </div>

            {/* Modal Body with smooth scrolling */}
            <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-[#08130d] p-3 rounded border border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-tech text-slate-400 uppercase">بازی‌ها (PLAYED)</span>
                  <span className="font-esports font-bold text-2xl text-white mt-1">{team.played}</span>
                </div>
                <div className="bg-[#08130d] p-3 rounded border border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-tech text-slate-400 uppercase">برد / تساوی / باخت</span>
                  <span className="font-esports font-bold text-xl text-white mt-1">
                    <span className="text-[#00ff66]">{team.wins}</span>
                    <span className="text-slate-600 mx-1">/</span>
                    <span className="text-yellow-400">{team.draws}</span>
                    <span className="text-slate-600 mx-1">/</span>
                    <span className="text-red-400">{team.losses}</span>
                  </span>
                </div>
                <div className="bg-[#08130d] p-3 rounded border border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-tech text-slate-400 uppercase">تفاضل گل (GD)</span>
                  <span className={`font-esports font-bold text-2xl mt-1 ${
                    goalDiff > 0 ? 'text-[#00ff66]' : goalDiff < 0 ? 'text-red-400' : 'text-white'
                  }`}>
                    {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                  </span>
                </div>
                <div className="bg-[#0a2014] p-3 rounded border border-[#00ff66]/40 flex flex-col justify-between shadow-[0_0_15px_rgba(0,255,102,0.1)]">
                  <span className="text-[10px] font-tech text-[#00ff66] uppercase font-bold">امتیاز کل (PTS)</span>
                  <span className="font-esports font-black text-3xl text-[#00ff66] mt-0.5">{team.points}</span>
                </div>
              </div>

              {/* Team Details Strip: Country, Formed */}
              {(team.country || team.formedYear) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-[#040906] p-3 rounded border border-white/5">
                  {team.country && (
                    <div className="flex items-center gap-2 text-xs">
                      <Flag className="w-4 h-4 text-[#00ff66] shrink-0" />
                      <div>
                        <span className="text-[9px] font-tech text-slate-400 block uppercase">کشور / منطقه</span>
                        <span className="font-condensed font-bold text-white">{team.country}</span>
                      </div>
                    </div>
                  )}

                  {team.formedYear && (
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-4 h-4 text-[#00ff66] shrink-0" />
                      <div>
                        <span className="text-[9px] font-tech text-slate-400 block uppercase">سال تأسیس</span>
                        <span className="font-condensed font-bold text-white">{team.formedYear}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Recent Form Badges */}
              {form.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-[#00ff66]" />
                    <h4 className="font-tech text-xs font-bold uppercase tracking-wider text-slate-300">
                      فرم بازی‌های اخیر (FORM)
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {form.map((result, idx) => (
                      <span
                        key={idx}
                        className={`w-7 h-7 rounded font-tech font-bold text-xs flex items-center justify-center border ${
                          result === 'W'
                            ? 'bg-[#00ff66]/20 border-[#00ff66] text-[#00ff66]'
                            : result === 'D'
                            ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                            : 'bg-red-500/20 border-red-500 text-red-400'
                        }`}
                        title={result === 'W' ? 'برد' : result === 'D' ? 'مساوی' : 'باخت'}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Recorded Matches */}
              {recentMatches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-[#00ff66]" />
                    <h4 className="font-tech text-xs font-bold uppercase tracking-wider text-slate-200">
                      مسابقات ثبت‌شده اخیر
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {recentMatches.map((match, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded bg-[#040806] border border-white/5 text-xs font-tech"
                      >
                        <span className="text-slate-300">مقابل {match.opponent}</span>
                        <span className="font-mono font-bold text-white tracking-widest px-2 py-0.5 rounded bg-white/5">
                          {match.score}
                        </span>
                        <span
                          className={`text-xs font-tech font-bold px-2.5 py-0.5 rounded ${
                            match.result === 'W'
                              ? 'bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30'
                              : match.result === 'D'
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                              : 'bg-red-500/10 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {match.result === 'W' ? 'برد' : match.result === 'D' ? 'مساوی' : 'باخت'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="px-5 sm:px-6 py-3 border-t border-white/10 bg-[#040806] flex items-center justify-between text-xs font-tech text-slate-400">
              <span>TM PROCLUBS DOOMSDAY DATABASE</span>
              <a
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ff66] hover:underline font-bold"
              >
                {TELEGRAM_CHANNEL_HANDLE}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

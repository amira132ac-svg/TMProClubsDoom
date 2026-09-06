import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Activity } from 'lucide-react';
import { TournamentTeam } from '../types';

interface TeamModalProps {
  team: TournamentTeam | null;
  onClose: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ team, onClose }) => {
  return (
    <AnimatePresence>
      {team && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Dark Translucent Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 18,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#060c08] border border-[#00ff66]/50 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.95)] z-10 overflow-hidden panel-corner-accents"
          >
            {/* Top Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#040806]/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-[#0a1e12] border border-[#00ff66]/60 flex items-center justify-center text-[#00ff66] font-tech font-bold text-sm">
                  {team.rank}
                </div>
                <div>
                  <span className="text-[10px] font-tech text-[#00ff66] tracking-[0.25em] uppercase block">
                    LEAGUE {team.group === 'A' ? '1' : '2'} • SEED #{team.seed}
                  </span>
                  <h3 className="font-esports font-black text-2xl sm:text-3xl text-white tracking-wider leading-none">
                    {team.name}
                  </h3>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                type="button"
                onClick={onClose}
                className="p-2 rounded border border-white/10 hover:border-[#00ff66] text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Overview Hero Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#08130d] p-3 rounded-sm border border-white/5">
                  <span className="text-[10px] font-tech text-slate-400 uppercase block">MATCHES PLAYED</span>
                  <span className="font-esports font-bold text-2xl text-white">{team.played}</span>
                </div>
                <div className="bg-[#08130d] p-3 rounded-sm border border-white/5">
                  <span className="text-[10px] font-tech text-[#00ff66] uppercase block">WINS / DRAWS / LOSSES</span>
                  <span className="font-esports font-bold text-2xl text-white">
                    {team.wins} <span className="text-slate-500 font-normal">/</span> {team.draws} <span className="text-slate-500 font-normal">/</span> {team.losses}
                  </span>
                </div>
                <div className="bg-[#08130d] p-3 rounded-sm border border-white/5">
                  <span className="text-[10px] font-tech text-slate-400 uppercase block">GOAL DIFFERENCE</span>
                  <span className="font-esports font-bold text-2xl text-white">
                    {team.goalsFor - team.goalsAgainst > 0 ? `+${team.goalsFor - team.goalsAgainst}` : team.goalsFor - team.goalsAgainst}
                  </span>
                </div>
                <div className="bg-[#08130d] p-3 rounded-sm border border-[#00ff66]/30 bg-[#00ff66]/05">
                  <span className="text-[10px] font-tech text-[#00ff66] uppercase block">TOTAL POINTS</span>
                  <span className="font-esports font-black text-3xl text-[#00ff66]">{team.points}</span>
                </div>
              </div>

              {/* Roster / Key Lineup */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-[#00ff66]" />
                  <h4 className="font-tech text-sm font-bold uppercase tracking-wider text-slate-200">
                    SQUAD ROSTER & ACTIVE LINEUP ({team.players.length} PLAYERS)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {team.players.map((player) => (
                    <motion.div
                      key={player.id}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                      className="flex items-center justify-between p-2.5 rounded-sm bg-[#040806] border border-white/5 hover:border-[#00ff66]/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-sm bg-[#0a1e12] border border-white/10 flex items-center justify-center font-tech font-bold text-xs text-[#00ff66]">
                          {player.number}
                        </span>
                        <div>
                          <span className="font-condensed font-bold text-sm text-white block leading-tight">
                            {player.name}
                          </span>
                          <span className="text-[10px] font-tech text-slate-400">
                            {player.role || 'Player'}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-tech font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                        {player.position}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Match Log */}
              {team.recentMatches && team.recentMatches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-[#00ff66]" />
                    <h4 className="font-tech text-sm font-bold uppercase tracking-wider text-slate-200">
                      RECENT FORM & RECORDED MATCHES
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {team.recentMatches.map((match, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-sm bg-[#040806] border border-white/5 text-xs font-tech"
                      >
                        <span className="text-slate-400">VS {match.opponent}</span>
                        <span className="font-mono font-bold text-white tracking-widest">
                          {match.score}
                        </span>
                        <span
                          className={`text-xs font-tech font-bold px-2 py-0.5 rounded ${
                            match.result === 'W'
                              ? 'bg-[#00ff66]/10 text-[#00ff66]'
                              : match.result === 'D'
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {match.result === 'W' ? 'VICTORY' : match.result === 'D' ? 'DRAW' : 'DEFEAT'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer info */}
            <div className="px-6 py-3 border-t border-white/10 bg-[#040806] flex items-center justify-between text-xs font-tech text-slate-400">
              <span>TM PROCLUBS DOOMSDAY DATABASE</span>
              <a
                href="https://t.me/TM_Proclubs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ff66] hover:underline"
              >
                @TM_Proclubs
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

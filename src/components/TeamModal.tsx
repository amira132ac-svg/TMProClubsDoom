import React from 'react';
import { X, Shield, Activity } from 'lucide-react';
import { TournamentTeam } from '../types';

interface TeamModalProps {
  team: TournamentTeam | null;
  onClose: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ team, onClose }) => {
  if (!team) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Translucent Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#060c08] border border-[#00ff66]/50 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.95)] z-10 overflow-hidden panel-corner-accents">
        
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

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded border border-white/10 hover:border-[#00ff66] text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
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
            <div className="bg-[#08130d] p-3 rounded-sm border border-[#00ff66]/30">
              <span className="text-[10px] font-tech text-[#00ff66] uppercase block">TOTAL POINTS</span>
              <span className="font-esports font-bold text-2xl text-[#00ff66]">{team.points} PTS</span>
            </div>
          </div>

          {/* Group Seed & Status Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-sm bg-[#050e09] border border-[#00ff66]/20">
            <div>
              <span className="text-[10px] font-tech text-slate-400 uppercase tracking-widest block">SEED & DIVISION</span>
              <span className="font-condensed font-bold text-lg text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00ff66]" />
                LEAGUE {team.group === 'A' ? '1' : '2'} • SEED #{team.seed}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-tech text-slate-400 uppercase tracking-widest block mb-1">
                RECENT FORM
              </span>
              <div className="flex items-center gap-1.5">
                {team.form && team.form.length > 0 ? (
                  team.form.map((res, idx) => (
                    <span
                      key={idx}
                      className={`w-6 h-6 flex items-center justify-center text-xs font-bold rounded-sm ${
                        res === 'W'
                          ? 'bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/50'
                          : res === 'D'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {res}
                    </span>
                  ))
                ) : (
                  <span className="text-xs font-tech text-[#00ff66] font-bold px-2 py-0.5 rounded bg-[#00ff66]/10 border border-[#00ff66]/30">
                    AWAITING KICKOFF
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Pre-season Fixture Notice when no matches have taken place */}
          {(!team.recentMatches || team.recentMatches.length === 0) && (
            <div className="p-4 rounded-sm bg-[#050e09] border border-white/5 flex items-center justify-between gap-3 text-xs font-tech">
              <span className="text-slate-400">
                MATCH FIXTURES: Round 1 schedule and kickoff broadcast will be announced on Telegram.
              </span>
              <a
                href="https://t.me/TM_Proclubs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ff66] font-bold hover:underline shrink-0"
              >
                @TM_Proclubs
              </a>
            </div>
          )}

          {/* Recent Match History */}
          {team.recentMatches && team.recentMatches.length > 0 && (
            <div>
              <h4 className="font-condensed font-bold text-base text-slate-200 tracking-wider mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00ff66]" />
                STAGE RESULTS
              </h4>
              <div className="space-y-2">
                {team.recentMatches.map((match, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-2.5 bg-[#050a07] border border-white/5 rounded-sm"
                  >
                    <span className="font-condensed font-semibold text-sm text-slate-300">
                      vs {match.opponent}
                    </span>
                    <span className="font-esports font-bold text-lg text-white tracking-wider">
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
      </div>
    </div>
  );
};

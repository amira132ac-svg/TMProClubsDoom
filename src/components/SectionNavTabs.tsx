import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Swords, Sparkles, Users } from 'lucide-react';

export type TournamentTab = 'standings' | 'matches' | 'stats' | 'teams';

interface SectionNavTabsProps {
  activeTab: TournamentTab;
  onSelectTab: (tab: TournamentTab) => void;
}

export const SectionNavTabs: React.FC<SectionNavTabsProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs: {
    id: TournamentTab;
    label: string;
    sublabel: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'standings',
      label: 'STANDINGS',
      sublabel: 'جدول رده‌بندی',
      badge: 'LEAGUE 1 & 2',
      icon: Trophy,
    },
    {
      id: 'matches',
      label: 'MATCHES',
      sublabel: 'برنامه و نتایج',
      badge: 'FIXTURES',
      icon: Swords,
    },
    {
      id: 'stats',
      label: 'STATS',
      sublabel: 'آمار بازیکنان',
      badge: 'TOP PLAYERS',
      icon: Sparkles,
    },
    {
      id: 'teams',
      label: 'TEAMS',
      sublabel: 'تیم‌ها و روستر',
      badge: '16 SQUADS',
      icon: Users,
    },
  ];

  return (
    <div
      id="tournament-hub"
      className="sticky top-[58px] sm:top-[66px] z-40 py-2.5 sm:py-3.5 px-3 sm:px-6 bg-[#030604]/90 backdrop-blur-2xl border-y border-[#00ff66]/20 shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Modern Segmented Capsule Dock */}
        <div className="relative p-1.5 sm:p-2 rounded-2xl bg-[#07120a]/95 border border-[#00ff66]/30 shadow-[0_0_30px_rgba(0,255,102,0.12)] grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`relative z-10 flex items-center justify-center sm:justify-start gap-2.5 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors duration-200 cursor-pointer select-none group text-left ${
                  isActive ? 'text-black' : 'text-slate-300 hover:text-white'
                }`}
              >
                {/* Active Sliding Glowing Pill Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-[#00ff66] rounded-xl shadow-[0_0_25px_rgba(0,255,102,0.55)] -z-10"
                  />
                )}

                {/* Tab Icon */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isActive
                      ? 'bg-black/15 text-black scale-105'
                      : 'bg-white/5 border border-white/10 text-[#00ff66] group-hover:scale-110 group-hover:bg-[#00ff66]/15'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Tab Titles */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-esports font-black text-xs sm:text-sm tracking-wider uppercase truncate leading-none ${
                        isActive ? 'text-black font-extrabold' : 'text-white'
                      }`}
                    >
                      {tab.label}
                    </span>
                    <span
                      className={`hidden lg:inline-block text-[8px] font-tech font-bold px-1.5 py-0.2 rounded leading-none ${
                        isActive
                          ? 'bg-black/20 text-black'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </div>
                  <span
                    className={`font-condensed text-[10px] sm:text-[11px] truncate mt-0.5 leading-none ${
                      isActive ? 'text-black/80 font-bold' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    {tab.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

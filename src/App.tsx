import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SectionNavTabs, TournamentTab } from './components/SectionNavTabs';
import { TwoTeamTables } from './components/TwoTeamTables';
import { MatchesSection } from './components/MatchesSection';
import { StandingsSection } from './components/StandingsSection';
import { StatsSection } from './components/StatsSection';
import { Footer } from './components/Footer';
import { TeamModal } from './components/TeamModal';
import { TournamentRadio } from './components/TournamentRadio';
import { ALL_TEAMS } from './data/tournamentData';
import { TournamentTeam } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTab, setActiveTab] = useState<TournamentTab>('standings');
  const [selectedTeam, setSelectedTeam] = useState<TournamentTeam | null>(null);

  // Scroll to section handler
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    if (['standings', 'matches', 'stats', 'teams'].includes(sectionId)) {
      setActiveTab(sectionId as TournamentTab);
      setActiveSection(sectionId);
      
      setTimeout(() => {
        const hub = document.getElementById('tournament-hub');
        if (hub) {
          const yOffset = -70;
          const y = hub.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleTabSelect = (tab: TournamentTab) => {
    setActiveTab(tab);
    setActiveSection(tab);
    const hub = document.getElementById('tournament-hub');
    if (hub) {
      const yOffset = -70;
      const y = hub.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Find team by name and open modal
  const handleSelectTeamByName = (teamName: string) => {
    const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const target = clean(teamName);
    const found = ALL_TEAMS.find((t) => {
      const teamClean = clean(t.name);
      return teamClean === target || teamClean.includes(target) || target.includes(teamClean);
    });
    if (found) {
      setSelectedTeam(found);
    }
  };

  // ScrollSpy to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const hub = document.getElementById('tournament-hub');
      if (hub) {
        if (scrollPosition < hub.offsetTop - 180) {
          setActiveSection('home');
        } else {
          setActiveSection(activeTab);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#030504] text-slate-100 flex flex-col selection:bg-[#00ff66] selection:text-black relative overflow-x-hidden font-['Rajdhani',sans-serif]">
      
      {/* 1. Global Atmospheric Green Fog & Lighting Layers */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Deep ambient dark radial background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-radial-doom opacity-40 blur-3xl" />
        
        {/* Subtle diagonal scratches & grunge texture across the entire page */}
        <div className="absolute inset-0 bg-doomsday-scratches opacity-30" />
        
        {/* Industrial fine grid lines */}
        <div className="absolute inset-0 bg-industrial-grid opacity-15" />
      </div>

      {/* 2. Fixed Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        liveMatchCount={0}
      />

      {/* 3. Main Content Sections */}
      <main className="flex-1 relative z-10">
        
        {/* HERO SECTION */}
        <HeroSection
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
        />

        {/* SECTION NAVIGATION BUTTONS (TAB HUB) */}
        <SectionNavTabs
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
        />

        {/* TABBED CONTENT DISPLAY */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {activeTab === 'standings' && (
              <StandingsSection onSelectTeam={(team) => setSelectedTeam(team)} />
            )}
            {activeTab === 'matches' && (
              <MatchesSection onSelectTeamByName={handleSelectTeamByName} />
            )}
            {activeTab === 'stats' && (
              <StatsSection onSelectTeamByName={handleSelectTeamByName} />
            )}
            {activeTab === 'teams' && (
              <TwoTeamTables onSelectTeam={(team) => setSelectedTeam(team)} />
            )}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* 4. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Team Profile Modal */}
      <TeamModal
        team={selectedTeam}
        onClose={() => setSelectedTeam(null)}
      />

      {/* 6. Floating Bottom-Right Radio Tm */}
      <TournamentRadio />

    </div>
  );
}

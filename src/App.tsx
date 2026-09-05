import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TwoTeamTables } from './components/TwoTeamTables';
import { MatchesSection } from './components/MatchesSection';
import { StandingsSection } from './components/StandingsSection';
import { StatsSection } from './components/StatsSection';
import { Footer } from './components/Footer';
import { TeamModal } from './components/TeamModal';
import { ALL_TEAMS } from './data/tournamentData';
import { TournamentTeam } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTeam, setSelectedTeam] = useState<TournamentTeam | null>(null);

  // Scroll to section handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
    const sections = ['home', 'standings', 'matches', 'stats', 'teams'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          onViewStandings={() => handleNavigate('standings')}
          onViewMatches={() => handleNavigate('matches')}
        />

        {/* STANDINGS TABLE (LEAGUE 1 & LEAGUE 2) */}
        <StandingsSection
          onSelectTeam={(team) => setSelectedTeam(team)}
        />

        {/* DOOMSDAY MATCH CENTER (FIXTURES & RESULTS) */}
        <MatchesSection
          onSelectTeamByName={handleSelectTeamByName}
        />

        {/* PLAYER STATS (GOALS & ASSISTS) */}
        <StatsSection
          onSelectTeamByName={handleSelectTeamByName}
        />

        {/* TOURNAMENT TEAMS & ROSTERS (AT THE VERY BOTTOM) */}
        <TwoTeamTables
          onSelectTeam={(team) => setSelectedTeam(team)}
        />

      </main>

      {/* 4. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Team Profile Modal */}
      <TeamModal
        team={selectedTeam}
        onClose={() => setSelectedTeam(null)}
      />

    </div>
  );
}

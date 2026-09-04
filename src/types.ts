export interface TeamPlayer {
  name: string;
  position: 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'RW' | 'LW' | 'ST';
  number: number;
  isCaptain?: boolean;
}

export interface TournamentTeam {
  id: string;
  rank: string;
  name: string;
  group: 'A' | 'B';
  seed: number;
  shortCode: string;
  country: string;
  formedYear: string;
  captain: string;
  coach?: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
  roster: TeamPlayer[];
  recentMatches?: {
    opponent: string;
    score: string;
    result: 'W' | 'D' | 'L';
  }[];
}

export interface TournamentMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  group: 'A' | 'B' | 'PLAYOFF' | 'SUPERCUP';
  stage: string;
  date: string;
  time: string;
  minute?: string;
  arena: string;
  broadcastLive?: boolean;
}

export interface TournamentNews {
  id: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  snippet: string;
}

export interface PlayerStatItem {
  id: string;
  name: string;
  team: string;
  teamShortCode: string;
  goals: number;
  assists: number;
  matchesPlayed: number;
  cleanSheets?: number;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

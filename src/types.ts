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

export interface BestOfThreeGame {
  gameNumber: number;
  homeScore: number;
  awayScore: number;
  status: 'FINISHED' | 'UPCOMING' | 'NOT_NEEDED';
}

export interface TournamentMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  group: 'A' | 'B' | 'PLAYOFF' | 'SUPERCUP';
  league?: 'LEAGUE 1' | 'LEAGUE 2';
  stage: string;
  day?: string;
  date: string;
  time: string;
  timestamp?: number;
  minute?: string;
  arena: string;
  broadcastLive?: boolean;
  format?: 'BO3' | 'SINGLE';
  seriesScore?: { homeWins: number; awayWins: number };
  games?: BestOfThreeGame[];
  notes?: string;
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

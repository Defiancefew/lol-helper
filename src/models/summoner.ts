export interface ISummonerInfo {
  id: number;
  accountId: number;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface ISummonerLeague {
  queueType: string;
  hotStreak: boolean;
  wins: number;
  veteran: boolean;
  losses: number;
  playerOrTeamId: string;
  leagueName: string;
  playerOrTeamName: string;
  inactive: boolean;
  rank: string;
  freshBlood: boolean;
  leagueId: string;
  tier: string;
  leaguePoints: number;
}

export interface IMatch {
  lane: string;
  gameId: number;
  champion: number;
  platformId: string;
  timestamp: number;
  queue: number;
  role: string;
  season: number;
}

export interface ISingleMatch {
  seasonId: number;
  queueId: number;
  gameId: number;
  participantIdentities: IParticipantIdentities[];
  gameVersion: string;
  platformId: string;
  gameMode: string;
  mapId: number;
  gameType: string;
  teams: ITeams[];
  participants: IParticipants[];
  gameDuration: number;
  gameCreation: number;
}

export interface IParticipantIdentities {
  player: IPlayer;
  participantId: number;
}

interface ICsDiffPerMinDeltas {
  '0-10': number;
}

interface IPlayer {
  currentPlatformId: string;
  summonerName: string;
  matchHistoryUri: string;
  platformId: string;
  currentAccountId: number;
  profileIcon: number;
  summonerId: number;
  accountId: number;
}

interface ITimeline {
  lane: string;
  participantId: number;
  csDiffPerMinDeltas: ICsDiffPerMinDeltas;
  goldPerMinDeltas: ICsDiffPerMinDeltas;
  xpDiffPerMinDeltas: ICsDiffPerMinDeltas;
  creepsPerMinDeltas: ICsDiffPerMinDeltas;
  xpPerMinDeltas: ICsDiffPerMinDeltas;
  role: string;
  damageTakenDiffPerMinDeltas: ICsDiffPerMinDeltas;
  damageTakenPerMinDeltas: ICsDiffPerMinDeltas;
}

interface IParticipants {
  stats: any;
  spell1Id: number;
  participantId: number;
  highestAchievedSeasonTier: string;
  spell2Id: number;
  teamId: number;
  timeline: ITimeline;
  championId: number;
}

interface ITeams {
  firstDragon: boolean;
  bans: any[];
  firstInhibitor: boolean;
  win: string;
  firstRiftHerald: boolean;
  firstBaron: boolean;
  baronKills: number;
  riftHeraldKills: number;
  firstBlood: boolean;
  teamId: number;
  firstTower: boolean;
  vilemawKills: number;
  inhibitorKills: number;
  towerKills: number;
  dominionVictoryScore: number;
  dragonKills: number;
}

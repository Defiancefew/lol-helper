export const serverDomain = process.env.SERVER_DOMAIN || 'localhost';
export const serverPort = process.env.SERVER_PORT || '3000';
export const serverUrl = `http://${serverDomain}:${serverPort}/api`;

export const shardDataUrl = `${serverUrl}/status/v3/shard-data`;
export const summonerSearch = (id: string, type = 'id') => {
  const basicUrl = `/api/summoner/v3/summoners/`;
  return type === 'id' ? `${basicUrl}${id}` : `${basicUrl}by-${type}/${id}`;
};

const basicMatchUrl = `${serverUrl}/match/v3/`;

export const matchUrl = {
  byMatchId(matchId: string) {
    return `${basicMatchUrl}matches/${matchId}`;
  },
  matchLists(accountId: string, recent = false) {
    return `${basicMatchUrl}matchlists/by-account/${accountId}${recent && '/recent'}`;
  },
  matchTimeline(matchId: string) {
    return `${basicMatchUrl}timelines/by-match/${matchId}`;
  },
  byTournamentCode(tournamentCode: string, matchId = '') {
    return `${basicMatchUrl}${matchId && `${matchId}/`}by-tournament-code/${tournamentCode}`;
  },
};

const baseLeagueUrl = `${serverUrl}/league/v3/`;

export const leagueUrl = {
  bySummonerId(summonerId: number) {
    return `${baseLeagueUrl}positions/by-summoner/${summonerId}`;
  },
};

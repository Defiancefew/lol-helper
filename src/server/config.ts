export const apiUrl = 'api.riotgames.com/lol/';
export const configUrl = (region: string, type: string) => `https://${region}.${apiUrl}${type}`;
export const dataDragonUrl = (version: string, type: string, url: string) =>
  `http://ddragon.leagueoflegends.com/cdn/${version}/${type}/${url}`;
export const dataDragonVersion = '6.24.1';

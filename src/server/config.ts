export const apiUrl = 'api.riotgames.com/lol/';
export const configUrl = (region: string, type: string) => `https://${region}.${apiUrl}${type}`;

export const serverDomain = process.env.SERVER_DOMAIN || 'localhost';
export const serverPort = process.env.SERVER_PORT || '3000';
export const serverUrl = `http://${serverDomain}:${serverPort}/api`;

export const shardDataUrl = `${serverUrl}/status/v3/shard-data`;

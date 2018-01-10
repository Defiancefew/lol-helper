export interface IItemSetRoot {
  title: string;
  type: 'custom' | 'global';
  map: 'any' | 'SR' | 'SR' | 'HA' | 'TT' | 'CS';
  mode: 'any' | 'CLASSIC' | 'ARAM' | 'ODIN';
  priority?: boolean;
  sortrank?: number;
  blocks: IItemSetBlock[];
}

export interface IItemSetBlock {
  type: string;
  recMath?: boolean;
  minSummonerLevel?: number;
  maxSummonerLevel?: number;
  showIfSummonerSpell?: string;
  hideIfSummonerSpell?: string;
  items: IItemSetItem[];
}

export interface IItemSetItem {
  id: string;
  count?: number;
}

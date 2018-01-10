export interface IBackgroundStyleType {
  type: 'champions' | 'masteries' | 'profile-icons' | 'runes' | 'tier-icons';
  sprite: string;
  x: string;
  y: string;
}

export interface IImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

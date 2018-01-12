export type pathName =
  | 'precision'
  | 'domination'
  | 'sorcery'
  | 'resolve'
  | 'inspiration'
  | 'Precision'
  | 'Domination'
  | 'Sorcery'
  | 'Resolve'
  | 'Inspiration';

export interface IRuneData {
  id: number;
  key: string;
  name: pathName;
  icon: string;
  slots: ISlots[];
}

export interface ISlots {
  runes: IRunes[];
}

export interface IRunes {
  id: number;
  key: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
}

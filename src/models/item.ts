import { IImage } from './sprite';

interface IGold {
  base: number;
  purchasable: boolean;
  total: number;
  sell: number;
}

export interface IItem {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  into: string[];
  image: IImage;
  gold: IGold;
  tags: string[];
  maps: {
    [key: number]: boolean;
  };
  stats: {
    [key: string]: number;
  };
}

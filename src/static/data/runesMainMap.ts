import _ from 'lodash';
import { IRuneData, pathName } from 'models';

// This is needed to provide proper ordering in render
export const mainPaths = [
  {
    title: 'precision',
    id: 8000,
    slogan: 'Become a legend',
    description: 'Improved attacks and sustained damage',
    secondaryPerk: '+18% Attack Speed',
  },
  {
    title: 'domination',
    id: 8100,
    slogan: 'Hunt and eliminate prey',
    description: 'Burst damage and target access',
    secondaryPerk: '+11 Attack Damage or +18 Ability Power, Adaptive',
  },
  {
    title: 'sorcery',
    id: 8200,
    slogan: 'Unleash destruction',
    description: 'Empowered abilities and resource manipulation',
    secondaryPerk: '+15 Attack Damage or +25 Ability Power, Adaptive',
  },
  {
    title: 'resolve',
    slogan: 'Live forever',
    id: 8400,
    description: 'Durability and crowd control',
    secondaryPerk: '+ 130 health',
  },
  {
    title: 'inspiration',
    id: 8300,
    slogan: 'Outwit mere mortals',
    description: 'Creative tools and rule bending',
    secondaryPerk: '+20% Potion and Elixir Duration +20% Attack Speed',
  },
];

export const slotWithoutDesc = [
  'Keystone',
  'Greater Rune',
  'Select Rune',
  'Select Rune',
  'Select your secondary path above to choose runes',
  'Select your secondary path above to choose runes',
];

// since static api provides array of paths we can avoid searching of needed chunk everytime
export const getRuneByName = (staticData: IRuneData[], name: pathName | number): IRuneData => {
  switch (name) {
    case 'precision':
    case 8000:
      return staticData[2];
    case 'domination':
    case 8100:
      return staticData[0];
    case 'sorcery':
    case 8200:
      return staticData[4];
    case 'resolve':
    case 8400:
      return staticData[3];
    case 'inspiration':
    case 8300:
      return staticData[1];
  }
};

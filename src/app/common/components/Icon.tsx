import React from 'react';
import styled from 'styled-components';
import { backgroundStyle } from 'utils';
import _ from 'lodash';
import * as iconData from 'static';

export interface IIconProps {
  ref?: any;
  id: string | number;
  type: 'champion' | 'item' | 'spell' | 'profileicon' | 'summoner';
  tooltip?: boolean;

  onClick?(...args: any[]): void;
}

const findSpritePath = (type: string, id: string | number) => {
  if (_.includes(['champion', 'summoner'], type)) {
    return `[${type}].data[${type === 'champion' ? iconData.championMap[id] : iconData.summonerMap[id]}]`;
  }

  return `[${type}].data[${id}]`;
};

export const Icon: React.SFC<IIconProps> = ({ type, id, onClick }) => {
  const spriteData = _.get(iconData, findSpritePath(type, id), {
    image: {
      type: 'profileicon',
      sprite: 'profileicon0.png',
      id: '0',
      x: '0',
      y: '0',
    },
  });

  return <StyledIcon onClick={onClick} background={backgroundStyle(spriteData.image)} />;
};

export const StyledIcon = styled.div`
  display: block;
  width: 48px;
  height: 48px;
  background: ${(props: { background: string }) => props.background};
`;

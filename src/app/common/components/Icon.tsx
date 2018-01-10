import React from 'react';
import styled from 'styled-components';
import { backgroundStyle, parseItemTags } from 'utils';
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

export const chooseDescription = (type: string, spriteData: any): string | JSX.Element => {
  const description = _.get(spriteData, 'description', null);
  const name = _.get(spriteData, 'name', null);

  if (type === 'item') {
    const parsedDescription = type === 'item' && description ? { __html: parseItemTags(description) } : null;
    return (
      <span>
        <div>{name}</div>
        <span dangerouslySetInnerHTML={parsedDescription} />
      </span>
    );
  }

  if (type === 'champion') {
    return name;
  }

  return description;
};

export const Icon: React.SFC<IIconProps> = ({ type, id, onClick }) => {
  const nullDesc = {
    image: {
      type: 'profileicon',
      sprite: 'profileicon0.png',
      id: '0',
      x: '0',
      y: '0',
    },
  };
  const spriteData = _.get(iconData, findSpritePath(type, id), nullDesc);

  // TODO: Perform more clear check for null description
  return (
    <IconWrapper>
      {spriteData !== nullDesc && (
        <StyledDescription type={type}>{chooseDescription(type, spriteData)}</StyledDescription>
      )}
      <StyledIcon onClick={onClick} background={backgroundStyle(spriteData.image)} />
    </IconWrapper>
  );
};

const StyledDescription: any = styled.div.attrs({
  style: ({ type }: any) => ({
    minWidth: (type === 'item' || type === 'summoner') && '300px',
  }),
})`
  display: none;
  z-index: 9999;
  padding: 10px;
  background: black;
  color: white;
  position: absolute;
  top: 48px;
  left: 48px;
  user-select: none;
  white-space: no-wrap;
`;

const StyledIcon: any = styled.div.attrs({
  style: (props: any) => ({
    background: props.background,
  }),
})`
  display: block;
  width: 48px;
  height: 48px;
`;

// :active is needed to avoid huge screen capture while dragging with description
const IconWrapper = styled.span`
  position: relative;
  &:hover ${StyledDescription} {
    display: block;
  }
  &:active ${StyledDescription} {
    display: none;
  }
`;

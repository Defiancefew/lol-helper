import React from 'react';
import styled from 'styled-components';
import { backgroundStyle } from 'utils';
import _ from 'lodash';

export interface IIconProps {
  ref?: any;
  id: string | number;
  type: 'champion' | 'item' | 'spell' | 'profileicon';
  tooltip?: boolean;

  onClick?(...args: any[]): void;
}

export const Icon: React.SFC<IIconProps> = ({ type, id }) => {
  const iconData = require(`static`);
  const spriteData = _.get(iconData, `[${type}].data[${id}]`, {});
  return <StyledIcon background={backgroundStyle(spriteData.image)} />;
};

export const StyledIcon = styled.div`
  display: block;
  width: 48px;
  height: 48px;
  background: ${(props: { background: string }) => props.background};
`;

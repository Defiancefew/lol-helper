import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';

const pathColor = (path: string) => {
  switch (path) {
    case 'precision':
      return 'orange';
    case 'domination':
      return 'red';
    case 'sorcery':
      return '#4D7AE5';
    case 'inspiration':
      return 'cornflowerblue';
    case 'resolve':
      return 'green';
  }
};

const OuterCircle: any = styled.svg`
  opacity: 0;
  width: ${({ isMain }: any) => (isMain ? '76px' : '60px')};
  height: ${({ isMain }: any) => (isMain ? '76px' : '60px')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s;
`;

const InnerCircle: any = styled.svg`
  width: 100%;
  height: 100%;
  position: relative;
  opacity: ${({ isMain, perkId }: any) => (isMain && perkId ? '0' : '1')};
  outline: 0;
`;

const IconButton: any = styled.button`
  margin: 5px;
  filter: ${({ inactive }: any) => (inactive ? 'grayscale(100%)' : 'none')};
  background: #1e2328;
  display: block;
  padding: 0;
  width: ${({ isMain }: any) => (isMain ? '64px' : '48px')};
  height: ${({ isMain }: any) => (isMain ? '64px' : '48px')};
  border: 0;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: relative;
  user-select: none;
  &:hover svg:nth-child(1) {
    opacity: 0.5;
  }
`;

// TODO: For main perks, that are not yet selected img size should be 82
const PerkImage: any = styled.img`
  width: ${({ isMain }: any) => (isMain ? '108px' : '46px')};
  height: ${({ isMain }: any) => (isMain ? '108px' : '46px')};
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export interface IRuneIconProps {
  path: string;
  isMain?: boolean;
  onClick?: any;
  perkId?: number | 'icon';
  inactive?: boolean;
}

export const RuneIcon: React.SFC<IRuneIconProps> = ({ path, onClick, perkId, isMain, inactive }) => {
  const lowerPath = path.toLowerCase();

  return (
    <IconButton onClick={onClick} isMain={isMain} inactive={inactive}>
      <OuterCircle viewBox="0 0 60 60" isMain={isMain}>
        <circle cx="30" cy="30" r="28.5" strokeWidth="3" fill="none" stroke={pathColor(lowerPath)} />
      </OuterCircle>
      {perkId && (
        <PerkImage isMain={isMain} src={`/static/img/runes/${lowerPath}/${isMain ? 'main/' : ''}${perkId}.png`} />
      )}
      <InnerCircle perkId={!!perkId} isMain={isMain} viewBox="0 0 47 47">
        <circle cx="23.5" cy="23.5" r="22.5" strokeWidth="2" fill="none" stroke={pathColor(lowerPath)} />
      </InnerCircle>
    </IconButton>
  );
};

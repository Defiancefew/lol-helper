import React from 'react';
import styled from 'styled-components';
import { ISlots, IRunes, pathName } from 'models';
import _ from 'lodash';
import { RuneIcon, SlotDescription } from './';

export interface IRuneLineProps extends ISlots {
  isMain?: boolean;
  path: pathName;
  slotIdx: number;
  slots: {
    [key: number]: number;
  };
  addRune(args: { slotIdx: number; runeId: number }): void;
}

export interface IRuneLineState {
  isOpen: boolean;
}

const LineWrapper = styled.div`
  margin: 30px 0;
  position: relative;
  display: flex;
`;

const RuneSelect: any = styled.div`
  position: absolute;
  left: ${({ isMain }: any) => (isMain ? '80px' : '70px')};
  min-width: 200px;
  height: 60px;
  display: flex;
  margin-left: 10px;
`;

// TODO: Replace arrow function
export class RuneLine extends React.Component<IRuneLineProps, IRuneLineState> {
  state = {
    isOpen: false,
  };

  toggleRuneLine = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  onAddRune = (runeInfo: { slotIdx: number; runeId: number }) => {
    this.toggleRuneLine();
    return this.props.addRune(runeInfo);
  };

  render() {
    const { runes, path, isMain, slotIdx, slots } = this.props;
    const { isOpen } = this.state;

    return (
      <LineWrapper>
        <RuneIcon onClick={this.toggleRuneLine} path={path} isMain={isMain} perkId={slots[slotIdx]} />
        <RuneSelect isMain={isMain}>
          {isOpen ? (
            _.map(runes, ({ id }: IRunes) => (
              <RuneIcon
                onClick={() => this.onAddRune({ slotIdx, runeId: id })}
                key={id}
                path={path}
                isMain={isMain}
                perkId={id}
              />
            ))
          ) : (
            <SlotDescription slotIdx={slotIdx} slots={slots} runes={runes} />
          )}
        </RuneSelect>
      </LineWrapper>
    );
  }
}

import React from 'react';
import styled from 'styled-components';
import { ISlots } from 'models';
import _ from 'lodash';
import { RuneIcon, SlotDescription, ArrayLine } from './';

const Array = styled.div`
  display: flex;
  align-items: center;
  height: 220px;
  margin-left: 15px;
`;

const Slots = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  & button {
    margin: 15px 10px;
  }
`;

const Descriptions = styled.span`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export interface IRuneArrayState {
  isOpen: boolean;
  currentSlot: number;
  primaryIdx: number | null;
  secondaryIdx: number | null;
}

export interface IRuneArrayProps {
  path: string;
  runeData: ISlots[];
  slots: {
    [key: number]: number;
  };
  addRune(runeData: { slotIdx: number; runeId: number }): void;
}

export class RuneArray extends React.Component<IRuneArrayProps, IRuneArrayState> {
  state: IRuneArrayState = {
    isOpen: false,
    currentSlot: 4,
    primaryIdx: null,
    secondaryIdx: null,
  };

  toggleRuneLine = (newState: any) => this.setState(prevState => ({ ...newState, isOpen: !prevState.isOpen }));

  onAddRune = ({ slotIdx, runeId, runeIdx }: { slotIdx: number; runeId: number; runeIdx: number }) => {
    const { currentSlot } = this.state;
    const newState = currentSlot === 4 ? { primaryIdx: runeIdx } : { secondaryIdx: runeIdx };
    this.toggleRuneLine(newState);
    return this.props.addRune({ slotIdx, runeId });
  };

  render() {
    const { path, slots, runeData } = this.props;
    const { isOpen, primaryIdx, secondaryIdx } = this.state;
    const getRuneData = (idx: number | null) => _.get(runeData, `[${idx}].runes`, null);

    return (
      <Array>
        <Slots>
          <RuneIcon onClick={() => this.toggleRuneLine({ currentSlot: 4 })} path={path} perkId={slots[4]} />
          <RuneIcon onClick={() => this.toggleRuneLine({ currentSlot: 5 })} path={path} perkId={slots[5]} />
        </Slots>
        <div>
          {isOpen ? (
            _.map(runeData, (slot: any, idx) => (
              <ArrayLine key={idx} onAddRune={this.onAddRune} slot={slot} idx={idx} {...this.state} {...this.props} />
            ))
          ) : (
            <Descriptions>
              <SlotDescription slotIdx={4} slots={slots} runes={getRuneData(primaryIdx)} />
              <SlotDescription slotIdx={5} slots={slots} runes={getRuneData(secondaryIdx)} />
            </Descriptions>
          )}
        </div>
      </Array>
    );
  }
}

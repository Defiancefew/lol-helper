import React from 'react';
import styled from 'styled-components';
import { ISlots, IRunes, pathName } from 'models';
import _ from 'lodash';
import { RuneIcon, SlotDescription } from './';

export interface IRuneArrayState {
  isOpen: boolean;
  runeSlot: number;
  primaryIdx: number;
  secondaryIdx: number;
}

const SlotLine = styled.div`
  display: flex;
  margin: 15px 0;
`;

const ArrayWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 220px;
  margin-left: 15px;
`;

const RuneSlots = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  & button {
    margin: 15px 10px;
  }
`;

const DescWrapper = styled.span`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export class RuneArray extends React.Component<any, IRuneArrayState> {
  state: IRuneArrayState = {
    isOpen: false,
    runeSlot: 4,
    primaryIdx: null,
    secondaryIdx: null,
  };

  toggleRuneLine = (newState: any) => this.setState(prevState => ({ ...newState, isOpen: !prevState.isOpen }));

  onAddRune = ({ slotIdx, runeId, runeIdx }: { slotIdx: number; runeId: number; runeIdx: number }) => {
    const { runeSlot } = this.state;
    const newState = runeSlot === 4 ? { primaryIdx: runeIdx } : { secondaryIdx: runeIdx };
    this.toggleRuneLine(newState);
    return this.props.addRune({ slotIdx, runeId });
  };

  renderArrayLine = (slot: any, idx: number) => {
    const { path, addRune, slots } = this.props;
    const { runeSlot } = this.state;
    const usedSlots = _.values(slots);
    const isRuneUsed = (id: number) => _.includes(usedSlots, id);
    const isSlotUsed = _.some(slot.runes, rune => isRuneUsed(rune.id));
    const isActive = (id: number) => !isSlotUsed || isRuneUsed(id);

    return _.map(slot.runes, ({ id }: any) => (
      <RuneIcon
        inactive={!isActive(id)}
        key={id}
        path={path}
        perkId={id}
        onClick={() => (isSlotUsed ? _.noop() : this.onAddRune({ slotIdx: runeSlot, runeId: id, runeIdx: idx }))}
      />
    ));
  };

  render() {
    const { path, slots, runeData, addRune } = this.props;
    const { isOpen, primaryIdx, secondaryIdx } = this.state;
    const runeWithoutMain = _.drop(runeData);
    const getRuneData = (idx: number) => _.get(runeWithoutMain, `[${idx}].runes`, null);

    return (
      <ArrayWrapper>
        <RuneSlots>
          <RuneIcon onClick={() => this.toggleRuneLine({ runeSlot: 4 })} path={path} perkId={slots[4]} />
          <RuneIcon onClick={() => this.toggleRuneLine({ runeSlot: 5 })} path={path} perkId={slots[5]} />
        </RuneSlots>
        <div>
          {isOpen ? (
            _.map(runeWithoutMain, (slot: any, idx) => <SlotLine key={idx}>{this.renderArrayLine(slot, idx)}</SlotLine>)
          ) : (
            <DescWrapper>
              <SlotDescription slotIdx={4} slots={slots} runes={getRuneData(primaryIdx)} />
              <SlotDescription slotIdx={5} slots={slots} runes={getRuneData(secondaryIdx)} />
            </DescWrapper>
          )}
        </div>
      </ArrayWrapper>
    );
  }
}

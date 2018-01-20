import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { IRunes, ISlots } from 'models';
import { RuneIcon } from './';

export interface IArrayLineProps {
  path: string;
  currentSlot: number;
  idx: number;
  slots: {
    [key: number]: number;
  };
  runeData: ISlots[];
  primaryIdx: number | null;
  secondaryIdx: number | null;
  slot: ISlots;
  onAddRune({ slotIdx, runeId, runeIdx }: { slotIdx: number; runeId: number; runeIdx: number }): void;
}

const Line = styled.div`
  display: flex;
  margin: 15px 0;
`;

export const ArrayLine: React.SFC<IArrayLineProps> = ({
  path,
  slots,
  runeData,
  currentSlot,
  idx,
  primaryIdx,
  secondaryIdx,
  slot,
  onAddRune,
}) => {
  const usedSlots = _.values(slots);

  // Helpers to check if rune from the same line vas used previously
  const isRuneUsed = (id: number) => _.includes(usedSlots, id);
  const isSlotUsed = (id: number, index: number) => _.some(runeData[index].runes, rune => isRuneUsed(rune.id));

  const isActive = (id: number) => !isSlotUsed(id, idx) || isRuneUsed(id);
  // Make sure that we can't select rune from the same line in the second rune slot
  const isAvailable = (id: number) => {
    const otherSlot = currentSlot === 4 ? 5 : 4;
    const otherIdx = otherSlot === 4 ? primaryIdx : secondaryIdx;
    const otherSlotId = _.get(slots, `[${otherSlot}]`, null);

    if (otherSlotId && otherIdx === idx) {
      return false;
    }

    return true;
  };

  return (
    <Line>
      {_.map(slot.runes, ({ id, shortDesc }: IRunes) => (
        <RuneIcon
          inactive={!isActive(id)}
          tooltip={shortDesc}
          key={id}
          path={path}
          perkId={id}
          onClick={() => isAvailable(id) && onAddRune({ slotIdx: currentSlot, runeId: id, runeIdx: idx })}
        />
      ))}
    </Line>
  );
};

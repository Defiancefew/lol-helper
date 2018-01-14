import React from 'react';
import styled from 'styled-components';
import { slotWithoutDesc } from 'static';
import _ from 'lodash';

const Description = styled.span`
  color: white;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 40px;
`;

export const SlotDescription = ({ slots, slotIdx, runes }: any) => {
  if (!runes) {
    return null;
  }

  return (
    <Description>
      {slots[slotIdx] && !_.isEmpty(runes) ? (
        <span dangerouslySetInnerHTML={{ __html: _.find(runes, { id: slots[slotIdx] }).shortDesc }} />
      ) : (
        slotWithoutDesc[slotIdx]
      )}
    </Description>
  );
};

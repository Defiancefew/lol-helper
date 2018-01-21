import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { freeToPlayMock } from '../__mocks__/';
import { Icon } from 'common';

const Line = styled.div`
  display: flex;
`;
// TODO: Repalce temporary mocks with proper data
export class FreeToPlay extends React.Component<any, any> {
  render() {
    const chunked = _.chunk(freeToPlayMock.champions, 7);

    return (
      <div>
        <h1>Free to play:</h1>
        <Line>{_.map(chunked[0], ({ id }) => <Icon key={id} type="champion" id={id} />)}</Line>
        <Line>{_.map(chunked[1], ({ id }) => <Icon key={id} type="champion" id={id} />)}</Line>
      </div>
    );
  }
}

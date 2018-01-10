import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IStore } from 'models';

const CalcWrapper = styled.div`
  margin: 0 auto;
`;

export class RunePageCalc extends React.Component<any, any> {
  render() {
    return <CalcWrapper>Calc</CalcWrapper>;
  }
}

export const ConnectedCalc = connect(({ rune }: IStore) => rune, {})(RunePageCalc);

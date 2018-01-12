import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IStore } from 'models';
import _ from 'lodash';
import { RuneInitial, RuneTree } from './';
import * as runeActions from '../actions';
import { mainPaths } from 'static';

const CalcWrapper = styled.div`
  margin: 0 auto;
`;

const PrimaryWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export class RunePageCalc extends React.Component<any, any> {
  render() {
    const { mainPath, secondaryPath, slots, selectPrimary, resetRune, selectSecondary, addRune } = this.props;
    const primarySelect = _.map(mainPaths, ({ title, id }) => (
      <RuneInitial key={title} selectPrimary={selectPrimary} title={title} id={id} />
    ));

    return (
      <CalcWrapper>
        {!mainPath ? (
          <PrimaryWrapper>{primarySelect}</PrimaryWrapper>
        ) : (
          <RuneTree
            addRune={addRune}
            resetRune={resetRune}
            mainPath={mainPath}
            secondaryPath={secondaryPath}
            slots={slots}
            selectSecondary={selectSecondary}
          />
        )}
      </CalcWrapper>
    );
  }
}

export const ConnectedCalc = connect(({ rune }: IStore) => rune, runeActions)(RunePageCalc);

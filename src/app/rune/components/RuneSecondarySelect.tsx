import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { RuneIcon } from './';

const SecondaryIcon: any = styled.button`
  width: 42px;
  height: 42px;
  margin: 0 5px;
  background: ${({ name }: any) => `url('/static/img/runes/${name}/icon.png')`};
  padding: 0;
  display: block;
  outline: none;
  cursor: pointer;
  border: 0;
`;

const SecondarySelect = styled.div`
  margin-left: 10px;
  display: flex;
  position: relative;
  align-items: center;
`;

const SecondaryDescription = styled.div`
  position: absolute;
  width: 200px;
  left: 75px;
  color: white;
  h3 {
    color: white;
  }
`;

export interface IRuneSecondaryState {
  isOpen: boolean;
}

export interface IRuneSecondaryProps {
  secondaryName: string;
  secondaryDescription: any;
  availableSecondary: object[];
  selectSecondary(id: number): void;
}

export class RuneSecondarySelect extends React.Component<IRuneSecondaryProps, IRuneSecondaryState> {
  state = {
    isOpen: false,
  };

  toggleRuneLine = (id?: number) => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  onSelectSecondary = (id: number) => {
    this.toggleRuneLine();
    return this.props.selectSecondary(id);
  };

  render() {
    const { secondaryName, availableSecondary, secondaryDescription } = this.props;
    const { isOpen } = this.state;

    return (
      <SecondarySelect>
        <RuneIcon onClick={this.toggleRuneLine} perkId={secondaryName && ('icon' as any)} path={secondaryName} isMain />
        {secondaryName &&
          !isOpen && (
            <SecondaryDescription>
              <h3>{_.upperCase(secondaryDescription.title)}</h3>
              {secondaryDescription.secondaryPerk}
            </SecondaryDescription>
          )}
        {isOpen &&
          _.map(availableSecondary, (path: any) => (
            <SecondaryIcon key={path.id} onClick={() => this.onSelectSecondary(path.id)} name={path.title} />
          ))}
      </SecondarySelect>
    );
  }
}

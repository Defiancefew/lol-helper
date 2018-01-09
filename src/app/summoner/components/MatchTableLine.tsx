import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Icon } from '../../common/components';

const LineWrapper = styled.div`
  display: flex;
  flex: 0;
  align-items: center;
  margin-bottom: 10px;
  & span:nth-child(4) {
    display: flex;
  }
  & span:nth-child(5) {
    margin-left: 10px;
    display: flex;
  }
  &:hover {
    cursor: pointer;
    outline: 1px solid orange;
  }
`;

const StatsBlock = styled.span`
  margin-left: 10px;
  width: 100px;
`;

export interface IMatchTableLineProps {
  accountId: number;
  championId: number;
  summonerName: string;
  kills: number;
  deaths: number;
  assists: number;
  spell1Id: number;
  spell2Id: number;
  items: {
    [key: string]: string;
  };
  push: any;
}

export class MatchTableLine extends React.Component<IMatchTableLineProps> {
  renderStats() {
    const { kills, deaths, assists } = this.props;
    return `${kills} | ${deaths} | ${assists}`;
  }

  onClickSummoner = () => this.props.push(`/summoner/${this.props.accountId}`);

  renderItems = (items: any) => _.map(items, (item: number, idx: number) => <Icon key={idx} type="item" id={item} />);

  render() {
    const { championId, summonerName, spell1Id, spell2Id, items } = this.props;

    return (
      <LineWrapper>
        <Icon onClick={this.onClickSummoner} type="champion" id={championId} />
        <StatsBlock>{summonerName}</StatsBlock>
        <StatsBlock>{this.renderStats()}</StatsBlock>
        <span>{this.renderItems(items)}</span>
        <span>
          <Icon type="summoner" id={spell1Id} />
          <Icon type="summoner" id={spell2Id} />
        </span>
      </LineWrapper>
    );
  }
}

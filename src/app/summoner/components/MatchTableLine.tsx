import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { fetchSummoner } from '../actions';
import { Icon } from 'common';

const LineContainer = styled.div`
  display: inline-block;
`;

const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  flex-flow: row nowrap;
`;

const StatsBlock = styled.span`
  margin-left: 10px;
  width: 100px;
  text-align: center;
`;

const IconsWrapper = styled.span`
  display: flex;
  margin-left: 10px;
`;

export interface IMatchTableLineProps {
  accountId: number;
  championId: number;
  summonerId: number;
  summonerName: string;
  kills: number;
  deaths: number;
  assists: number;
  spell1Id: number;
  spell2Id: number;
  items: {
    [key: string]: string;
  };
  fetchSummoner: typeof fetchSummoner;
}

export class MatchTableLine extends React.Component<IMatchTableLineProps> {
  onClickSummoner = () => this.props.fetchSummoner({ id: this.props.summonerId as any });

  render() {
    const { championId, summonerName, spell1Id, spell2Id, items, kills, deaths, assists } = this.props;

    return (
      <LineContainer>
        <LineWrapper>
          <Icon onClick={this.onClickSummoner} type="champion" id={championId} />
          <StatsBlock>{summonerName}</StatsBlock>
          <StatsBlock>{`${kills} | ${deaths} | ${assists}`}</StatsBlock>
          <IconsWrapper>
            {_.map(items, (item: number, idx: number) => <Icon key={idx} type="item" id={item} />)}
          </IconsWrapper>
          <IconsWrapper>
            <Icon type="summoner" id={spell1Id} />
            <Icon type="summoner" id={spell2Id} />
          </IconsWrapper>
        </LineWrapper>
      </LineContainer>
    );
  }
}

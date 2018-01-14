import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { ISummonerLeague, ISummonerInfo } from 'models';
import { dataDragonVersion } from '../../../server/config';
import { leagueMock } from '../__mocks__';

const ranks = ['I', 'II', 'III', 'IV', 'V'];

export interface ISummonerStatsProps {
  summonerLeague: ISummonerLeague[];
  summonerInfo: ISummonerInfo;
}

const Stats = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Rows = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  margin: 0 auto;
`;

const ProfileIcon: any = styled.div`
  background: ${({ icon }: any) =>
    `url(http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/profileicon/${icon}.png)`};
  background-size: cover;
  width: 150px;
  height: 150px;
  position: relative;
  border-radius: 50%;
  & span {
    border-radius: 50%;
    position: absolute;
    bottom: 5px;
    right: 5px;
    background: black;
    color: white;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }
`;

export class SummonerStats extends React.Component<ISummonerStatsProps, any> {
  renderSingleLeague(league: ISummonerLeague, idx: number) {
    const { queueType, wins, losses, rank, tier, leaguePoints } = league;
    const cleanQueueType = _.replace(queueType, /_/g, ' ');
    const imgUrl = `/static/img/tier-icons/${tier.toLowerCase()}_${rank.toLowerCase()}.png`;

    return (
      <div key={idx}>
        <div>{cleanQueueType}</div>
        <div>
          <img src={imgUrl} alt="" />
        </div>
        <div>
          {tier} {rank} {leaguePoints}pts
        </div>
        {wins} - {losses} - {_.floor(wins * 100 / (wins + losses))} %
      </div>
    );
  }

  render() {
    const { summonerLeague, summonerInfo } = this.props;

    if (!summonerInfo) {
      return null;
    }

    return (
      <Stats>
        <h1>{summonerInfo.name}</h1>
        <Rows>
          <ProfileIcon icon={summonerInfo.profileIconId}>
            <span>{summonerInfo.summonerLevel}</span>
          </ProfileIcon>
          {_.map(summonerLeague, (league: ISummonerLeague, idx) => this.renderSingleLeague(league, idx))}
        </Rows>
      </Stats>
    );
  }
}

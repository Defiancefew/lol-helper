import React from 'react';
import { Spin, Button } from 'antd';
import { connect } from 'react-redux';
import { IStore, IParticipantIdentities } from 'models';
import { fetchSingleMatch } from '../actions';
import { MatchTableLine } from './';
import _ from 'lodash';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import { Icon } from '../../common/components';

export interface IConnectedDispatch {
  onFetchSingleMatch: typeof fetchSingleMatch;
  onPush: any;
  match: any;
}

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type MatchProfilePageProps = IStore['summoner'] & IConnectedDispatch;

export class MatchProfilePage extends React.Component<MatchProfilePageProps> {
  componentDidMount() {
    const { onFetchSingleMatch, match: { params } } = this.props;
    return onFetchSingleMatch(params.matchid);
  }

  onGoBack = () => {
    const { onPush, summonerInfo } = this.props;
    const isInfoEmpty = _.get(summonerInfo, 'accountId', '');

    return onPush(`/summoner/${isInfoEmpty}`);
  };

  renderTeams() {
    const { singleMatch, onPush } = this.props;
    const { participantIdentities, participants, teams } = singleMatch;
    const didPurpleTeamWon = teams[0].win === 'Win';

    return _.map(participantIdentities, ({ player }: IParticipantIdentities, idx: number) => {
      const participantIdx = participants[idx];
      const { stats } = participantIdx;
      const props = {
        // TODO: Decompose this afterwards
        ..._.pick(player, ['accountId', 'summonerName']),
        ..._.pick(participantIdx, ['spell1Id', 'spell2Id', 'championId']),
        ..._.pick(stats, ['kills', 'deaths', 'assists']),
        items: _.pickBy(stats, (stat, key) => /item\d$/.test(key)),
      };

      const renderWinner = (index: number) => {
        if (index === 0) {
          return didPurpleTeamWon ? 'Winner' : 'Loser';
        }

        return index === 5 && (!didPurpleTeamWon ? 'Winner' : 'Loser');
      };

      return (
        <div key={idx}>
          <h1>{renderWinner(idx)}</h1>
          <MatchTableLine push={onPush} {...props} />
        </div>
      );
    });
  }

  render() {
    const { singleMatch } = this.props;

    if (!singleMatch) {
      return (
        <div>
          <Spin /> Loading...
        </div>
      );
    }

    return (
      <TeamWrapper>
        <HeaderWrapper>
          <h1>Match History</h1>
          <Button size="small" icon="arrow-left" onClick={this.onGoBack} />
        </HeaderWrapper>

        {this.renderTeams()}
      </TeamWrapper>
    );
  }
}

export const ConnectedMatchPage = connect(({ summoner }: IStore) => summoner, {
  onFetchSingleMatch: fetchSingleMatch,
  onPush: push,
})(MatchProfilePage);

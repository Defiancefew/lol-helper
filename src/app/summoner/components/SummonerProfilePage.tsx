import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { fetchMatchList } from '../actions';
import { IStore, IMatch } from 'models';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { MatchListItem } from './';

interface IConnectedDispatch {
  onFetchMatchList: typeof fetchMatchList;
  match: any;
  onPush: typeof push;
}

type ISummonerProfilePageProps = IConnectedDispatch & IStore['summoner'];

export class SummonerProfilePage extends React.Component<ISummonerProfilePageProps> {
  componentDidMount() {
    const { onFetchMatchList, match: { params } } = this.props;
    return onFetchMatchList(params.profile, true);
  }

  render() {
    const { matchList, isLoading, onPush } = this.props;

    if (isLoading) {
      return (
        <div>
          <Spin /> Loading...
        </div>
      );
    }

    return (
      <div>
        {_.map(_.get(matchList, 'matches', []), (match, key) => (
          <MatchListItem push={onPush} key={key} {...match as IMatch} />
        ))}
      </div>
    );
  }
}

export const ConnectedProfilePage = connect(({ summoner }: IStore) => summoner, {
  onFetchMatchList: fetchMatchList,
  onPush: push,
})(SummonerProfilePage);

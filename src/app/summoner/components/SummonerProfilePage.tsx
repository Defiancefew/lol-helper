import React from 'react';
import { Spin, Pagination } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchMatchList, fetchSummonerLeague, fetchSummoner } from '../actions';
import { IStore, IMatch } from 'models';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { MatchListItem, SummonerStats } from './';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MatchHead = styled.h2`
  max-width: 800px;
  margin: 0 auto;
`;

interface IConnectedDispatch {
  fetchMatchList: typeof fetchMatchList;
  fetchSummonerLeague: typeof fetchSummonerLeague;
  push: typeof push;
  fetchSummoner: typeof fetchSummoner;
}

export interface IProfilePageOwnProps {
  match?: {
    params: {
      id: any;
      account: string;
    };
  };
}

type ISummonerProfilePageProps = IConnectedDispatch & IStore['summoner'] & IProfilePageOwnProps;

export class SummonerProfilePage extends React.Component<ISummonerProfilePageProps> {
  state = {
    current: 1,
    pageSize: 10,
  };

  paginate() {
    const { current, pageSize } = this.state;
    const { matchList } = this.props;
    const pageNumber = current - 1;
    return _.slice(_.get(matchList, 'matches', []), pageNumber * pageSize, (pageNumber + 1) * pageSize);
  }

  onChange = (current: number) => this.setState({ current });

  componentDidMount() {
    if (!this.props.match) {
      return;
    }

    const {
      fetchMatchList,
      fetchSummonerLeague,
      match: { params },
      fetchSummoner,
      summonerInfo,
      isLoading,
    } = this.props;

    const { id, account } = params;

    if (!summonerInfo && !isLoading) {
      _.delay(() => fetchSummoner({ id }), 500);
    }

    fetchSummonerLeague(id);
    fetchMatchList(account, true);
  }

  render() {
    const { matchList, isLoading, push, summonerLeague, summonerInfo } = this.props;
    const { current, pageSize } = this.state;
    const matches = _.get(matchList, 'matches', []);

    if (isLoading) {
      return (
        <div>
          <Spin /> Loading...
        </div>
      );
    }

    return (
      <div>
        <SummonerStats summonerLeague={summonerLeague} summonerInfo={summonerInfo} />
        <MatchHead>Match list:</MatchHead>
        {_.map(this.paginate(), (match, key) => <MatchListItem push={push} key={key} {...match as IMatch} />)}
        {!_.isEmpty(matches) && (
          <PaginationWrapper>
            <Pagination total={matches.length} pageSize={pageSize} current={current} onChange={this.onChange} />
          </PaginationWrapper>
        )}
      </div>
    );
  }
}

export const ConnectedProfilePage = connect(({ summoner }: IStore) => summoner, {
  fetchMatchList,
  fetchSummonerLeague,
  fetchSummoner,
  push,
})(SummonerProfilePage);

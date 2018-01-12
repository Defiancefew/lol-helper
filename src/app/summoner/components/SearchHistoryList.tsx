import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Spin } from 'antd';
import { SearchHistoryProfile } from './';
import { IStore, ISummonerInfo } from 'models';
import { push } from 'react-router-redux';

const StyledSearch = styled.div`
  margin: 15px 0;
`;

export class SearchHistoryList extends React.Component<any, any> {
  render() {
    const { summonerInfo, searchHistory, push, isLoading } = this.props;

    const renderHistory = _.map(_.slice(searchHistory, 0, searchHistory.length - 1), (item: ISummonerInfo, idx) => (
      <SearchHistoryProfile key={idx} {...item} />
    ));

    if (isLoading) {
      return (
        <div>
          <Spin /> Loading...
        </div>
      );
    }

    return (
      <div>
        <StyledSearch>
          <h2>Search results:</h2>
          {!_.isEmpty(summonerInfo) ? (
            <SearchHistoryProfile push={push} {...summonerInfo as ISummonerInfo} />
          ) : (
            'Nothing found (yet)'
          )}
        </StyledSearch>
        {!_.isEmpty(searchHistory) && (
          <div>
            <h2>Recent search:</h2>
            {renderHistory}
          </div>
        )}
      </div>
    );
  }
}

export const ConnectedHistory = connect(({ summoner }: IStore) => summoner, { push })(SearchHistoryList);

import React from 'react';
import { connect } from 'react-redux';
import { Input, Form, Select, Button, Spin } from 'antd';
import styled from 'styled-components';
import { IStore, ISummonerInfo } from 'models';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { SearchHistoryProfile } from './';
import { ISummonerReducerState } from '../reducer';
import { clearSearch, fetchSummoner } from '../actions';

const { Option } = Select;

export interface IConnectedDispatch {
  clearSearch: typeof clearSearch;
  fetchSummoner: typeof fetchSummoner;
  push: typeof push;
}

export interface ISearchState {
  region: string;
  type: string;
  id: string;
}

const StyledSearch = styled.div`
  margin: 15px 0;
`;

const ButtonsWrapper = styled.div`
  margin: 15px 0;
  display: flex;
  flex: 1;
  button:nth-child(1) {
    flex-grow: 1;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 300px;
`;

type SearchProps = IConnectedDispatch & IStore['summoner'];

export class SummonerSearchWrapper extends React.Component<SearchProps, ISearchState> {
  state = {
    region: 'euw1',
    type: 'id',
    id: '23842771',
  };

  handleSelectCHange = (type: string) => this.setState({ type, id: '' });

  handleInputChange = (e: React.ChangeEvent<any>) => this.setState({ id: e.currentTarget.value });

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { id, type, region } = this.state;
    return this.props.fetchSummoner(id, type, region);
  };

  render() {
    const { region, type, id } = this.state;
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
        <FormWrapper>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Select value={type} onChange={this.handleSelectCHange}>
              <Option value="id">id</Option>
              <Option value="name">name</Option>
              <Option value="account">account</Option>
            </Select>
            <Input onChange={this.handleInputChange} placeholder={`Enter your ${type}`} value={id} />
            <ButtonsWrapper>
              <Button htmlType="submit" type="primary" icon="search">
                Submit
              </Button>
              <Button icon="cross" onClick={this.props.clearSearch} />
            </ButtonsWrapper>
          </Form>
        </FormWrapper>

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
            <h2>Recent search:</h2> {renderHistory}
          </div>
        )}
      </div>
    );
  }
}

export const ConnectedSearch = connect(({ summoner }: { summoner: ISummonerReducerState }) => summoner, {
  clearSearch,
  fetchSummoner,
  push,
})(SummonerSearchWrapper);

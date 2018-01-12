import React from 'react';
import { connect } from 'react-redux';
import { Input, Form, Select, Button, Spin, notification } from 'antd';
import styled from 'styled-components';
import { IStore, ISummonerInfo } from 'models';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { SearchHistoryProfile } from './';
import { ISummonerReducerState } from '../reducer';
import { clearSearch, fetchSummoner } from '../actions';

const { Option } = Select;
const { Search } = Input;

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

const FormWrapper = styled(Form as any)`
  display: flex;
  align-items: center;
  margin-right: 15px !important;

  & .ant-select {
    width: 50%;
  }
`;

type SearchProps = IConnectedDispatch & IStore['summoner'] & { isApiChecked: boolean };

export class SummonerSearchWrapper extends React.Component<SearchProps, ISearchState> {
  state = {
    region: 'euw1',
    type: 'id',
    id: '23842771',
  };

  handleSelectCHange = (type: string) => this.setState({ type, id: '' });

  handleInputChange = (e: React.ChangeEvent<any>) => this.setState({ id: e.currentTarget.value });

  handleSubmit = (e: any) => {
    const { id, type, region } = this.state;

    if (id.length === 0) {
      return notification.error({
        message: 'Empty search input',
        description: '',
      });
    }

    return this.props.fetchSummoner(id, type, region);
  };

  render() {
    const { region, type, id } = this.state;
    const { summonerInfo, searchHistory, push, isLoading } = this.props;

    return (
      <FormWrapper layout="vertical" onSubmit={this.handleSubmit}>
        <Select value={type} onChange={this.handleSelectCHange}>
          <Option value="id">id</Option>
          <Option value="name">name</Option>
          <Option value="account">account</Option>
        </Select>
        <Search
          onSearch={this.handleSubmit}
          onChange={this.handleInputChange}
          placeholder={`Enter your ${type}`}
          value={id}
          enterButton
        />
      </FormWrapper>
    );
  }
}

export const ConnectedSearchForm = connect(
  ({ summoner, auth }: IStore) => ({ ...summoner, isApiChecked: auth.isApiChecked }),
  {
    clearSearch,
    fetchSummoner,
    push,
  },
)(SummonerSearchWrapper);

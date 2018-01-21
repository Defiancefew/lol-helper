import React from 'react';
import { connect } from 'react-redux';
import { Input, Form, Select, notification } from 'antd';
import styled from 'styled-components';
import { IStore } from 'models';
import { regions } from 'static';
import _ from 'lodash';
import { clearSearch, fetchSummoner } from '../actions';

const { Option } = Select;
const { Search } = Input;

export interface IConnectedDispatch {
  clearSearch: typeof clearSearch;
  fetchSummoner: typeof fetchSummoner;
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

const StyledSelect: any = styled(Select)`
  min-width: ${(props: any) => (props.wide ? '130px' : '80px')};
`;

type SearchProps = IConnectedDispatch & IStore['summoner'] & { isApiChecked: boolean };

export class SummonerSearch extends React.Component<SearchProps, ISearchState> {
  state = {
    region: 'EUW1',
    type: 'name',
    id: '',
  };

  handleSelectChange = (value: string) => this.setState({ region: value });

  handleInputChange = (e: React.ChangeEvent<any>) => this.setState({ id: e.currentTarget.value });

  handleSubmit = (e: any) => {
    const { id, region } = this.state;

    if (id.length === 0) {
      return notification.error({
        message: 'Empty search input',
        description: '',
      });
    }

    return this.props.fetchSummoner({ region, id, type: 'name' });
  };

  render() {
    const { type, id, region } = this.state;
    const { isApiChecked } = this.props;

    const RegionSelect = (
      <StyledSelect
        wide
        disabled={!isApiChecked}
        value={region}
        onChange={(value: string) => this.handleSelectChange(value)}
      >
        {_.map(regions, (name: string, regionKey: string) => (
          <Option key={regionKey} value={regionKey}>
            {name}
          </Option>
        ))}
      </StyledSelect>
    );

    return (
      <FormWrapper layout="vertical" onSubmit={this.handleSubmit}>
        <Search
          addonBefore={RegionSelect}
          disabled={!isApiChecked}
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
  },
)(SummonerSearch);

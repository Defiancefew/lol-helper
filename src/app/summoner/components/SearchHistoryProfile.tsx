import React from 'react';
import { ISummonerInfo } from 'models';
import styled from 'styled-components';
import { Icon } from '../../common/components';

const Wrapper = styled.div`
  display: flex;
  padding: 0 5px;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const InfoWrapper = styled.div`
  margin-left: 10px;
`;

type SearchHistoryProfileProps = ISummonerInfo & { push?: (location: string) => void };

export class SearchHistoryProfile extends React.Component<SearchHistoryProfileProps> {
  handleClick = () => this.props.push && this.props.push(`/summoner/${this.props.accountId}`);

  render() {
    const { profileIconId, id, name, summonerLevel, push } = this.props;

    return (
      <Wrapper onClick={this.handleClick}>
        <Icon id={profileIconId} type="profileicon" />
        <InfoWrapper>
          <div>{name}</div>
          <div>{summonerLevel}</div>
        </InfoWrapper>
      </Wrapper>
    );
  }
}

import React from 'react';
import styled from 'styled-components';
import * as staticData from 'static'; // TODO: Omit this afterwards
import _ from 'lodash';
import { Icon } from '../../common/components';

const { queueMap } = staticData;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid black;
  cursor: pointer;
`;

const DescWrapper = styled.span`
  width: 200px;
  margin-left: 10px;
`;

export class MatchListItem extends React.Component<any, any> {
  handleClick = () => this.props.push(`/summoner/match/${this.props.gameId}`);

  render() {
    const { champion, platformId, timestamp, lane, queue, season, role } = this.props;
    const time = new Date(timestamp).toLocaleDateString('en-uS');

    return (
      <ItemWrapper onClick={this.handleClick}>
        <Icon type="champion" id={champion} />
        <DescWrapper>{time}</DescWrapper>
        <DescWrapper>{lane}</DescWrapper>
        <DescWrapper>{queueMap[queue]}</DescWrapper>
      </ItemWrapper>
    );
  }
}

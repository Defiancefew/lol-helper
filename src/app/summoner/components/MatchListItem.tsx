import React from 'react';
import styled from 'styled-components';
import { queueMap } from 'static'; // TODO: Omit this afterwards
import { Icon } from 'common';

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid gray;
  cursor: pointer;
  text-align: center;
  max-width: 800px;
  margin: 10px auto;
`;

const DescWrapper = styled.span`
  width: 200px;
`;

export class MatchListItem extends React.Component<any, any> {
  handleClick = () => this.props.push(`/match/${this.props.gameId}`);

  render() {
    const { champion, timestamp, lane, queue } = this.props;
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

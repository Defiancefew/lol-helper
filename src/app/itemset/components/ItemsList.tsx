import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { DraggableIcon } from './';
import { IItem } from 'models';

const ItemsWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  max-width: 800px;
  height: 780px;
  padding-bottom: 400px;
  margin-top: 16px;
`;

export interface IItemsListProps {
  items: { data: { [key: string]: IItem } };
}

export class ItemsList extends React.Component<IItemsListProps> {
  render() {
    const { items } = this.props;
    return (
      <ItemsWrapper>
        {_.map(items.data, (item: IItem, id: string) => <DraggableIcon key={id} type="item" id={id} />)}
      </ItemsWrapper>
    );
  }
}

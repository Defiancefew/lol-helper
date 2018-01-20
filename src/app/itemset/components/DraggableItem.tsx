import React from 'react';
import { DragSource, ConnectDragSource } from 'react-dnd';
import { dndTypes } from 'utils';
import { Icon } from 'common';

export interface IProxyIconProps {
  id: string;
  type: 'champion' | 'item' | 'spell' | 'profileicon' | 'summoner';
}

export interface IItemDropSpec extends IProxyIconProps {
  connectDragSource: ConnectDragSource;
}

const ProxyIcon: React.SFC<IItemDropSpec> = ({ connectDragSource, type, id }) =>
  connectDragSource(
    <span>
      <Icon type={type} id={id} />
    </span>,
  );

const itemIconSource = {
  beginDrag({ id, type }: IProxyIconProps) {
    return { id };
  },
};

export const DraggableIcon = DragSource<IProxyIconProps>(dndTypes.ITEM_ICON, itemIconSource, (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
  isDragging: monitor.isDragging(),
}))(ProxyIcon);

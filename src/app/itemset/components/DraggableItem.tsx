import React from 'react';
import { DragSource } from 'react-dnd';
import { dndTypes } from 'utils';
import { Icon } from 'common';

export interface IProxyIconProps {
  id: string;
  type: 'champion' | 'item' | 'spell' | 'profileicon' | 'summoner';
  connectDragSource?(component: JSX.Element): JSX.Element;
}

const ProxyIcon: React.SFC<IProxyIconProps> = ({ connectDragSource, type, id }) =>
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

export const DraggableIcon = DragSource(dndTypes.ITEM_ICON, itemIconSource, (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
  isDragging: monitor.isDragging(),
}))(ProxyIcon);

import React from 'react';
import styled from 'styled-components';
import { DragSource, DropTarget } from 'react-dnd';
import { dndTypes } from 'utils';
import _ from 'lodash';
import { item } from 'static';
import { Icon } from '../../common/components';
import { Icon as AntdIcon, Input, Button, Checkbox } from 'antd';
import { IItemSetBlock } from 'models';

const BlockWrapper: any = styled.div.attrs({
  style: (props: any) => ({
    background: props.background ? 'green' : 'transparent',
  }),
})`
  height: 50px;
  border: 2px solid #b7b7b7;
  display: flex;
  width: 100%;
  margin: 10px 0 10px 5px;
`;

const ItemWrapper = styled.span`
  position: relative;
  &:hover i {
    opacity: 1 !important;
  }
`;

const InputGroup = styled.div`
  display: flex;
  & label {
    width: 150px;
    margin-left: 5px;
    display: flex;
    align-items: center;
  }
`;

const BlockPlaceholder = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  color: gray;
`;

export interface IItemBlock {
  block: IItemSetBlock;
  isOver?: boolean;
  blockIdx: number;
  connectDropTarget?(component: JSX.Element): JSX.Element;
  itemRemove(blockIdx: number, idx: number): void;
  blockRemove(blockIdx: number): void;
  blockUpdate(block: IItemSetBlock, blockIdx: number): void;
  itemAdd(blockIdx: number, id: number): void;
}

export class ItemBlock extends React.Component<IItemBlock> {
  onBlockRemove = () => this.props.blockRemove(this.props.blockIdx);

  onBlockUpdate = (e: any) => {
    const { name, value } = e.currentTarget;
    const { block, blockUpdate, blockIdx } = this.props;

    return blockUpdate(
      {
        ...block,
        [name]: value,
      },
      blockIdx,
    );
  };

  render() {
    const { connectDropTarget, itemRemove, blockIdx, isOver, blockRemove, blockUpdate, block } = this.props;
    const { items, type, recMath } = block;

    return (
      <div>
        <InputGroup>
          <Input placeholder="Title" value={type} onChange={this.onBlockUpdate} name="type" />
          <Checkbox
            checked={recMath}
            onChange={() => this.onBlockUpdate({ currentTarget: { name: 'recMath', value: !recMath } })}
          >
            Rec.math
          </Checkbox>
          <Button type="danger" icon="delete" onClick={this.onBlockRemove} />
        </InputGroup>
        {connectDropTarget(
          <span>
            <BlockWrapper background={isOver}>
              {!_.isEmpty(items) ? (
                _.map(items, (item: string, idx: number) => (
                  <ItemWrapper key={idx}>
                    <AntdIcon
                      onClick={() => itemRemove(blockIdx, idx)}
                      type="close-square"
                      style={{
                        position: 'absolute',
                        fontSize: '16px',
                        cursor: 'pointer',
                        opacity: 0,
                        color: 'red',
                        zIndex: 9999,
                        right: '0',
                      }}
                    />
                    <Icon type="item" id={item} />
                  </ItemWrapper>
                ))
              ) : (
                <BlockPlaceholder>Place your items here</BlockPlaceholder>
              )}
            </BlockWrapper>
          </span>,
        )}
      </div>
    );
  }
}

const itemBlockTarget = {
  drop(props: IItemBlock, monitor: any) {
    const { id } = monitor.getItem();
    const { itemAdd, blockIdx } = props;

    props.itemAdd(blockIdx, id);

    return {};
  },
};

export const DroppableBlock = DropTarget(dndTypes.ITEM_ICON, itemBlockTarget, (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
}))(ItemBlock);

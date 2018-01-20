import React from 'react';
import styled from 'styled-components';
import { IStore, IItemSetBlock, IItem } from 'models';
import { updateInitialFields, blockAdd, blockRemove, blockUpdate, itemAdd, itemRemove } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { dndContext } from 'utils';
import { item, categories } from 'static';
import { SetMainInputs, SetCategories, ItemsList, DroppableBlock } from './';

const BlocksWrapper = styled.div`
  display: flex;
  margin: 10px auto;
  & > div:last-child {
    flex-grow: 1;
  }
`;

const categoriesList = _.reduce(
  categories,
  (acc, value, key) => ({
    ...acc,
    [value]: false,
  }),
  {},
);

interface IConnectedDispatch {
  updateInitialFields: typeof updateInitialFields;
  blockAdd: typeof blockAdd;
  blockRemove: typeof blockRemove;
  blockUpdate: typeof blockUpdate;
  itemAdd: typeof itemAdd;
  itemRemove: typeof itemRemove;
}

export interface IItemSetPageState {
  searchValue: string;
  itemInfo: object | null;
  isFiltersShown: boolean;
  items: {
    data: {
      [key: string]: IItem;
    };
  };
  categoriesFilter: any;
}

type ITemSetProps = IConnectedDispatch & IStore['itemset'];

export class ItemSetPage extends React.Component<ITemSetProps, IItemSetPageState> {
  state: IItemSetPageState = {
    searchValue: '',
    items: item,
    isFiltersShown: false,
    categoriesFilter: categoriesList,
    itemInfo: null,
  };

  saveSet = () => {
    const blob = new Blob([JSON.stringify(this.state)], { type: 'text/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${this.props.title || 'test'}.json`;
    a.click();
  };

  onChange = (e: { currentTarget: { value: string; name: string } }) => {
    const { currentTarget: { value, name } } = e;
    this.props.updateInitialFields({
      [name]: value,
    });
  };

  deleteBlock = (idx: number) => this.props.blockRemove(idx);

  updateBlock = (id: number, block: IItemSetBlock) => this.props.blockUpdate(block, id);

  addItem = (blockId: number, id: string) =>
    this.props.itemAdd(blockId, {
      id,
      count: 0,
    });

  searchItem = (e: React.ChangeEvent<any>): void => {
    const { value } = e.target;
    const searchRegexp = new RegExp(value, 'gi');

    if (!value) {
      return this.setState({
        searchValue: '',
        items: item,
      });
    }

    // TODO: Optimize this later
    return this.setState(prevState => ({
      searchValue: value,
      items: {
        ...prevState.items,
        data: _.pickBy(item.data, (item: { name: string }, key) => searchRegexp.test(item.name)),
      },
    }));
  };

  onFilterChange = (name: string) => {
    this.setState(prevState => {
      const newFilterList = { ...prevState.categoriesFilter, [name]: !prevState.categoriesFilter[name] };
      const enabledFilters = _.map(_.pickBy(newFilterList, filter => !!filter), (filter, key) => key.toString());

      const newItemsList = {
        ...item,
        data: _.pickBy(
          item.data,
          (item: { name: string; tags: string[] }, key) =>
            !_.isEmpty(item.tags) && _.difference(enabledFilters, item.tags).length === 0,
        ),
      };

      return {
        categoriesFilter: {
          ...prevState.categoriesFilter,
          [name]: !prevState.categoriesFilter[name],
        },
        items: enabledFilters.length === 0 ? item : newItemsList,
      };
    });
  };

  render() {
    const {
      blockAdd,
      blockRemove,
      blockUpdate,
      itemAdd,
      itemRemove,
      setType,
      title,
      type,
      map,
      mode,
      blocks,
    } = this.props;
    const { categoriesFilter, items } = this.state;

    return (
      <div>
        <div>
          <SetMainInputs
            onChange={this.onChange}
            setType={setType}
            title={title}
            map={map}
            type={type}
            mode={mode}
            blockAdd={blockAdd}
            saveSet={this.saveSet}
          />
        </div>
        <SetCategories categories={categoriesFilter} onChange={this.onFilterChange} searchItem={this.searchItem} />
        <BlocksWrapper>
          <ItemsList items={items} />
          <div>
            {_.map(blocks, (block, idx: number) => (
              <DroppableBlock
                block={block}
                blockIdx={idx}
                blockRemove={blockRemove}
                blockUpdate={blockUpdate}
                itemRemove={itemRemove}
                itemAdd={itemAdd}
                key={idx}
              />
            ))}
          </div>
        </BlocksWrapper>
      </div>
    );
  }
}

export const ConnectedItemProfile = connect(({ itemset }: IStore) => itemset, {
  updateInitialFields,
  blockAdd,
  blockRemove,
  blockUpdate,
  itemAdd,
  itemRemove,
})(ItemSetPage);
export const ConnectedDndProfile = dndContext(ConnectedItemProfile);

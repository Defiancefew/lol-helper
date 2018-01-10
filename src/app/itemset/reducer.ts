import { createReducer } from 'redux-act';
import { IItemSetRoot, IItemSetBlock } from 'models';
import _ from 'lodash';
import { updateInitialFields, blockAdd, blockRemove, blockUpdate, itemAdd, itemRemove } from './actions';

export interface IItemSetState extends IItemSetRoot {
  setType: 'global' | 'champion';
}

export const initialBlock: IItemSetBlock = {
  type: '',
  recMath: false,
  minSummonerLevel: 0,
  maxSummonerLevel: 0,
  showIfSummonerSpell: '',
  hideIfSummonerSpell: '',
  items: [],
};

export const initialState: IItemSetState = {
  setType: 'global',
  title: '',
  type: 'global',
  map: 'any',
  mode: 'any',
  blocks: [initialBlock],
};

export const reducer = createReducer<IItemSetState>(on => {
  on(updateInitialFields, (state, fields) => ({
    ...state,
    ...fields,
  }));

  on(blockAdd, state => ({
    ...state,
    blocks: [...state.blocks, initialBlock],
  }));

  on(blockRemove, (state, idx) => ({
    ...state,
    blocks: _.filter(state.blocks, (previousBlocks, blockIdx) => blockIdx !== idx),
  }));

  on(blockUpdate, (state, { idx, block }) => ({
    ...state,
    blocks: _.map(state.blocks, (previousBlock, blockIdx) => (blockIdx === idx ? block : previousBlock)),
  }));

  on(itemAdd, (state, { blockIdx, item }) => ({
    ...state,
    blocks: _.map(
      state.blocks,
      (previousBlock, idx) =>
        idx === blockIdx ? { ...previousBlock, items: [...previousBlock.items, item] } : previousBlock,
    ),
  }));

  on(itemRemove, (state, { blockIdx, itemIdx }) => ({
    ...state,
    blocks: _.map(
      state.blocks,
      (previousBlock, idx) =>
        blockIdx === idx
          ? { ...previousBlock, items: _.filter(previousBlock.items, (item, idx) => itemIdx !== idx) }
          : previousBlock,
    ),
  }));
}, initialState);

import { createAction } from 'redux-act';
import _ from 'lodash';

const NS = '@@ITEMSET/';

export const updateInitialFields = createAction(`${NS}INITIAL FIELDS`, fields => fields);

export const blockAdd = createAction(`${NS}BLOCK ADD`);
export const blockRemove = createAction(`${NS}BLOCK REMOVE`, idx => idx);
export const blockUpdate = createAction(`${NS}BLOCK UPDATE`, (newBlock: any, idx: number) => ({
  idx,
  block: newBlock,
}));

export const itemAdd = createAction(`${NS}ITEM ADD`, (blockIdx: number, item: any) => ({ blockIdx, item }));
export const itemRemove = createAction(`${NS}ITEM REMOVE`, (blockIdx: number, itemIdx: number) => ({
  blockIdx,
  itemIdx,
}));

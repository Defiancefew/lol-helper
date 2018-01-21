import { createAction } from 'redux-act';

const NS = '@@OPTIONS/';

export const toggleModal = createAction(`${NS}TOGGLE MODAL`, (state?: boolean) => state);
export const toggleOption = createAction(`${NS}TOGGLE OPTION`, option => option);

import { createAction } from 'redux-act';

const NS = '@@RUNE/';

export const addRune = createAction(`${NS} ADD RUNE`);
export const removeRune = createAction(`${NS} REMOVE RUNE`);
export const selectPrimary = createAction(`${NS} SELECT PRIMARY`);
export const selectSecondary = createAction(`${NS} SELECT SECONDARY`);
export const resetRune = createAction(`${NS} RESET RUNE`);

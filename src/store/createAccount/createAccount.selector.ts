import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';

const createAccountSelector = (state: State) => state.createAccount;

const seedPhrase = createSelector(
    createAccountSelector,
    (createAccountState) => createAccountState.seedPhrase,
);

const step = createSelector(
    createAccountSelector,
    (createAccountState) => createAccountState.step,
);

const password = createSelector(
    createAccountSelector,
    (createAccountState) => createAccountState.password,
);

export const createAccountSelectors = {
    seedPhrase,
    step,
    password,
};

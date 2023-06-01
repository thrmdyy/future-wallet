import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';

const accountsSelector = (state: State) => state.accounts;

const selectedAccount = createSelector(
    accountsSelector,
    (state) => state.selectedAccount,
);

const accounts = createSelector(accountsSelector, (state) => state.accounts);

export const accountsSelectors = {
    accounts,
    selectedAccount,
};

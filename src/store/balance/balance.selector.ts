import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';
import { accountsSelectors } from 'store/accounts/accounts.selector';

const balanceSelector = (state: State) => state.balance;

const balance = createSelector(balanceSelector, (state) => state.balance);

const currAccountBalance = createSelector(
    balance,
    accountsSelectors.selectedAccount,
    (balance, account) =>
        account ? balance[account?.address as string] : null,
);

export const balanceSelectors = {
    balanceSelector,
    balance,
    currAccountBalance,
};

import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';
import { domainsSelectors } from 'store/domains/domains.selector';

const accountsSelector = (state: State) => state.accounts;

const selectedAccount = createSelector(
    accountsSelector,
    (state) => state.selectedAccount,
);

const accounts = createSelector(accountsSelector, (state) => state.accounts);

const domains = createSelector(accountsSelector, (state) => state.domains);

const currAccountDomains = createSelector(
    accountsSelector,
    (accountsState) =>
        accountsState.domains[accountsState.selectedAccount?.address as string],
);

export const accountsSelectors = {
    accounts,
    selectedAccount,
    currAccountDomains,
    domains,
};

import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';

const domainsSelector = (state: State) => state.domains;

const domains = createSelector(domainsSelector, (state) => state.domains);

const owned = createSelector(domainsSelector, (state) => state.owned);

export const domainsSelectors = {
    domainsSelector,
    domains,
    owned,
};

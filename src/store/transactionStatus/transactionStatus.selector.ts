import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';

const transactionStatusSelector = (state: State) => state.transactionStatus;

const status = createSelector(
    transactionStatusSelector,
    (state) => state.status,
);

export const transactionStatusSelectors = {
    status,
};

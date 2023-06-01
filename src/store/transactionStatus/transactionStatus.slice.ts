import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { TransactionStatus } from 'types';
import { transactionStatusActions } from './transactionStatus.action';

export interface TransactionStatusState {
    status: TransactionStatus;
}

const initialState: TransactionStatusState = {
    status: TransactionStatus.INITIAL,
};

export const transactionStatusSlice = createSlice<
    TransactionStatusState,
    SliceCaseReducers<TransactionStatusState>
>({
    name: 'transactionStatus',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            transactionStatusActions.setTransactionStatus,
            (state, { payload }) => {
                state.status = payload;
            },
        );
    },
});

export const transactionStatusReducer = transactionStatusSlice.reducer;

import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Account } from './accounts.types';
import { accountActions } from './accounts.action';

export interface AccountsState {
    accounts: Account[] | null;
    selectedAccount: Account | null;
}

const initialState: AccountsState = {
    accounts: null,
    selectedAccount: null,
};

export const accountsSlice = createSlice<
    AccountsState,
    SliceCaseReducers<AccountsState>
>({
    name: 'accounts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(accountActions.addAccount, (state, { payload }) => {
            state.accounts = state.accounts
                ? [...state.accounts, payload]
                : [payload];

            state.selectedAccount = payload;
        });
    },
});

export const accountsReducer = persistReducer(
    {
        storage,
        key: 'accounts',
    },
    accountsSlice.reducer,
);

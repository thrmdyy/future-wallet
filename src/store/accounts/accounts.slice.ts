import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Account } from './accounts.types';
import { accountActions } from './accounts.action';
import { Domain } from 'types';

export interface AccountsState {
    accounts: Account[] | null;
    selectedAccount: Account | null;
    domains: Record<string, Domain[]>;
}

const initialState: AccountsState = {
    accounts: null,
    selectedAccount: null,
    domains: {},
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

        builder.addCase(
            accountActions.setSelectedAccount,
            (state, { payload }) => {
                state.selectedAccount = payload;
            },
        );

        builder.addCase(accountActions.addAccounts, (state, { payload }) => {
            state.accounts = payload;

            state.selectedAccount = payload[0];
        });

        builder.addCase(accountActions.logout, (state) => {
            state.accounts = [];
            state.selectedAccount = null;
        });

        builder.addCase(
            accountActions.fetchDomainsByAccountAddress.fulfilled,
            (state, { payload }) => {
                state.domains[state.selectedAccount?.address as string] =
                    payload;
            },
        );
    },
});

export const accountsReducer = persistReducer(
    {
        storage,
        key: 'accounts',
    },
    accountsSlice.reducer,
);

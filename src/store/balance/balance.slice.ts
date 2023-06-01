import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { balanceActions } from './balance.action';

export interface BalanceState {
    balance: Record<
        string,
        {
            symbol: string;
            balance: number;
            decimals: number;
        }
    >;
}

const initialState: BalanceState = {
    balance: {},
};

export const balanceSlice = createSlice<
    BalanceState,
    SliceCaseReducers<BalanceState>
>({
    name: 'balance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            balanceActions.updateBalance,
            (state, { payload: { address, symbol, decimals, balance } }) => {
                state.balance[address] = {
                    symbol,
                    decimals,
                    balance,
                };
            },
        );
    },
});

export const balanceReducer = persistReducer(
    {
        storage,
        key: 'balance',
    },
    balanceSlice.reducer,
);

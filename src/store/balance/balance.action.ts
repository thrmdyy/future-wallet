import { createAction } from '@reduxjs/toolkit';

const updateBalance = createAction<{
    address: string;
    symbol: string;
    balance: number;
    decimals: number;
}>('@balance/updateBalance');

export const balanceActions = {
    updateBalance,
};

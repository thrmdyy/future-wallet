import { createAction } from '@reduxjs/toolkit';
import { Account } from './accounts.types';

const addAccount = createAction<Account>('@accounts/addAccount');

export const accountActions = {
    addAccount,
};

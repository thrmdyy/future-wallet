import { combineReducers } from '@reduxjs/toolkit';
import { accountsReducer } from './accounts/accounts.slice';
import { createAccountReducer } from './createAccount/createAccount.slice';
import { balanceReducer } from './balance/balance.slice';
import { routerReducer } from './router/router.slice';
import { domainsReducer } from './domains/domains.slice';
import { transactionStatusReducer } from './transactionStatus/transactionStatus.slice';

export const rootReducer = combineReducers({
    accounts: accountsReducer,
    createAccount: createAccountReducer,
    balance: balanceReducer,
    router: routerReducer,
    domains: domainsReducer,
    transactionStatus: transactionStatusReducer,
});

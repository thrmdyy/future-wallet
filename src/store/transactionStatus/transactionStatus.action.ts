import { createAction } from '@reduxjs/toolkit';
import { TransactionStatus } from 'types';

export const setTransactionStatus = createAction<TransactionStatus>(
    '@transactionStatus/setTransactionStatus',
);

export const transactionStatusActions = {
    setTransactionStatus,
};

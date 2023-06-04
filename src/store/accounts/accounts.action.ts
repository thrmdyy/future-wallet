import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Account } from './accounts.types';
import { fetchDomainsByOwnerRequest } from 'api/domains';

const addAccount = createAction<Account>('@accounts/addAccount');

const addAccounts = createAction<Account[]>('@accounts/addAccounts');

const setSelectedAccount = createAction<Account>(
    '@accounts/setSelectedAccount',
);

const logout = createAction('@accounts/logout');

const fetchDomainsByAccountAddress = createAsyncThunk(
    '@accounts/fetchDomainsByAccountAddress',
    async (owner: string) => {
        return await fetchDomainsByOwnerRequest(owner);
    },
);

export const accountActions = {
    addAccount,
    addAccounts,
    setSelectedAccount,
    fetchDomainsByAccountAddress,
    logout,
};

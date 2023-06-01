import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchDomainsByKeywordRequest,
    fetchDomainsByOwnerRequest,
} from 'api/domains';

const fetchDomainsByKeyword = createAsyncThunk(
    '@domains/fetchDomainsByKeyword',
    async (keyword: string) => {
        return await fetchDomainsByKeywordRequest(keyword);
    },
);

const fetchDomainsByOwner = createAsyncThunk(
    '@domains/fetchDomainsByOwner',
    async (owner: string) => {
        return await fetchDomainsByOwnerRequest(owner);
    },
);

export const domainsActions = {
    fetchDomainsByKeyword,
    fetchDomainsByOwner,
};

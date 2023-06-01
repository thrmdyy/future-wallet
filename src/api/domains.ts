import axios, { AxiosResponse } from 'axios';
import { domainsApiUrl } from 'consts/api';
import { Domain } from 'types';

export const fetchDomainsByKeywordRequest = async (keywords: string) => {
    return await axios
        .get<never, AxiosResponse<Domain[]>>(
            `${domainsApiUrl}/domain/search?keyword=${keywords}`,
        )
        .then((res) => res.data);
};

export const fetchDomainsByOwnerRequest = async (address: string) => {
    return await axios
        .get<never, AxiosResponse<Domain[]>>(
            `${domainsApiUrl}/domain/search?owner=${address}`,
        )
        .then((res) => res.data);
};

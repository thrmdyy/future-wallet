import axios, { AxiosResponse } from 'axios';
import { domainsApiUrl } from 'consts/api';
import { Domain } from 'types';

interface FetchDomainsByKeywordResponse {
    exactMatch: Domain;
    zone: Domain;
    similarZones: Domain[];
    differentZones: Domain[];
    similarNames: Domain[];
}

export const fetchDomainsByKeywordRequest = async (keywords: string) => {
    return await axios
        .get<never, AxiosResponse<FetchDomainsByKeywordResponse>>(
            `${domainsApiUrl}/domain/search?domain=${keywords}`,
        )
        .then((res) => {
            const searchResponse = res.data;

            return [
                searchResponse.exactMatch,
                ...searchResponse.similarNames,
                ...searchResponse.similarZones,
            ];
        });
};

export const fetchDomainsByOwnerRequest = async (address: string) => {
    return await axios
        .get<never, AxiosResponse<Domain[]>>(
            `${domainsApiUrl}/domain/byOwner?owner=${address}`,
        )
        .then((res) => res.data);
};

export const fetchDomainsByFullNameRequest = async (fullName: string) => {
    return await axios
        .get<never, AxiosResponse<Domain>>(
            `${domainsApiUrl}/domain/byFullName?fullName=${fullName}`,
        )
        .then((res) => res.data);
};

export const fetchDomainsUpdateRequest = async ({
    id,
    owner,
}: {
    id: string;
    owner: string;
}) => {
    return await axios
        .patch<never, AxiosResponse<Domain>>(`${domainsApiUrl}/domain/${id}`, {
            owner,
        })
        .then((res) => res.data);
};

export const fetchDomainsCreateRequest = async (payload: {
    name: string;
    parentId: string;
    owner: string;
    subPrice: number;
}) => {
    return await axios
        .post<never, AxiosResponse<Domain>>(`${domainsApiUrl}/domain`, payload)
        .then((res) => res.data);
};

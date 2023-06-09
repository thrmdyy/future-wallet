import { fetchDomainByIdRequest } from 'api/domains';
import { useEffect, useState } from 'react';
import { Domain } from 'types';

export const useGetParentDomain = (id: string) => {
    const [parentDomain, setParentDomain] = useState<null | Domain>(null);

    useEffect(() => {
        fetchDomainByIdRequest(id).then((response) =>
            setParentDomain(response),
        );
    }, [id]);

    return parentDomain;
};

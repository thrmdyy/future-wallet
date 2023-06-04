import { cn } from '@bem-react/classname';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { BaseLayout } from 'layout';
import { Input, Title } from 'components';
import { Icons } from 'assets';
import { useAppDispatch, useAppSelector, useDeferredValue } from 'hooks';
import { domainsActions, domainsSelectors, routerActions } from 'store';
import { Domain as IDomain } from 'types';
import { routes } from 'consts';

import './Domain.scss';

const CnDomain = cn('domain');

export const Domain: FC = memo(() => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const deferredSearch = useDeferredValue(search, 1000);
    const domains = useAppSelector(domainsSelectors.domains);

    const backClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.home,
            }),
        );
    }, [dispatch]);

    const searchChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
        },
        [],
    );

    useEffect(() => {
        if (deferredSearch) {
            dispatch(domainsActions.fetchDomainsByKeyword(deferredSearch));
        }
    }, [dispatch, deferredSearch]);

    const domainsContent = useMemo(() => {
        return domains.map((domain) => (
            <DomainItem key={domain.id} {...domain} />
        ));
    }, [domains]);

    return (
        <BaseLayout backClickHandler={backClickCallback} className={CnDomain()}>
            <Title center={false} content="Domains" />

            <div className={CnDomain('search')}>
                <Input
                    value={search}
                    onChange={searchChangeCallback}
                    placeholder="Search domain name"
                />
                <Icons.Search />
            </div>

            <div className={CnDomain('content')}>{domainsContent}</div>
        </BaseLayout>
    );
});

const CnDomainItem = cn('domainItem');

const DomainItem: FC<IDomain> = memo((domain) => {
    const dispatch = useAppDispatch();
    const { fullName, price } = domain;

    const actionClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.account.confirmDomainTransaction,
                state: {
                    domain,
                },
            }),
        );
    }, [domain, dispatch]);

    return (
        <div className={CnDomainItem()}>
            <div className={CnDomainItem('title')}>{fullName}</div>
            <div
                onClick={actionClickCallback}
                className={CnDomainItem('action')}
            >
                {price} VENOM
            </div>
        </div>
    );
});

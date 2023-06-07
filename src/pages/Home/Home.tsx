import { FC, memo, useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import { routes } from 'consts';
import { useAppDispatch, useAppSelector, useWalletProvider } from 'hooks';
import { BaseLayout } from 'layout';
import {
    AccountActions,
    AccountAssets,
    AccountCard,
    AccountNfts,
    Button,
    NetworkSelect,
    Switch,
} from 'components';
import { accountsSelectors, balanceSelectors, routerActions } from 'store';

import './Home.scss';
import React from 'react';
import { Icons } from 'assets';

const CnBaseLayout = cn('baseLayout');
const CnHome = cn('home');

export const Home: FC = memo(() => {
    const [selectedTab, setSelectedTab] = useState('Assets');

    const selectedTabChangeCallback = useCallback(
        (value: string) => setSelectedTab(value),
        [],
    );

    const account = useAppSelector(accountsSelectors.selectedAccount);

    const balance = useAppSelector(balanceSelectors.currAccountBalance);

    const tabContent = useMemo(() => {
        return (
            <React.Suspense fallback={null}>
                <div
                    style={{
                        display: selectedTab === 'Assets' ? 'block' : 'none',
                    }}
                >
                    <AccountAssets />
                </div>
                <div
                    style={{
                        display: selectedTab === 'NFT' ? 'block' : 'none',
                    }}
                >
                    <AccountNfts />
                </div>
            </React.Suspense>
        );
    }, [selectedTab]);

    const switchContent = useMemo(
        () => (
            <Switch
                items={[
                    {
                        label: 'Assets',
                        onClick: selectedTabChangeCallback,
                    },
                    {
                        label: 'NFT',
                        onClick: selectedTabChangeCallback,
                    },
                ]}
            />
        ),
        [selectedTabChangeCallback],
    );

    const dispatch = useAppDispatch();

    const userClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.account.accountSelect,
            }),
        );
    }, [dispatch]);

    const futyClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.futy,
            }),
        );
    }, [dispatch]);

    return (
        <div className={CnBaseLayout({}, CnHome())}>
            <div className={CnBaseLayout('header')}>
                <Button onClick={futyClickCallback} view="icon">
                    <Icons.Robot className={CnHome('futy')} />
                </Button>
                <NetworkSelect />
                <Button onClick={userClickCallback} view="icon">
                    <Icons.User />
                </Button>
            </div>
            <div className={CnBaseLayout('content')}>
                <AccountCard
                    name={account?.name}
                    address={account?.address}
                    balance={balance?.balance}
                    balanceSymbol={balance?.symbol}
                    decimals={balance?.decimals}
                />

                <AccountActions />

                {switchContent}
                {tabContent}
            </div>
        </div>
    );
});

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
    Switch,
} from 'components';
import { accountsSelectors, balanceSelectors } from 'store';

import './Home.scss';
import React from 'react';

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

    return (
        <BaseLayout showBack={false} className={CnHome()}>
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
        </BaseLayout>
    );
});

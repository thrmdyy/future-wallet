import { FC, memo, useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { BaseLayout } from 'layout';
import { Button, Title } from 'components';
import { Icons } from 'assets';
import { useAppDispatch, useAppSelector, useWalletProvider } from 'hooks';
import {
    Account,
    accountActions,
    accountsSelectors,
    routerActions,
} from 'store';
import { getFormattedAddress } from 'utils';
import { routes } from 'consts';

import './AccountSelect.scss';

const CnAccountSelect = cn('accountSelect');

export const AccountSelect: FC = memo(() => {
    const dispatch = useAppDispatch();
    const accounts = useAppSelector(accountsSelectors.accounts);
    const domains = useAppSelector(accountsSelectors.domains);
    const selectedAccount = useAppSelector(accountsSelectors.selectedAccount);
    const walletProvider = useWalletProvider();

    const [loading, setLoading] = useState(false);

    const backClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.home,
            }),
        );
    }, [dispatch]);

    const logoutClickCallback = useCallback(() => {
        dispatch(accountActions.logout());
        dispatch(
            routerActions.navigate({
                path: routes.home,
            }),
        );
    }, [dispatch]);

    const addAccountClickCallback = useCallback(async () => {
        if (
            walletProvider.getAccountFromSeedPhrase &&
            selectedAccount &&
            accounts
        ) {
            setLoading(true);

            const newAccount = await walletProvider.getAccountFromSeedPhrase(
                selectedAccount?.seed,
                selectedAccount.password,
                accounts.length,
            );

            dispatch(accountActions.addAccount(newAccount));

            setLoading(false);
        }
    }, [dispatch, walletProvider, selectedAccount, accounts]);

    const accountClickCallback = useCallback(
        (account: Account) => {
            return () => dispatch(accountActions.setSelectedAccount(account));
        },
        [dispatch],
    );

    const accountsContent = useMemo(() => {
        return accounts?.map((account) => {
            const [domain] = domains[account.address]
                ? domains[account.address]
                : [null];
            const isSelected = selectedAccount?.address === account.address;

            return (
                <div
                    onClick={accountClickCallback(account)}
                    key={account.address}
                    className={CnAccountSelect('item')}
                >
                    <div className={CnAccountSelect('item-left')}>
                        <div className={CnAccountSelect('item-image')}>
                            <Icons.Account />
                        </div>

                        <div className={CnAccountSelect('item-info')}>
                            <div className={CnAccountSelect('item-name')}>
                                {domain ? domain.fullName : account.name}
                            </div>
                            <div className={CnAccountSelect('item-address')}>
                                {getFormattedAddress(account.address)}
                            </div>
                        </div>
                    </div>

                    <div className={CnAccountSelect('item-status')}>
                        {isSelected && <Icons.AccountStatus />}
                    </div>
                </div>
            );
        });
    }, [accounts, domains, selectedAccount, accountClickCallback]);

    return (
        <BaseLayout
            backClickHandler={backClickCallback}
            showUser={false}
            className={CnAccountSelect()}
        >
            <div className={CnAccountSelect('header')}>
                <Title content="Accounts" center={false} />
                <div className={CnAccountSelect('content')}>
                    {accountsContent}
                </div>
            </div>
            <div className={CnAccountSelect('actions')}>
                <Button
                    disabled={loading}
                    onClick={addAccountClickCallback}
                    view="light"
                >
                    Add account
                </Button>
                <Button onClick={logoutClickCallback} view="dark">
                    Logout
                </Button>
            </div>
        </BaseLayout>
    );
});

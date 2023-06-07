import { cn } from '@bem-react/classname';
import { Icons } from 'assets';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { fromDecimals, getFormattedAddress, getFormattedBalance } from 'utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './AccountCard.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
    accountActions,
    accountsSelectors,
    domainsActions,
    domainsSelectors,
    routerActions,
} from 'store';
import { routes } from 'consts';

const CnAccountCard = cn('accountCard');

interface IAccountCardProps {
    name?: string;
    address?: string;
    balance?: number;
    balanceSymbol?: string;
    tokenIcon?: React.ReactNode;
    decimals?: number;
}

export const AccountCard: FC<IAccountCardProps> = ({
    name,
    address,
    balance,
    balanceSymbol,
    decimals,
}) => {
    const dispatch = useAppDispatch();
    const ownedDomains = useAppSelector(accountsSelectors.currAccountDomains);

    const currDomain = useMemo(
        () => (ownedDomains ? ownedDomains[0] : null),
        [ownedDomains],
    );

    const nameContent = useMemo(() => {
        if (!currDomain) return name;

        // return currDomain.level === 1
        //     ? `.${currDomain.fullName}`
        //     : currDomain.fullName;
        return currDomain.fullName;
    }, [currDomain, name]);

    useEffect(() => {
        if (address && !currDomain) {
            dispatch(accountActions.fetchDomainsByAccountAddress(address));
        }
    }, [address, currDomain, dispatch]);

    const searchDomainsClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.account.domainsSearch,
            }),
        );
    }, [dispatch]);

    const formattedAddress = useMemo(
        () => getFormattedAddress(address),
        [address],
    );

    const formattedBalance = useMemo(() => {
        if (!balance || !decimals) return '0.00';

        return getFormattedBalance(fromDecimals(balance, decimals));
    }, [balance, decimals]);

    return (
        <div className={CnAccountCard()}>
            {/* <div className={CnAccountCard('settings')}>
                <Icons.Gear />
            </div> */}
            <div className={CnAccountCard('coin')}>
                <Icons.Venom />
            </div>
            <div className={CnAccountCard('top')}>
                <div className={CnAccountCard('name')}>{nameContent}</div>
                <div className={CnAccountCard('address')}>
                    <div className={CnAccountCard('address-label')}>
                        Address:
                    </div>
                    <CopyToClipboard text={address as string}>
                        <div className={CnAccountCard('address-value')}>
                            {formattedAddress}
                            <Icons.Copy />
                        </div>
                    </CopyToClipboard>
                </div>
            </div>

            {!currDomain ? (
                <div
                    onClick={searchDomainsClickCallback}
                    className={CnAccountCard('domain')}
                >
                    <Icons.Namer /> Take your name
                </div>
            ) : null}

            <div className={CnAccountCard('balance')}>
                {formattedBalance} {balanceSymbol}
            </div>
        </div>
    );
};

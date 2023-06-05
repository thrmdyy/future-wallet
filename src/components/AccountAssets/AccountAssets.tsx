import { cn } from '@bem-react/classname';
import { FC, memo, useMemo } from 'react';
import { tokens } from 'consts';

import './AccountAssets.scss';
import { useAppSelector } from 'hooks';
import { balanceSelectors } from 'store';
import { fromDecimals } from 'utils';

const CnAccountAssets = cn('accountAssets');

export const AccountAssets: FC = memo(() => {
    const currAccountBalance = useAppSelector(
        balanceSelectors.currAccountBalance,
    );

    const tokensContent = useMemo(() => {
        return tokens.map((token) => {
            const isVenom = token.symbol === 'VENOM';

            const balance = isVenom
                ? isNaN(currAccountBalance?.balance as number)
                    ? '0.00'
                    : fromDecimals(
                          currAccountBalance?.balance as number,
                          currAccountBalance?.decimals as number,
                      )
                : Math.floor(Math.random() * 100);

            return (
                <AccountAssetsItem
                    key={token.address}
                    name={token.name}
                    symbol={token.symbol}
                    logoURI={token.logoURI}
                    balance={balance}
                />
            );
        });
    }, [currAccountBalance]);

    return <div className={CnAccountAssets()}>{tokensContent}</div>;
});

const CnAccountAssetsItem = cn('accountAssetsItem');

interface IAccountAssetsItemProps {
    name: string;
    symbol: string;
    balance: any;
    logoURI: string;
}

const AccountAssetsItem: FC<IAccountAssetsItemProps> = ({
    name,
    symbol,
    balance,
    logoURI,
}) => {
    return (
        <div className={CnAccountAssetsItem()}>
            <div className={CnAccountAssetsItem('bg')}></div>
            <div className={CnAccountAssetsItem('asset')}>
                <div className={CnAccountAssetsItem('icon')}>
                    <img src={logoURI} alt={name} />
                </div>
                <div className={CnAccountAssetsItem('label')}>
                    <div className={CnAccountAssetsItem('name')}>{name}</div>
                    <div className={CnAccountAssetsItem('symbol')}>
                        {symbol}
                    </div>
                </div>
            </div>

            <div className={CnAccountAssetsItem('balance')}>{balance}</div>
        </div>
    );
};

import { cn } from '@bem-react/classname';
import { FC, memo, useCallback } from 'react';

import './AccountNfts.scss';
import { useAppDispatch } from 'hooks';
import { routerActions } from 'store';
import { routes } from 'consts';

const CnAccountNfts = cn('accountNfts');

export const AccountNfts: FC = memo(() => {
    return (
        <div className={CnAccountNfts()}>
            {new Array(10).fill(0).map((_, index) => (
                <AccountNftsItem key={index} />
            ))}
        </div>
    );
});

const CnAccountNftsItem = cn('accountNftsItem');

interface IAccountNftsItemProps {}

export const AccountNftsItem: FC<IAccountNftsItemProps> = memo(() => {
    const dispatch = useAppDispatch();

    const nftClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.account.nftViewer,
            }),
        );
    }, [dispatch]);

    return (
        <div onClick={nftClickCallback} className={CnAccountNftsItem()}>
            <img src="https://static.venom.network/nft_oasis.png" alt="NFT" />
            <div className={CnAccountNftsItem('label')}>Peachy Sands</div>
        </div>
    );
});

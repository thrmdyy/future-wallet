import { cn } from '@bem-react/classname';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { BaseLayout } from 'layout';
import { Button, Input, InputToken, Title } from 'components';

import './SendNft.scss';
import { balanceSelectors, routerActions } from 'store';
import { routes } from 'consts';
import { fetchDomainsByFullNameRequest } from 'api/domains';
import {
    useAppDispatch,
    useAppSelector,
    useDeferredValue,
    useWalletProvider,
} from 'hooks';
import { Domain } from 'types';
import { fromDecimals, getFormattedAddress } from 'utils';

const CnSendNft = cn('sendNft');

export const SendNft: FC = memo(() => {
    const dispatch = useAppDispatch();
    const { sendFunds } = useWalletProvider();
    const balance = useAppSelector(balanceSelectors.currAccountBalance);

    const currBalance = useMemo(
        () => (balance ? fromDecimals(balance?.balance, 9) : null),
        [balance],
    );

    const [selectedToken, setSelectedToken] = useState<any>(null);

    const selectedTokenChangeCallback = useCallback((token: any) => {
        setSelectedToken(token);
    }, []);

    const [receiver, setReceiver] = useState('');

    const [receiverDomain, setReceiverDomain] = useState<null | Domain>(null);
    const [isReceiverDomainError, setIsReceiverDomainError] =
        useState<boolean>(false);

    const deferredReceiver = useDeferredValue(receiver, 1000);

    useEffect(() => {
        if (deferredReceiver && !deferredReceiver.includes('0:')) {
            try {
                fetchDomainsByFullNameRequest(deferredReceiver)
                    .then((domain) => setReceiverDomain(domain))
                    .catch((err) => {
                        setReceiverDomain(null);
                        setIsReceiverDomainError(true);
                    });
            } catch (err: any) {
                console.log(err);
            }
        }
    }, [deferredReceiver]);

    const receiverChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (isReceiverDomainError) {
                setIsReceiverDomainError(false);
            }

            if (receiverDomain) {
                setReceiverDomain(null);
            }

            setReceiver(e.target.value);
        },
        [isReceiverDomainError, receiverDomain],
    );

    const backClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.home,
            }),
        );
    }, [dispatch]);

    return (
        <BaseLayout showBack={false} showUser={false} className={CnSendNft()}>
            <div>
                <Title content="Send your NFT" center={false} />

                <Input
                    value={receiver}
                    onChange={receiverChangeCallback}
                    placeholder="Address"
                />

                <div className={CnSendNft('nft')}>
                    <div className={CnSendNft('nft-image')}>
                        <img
                            src="https://static.venom.network/nft_w3w.png"
                            alt="NFT"
                        />
                    </div>
                    <div className={CnSendNft('nft-descr')}>
                        <div className={CnSendNft('nft-name')}>
                            Venom Network
                        </div>
                        <div className={CnSendNft('nft-collection')}>
                            Venom Foundation
                        </div>
                    </div>
                </div>

                <div className={CnSendNft('details')}>
                    <Title center={false} size="m" content="Details" />

                    <div className={CnSendNft('detailsItem')}>
                        <div className={CnSendNft('detailsItem-title')}>
                            Amount
                        </div>
                        <div className={CnSendNft('detailsItem-value')}>
                            5 VENOM
                        </div>
                    </div>
                    <div className={CnSendNft('detailsItem')}>
                        <div className={CnSendNft('detailsItem-title')}>
                            Blockchain fee
                        </div>
                        <div className={CnSendNft('detailsItem-value')}>
                            0.1321312 VENOM
                        </div>
                    </div>
                    {receiverDomain && (
                        <div className={CnSendNft('detailsItem')}>
                            <div className={CnSendNft('detailsItem-title')}>
                                Receiver by domain
                            </div>
                            <div className={CnSendNft('detailsItem-value')}>
                                {getFormattedAddress(receiverDomain.owner)}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={CnSendNft('actions')}>
                <Button>Send</Button>

                <Button onClick={backClickCallback} view="dark">
                    Back
                </Button>
            </div>
        </BaseLayout>
    );
});

import { cn } from '@bem-react/classname';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { BaseLayout } from 'layout';
import { Button, Input, InputToken, Title } from 'components';
import {
    useAppDispatch,
    useAppSelector,
    useDeferredValue,
    useWalletProvider,
} from 'hooks';
import { balanceSelectors, routerActions } from 'store';
import { routes } from 'consts';

import './SendFunds.scss';
import { fromDecimals, getFormattedAddress, toDecimals } from 'utils';
import { fetchDomainsByFullNameRequest } from 'api/domains';
import { Domain } from 'types';

const CnSendFunds = cn('sendFunds');

export const SendFunds: FC = memo(() => {
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

    const [amount, setAmount] = useState('1');

    const amountChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isNaN(Number(e.target.value))) {
                setAmount(e.target.value);
            }
        },
        [],
    );

    const backClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.home,
            }),
        );
    }, [dispatch]);

    const sendTransaction = useCallback(() => {
        if (sendFunds && receiver && amount && selectedToken) {
            const bnAmount = toDecimals(
                Number(amount),
                selectedToken.decimals,
            ).toString();

            if (receiver.includes('0:')) {
                sendFunds(receiver, bnAmount);
            } else if (receiverDomain?.owner) {
                sendFunds(receiverDomain.owner, bnAmount);
            }

            dispatch(
                routerActions.navigate({
                    path: routes.transaction.status,
                }),
            );
        }
    }, [receiver, amount, sendFunds, selectedToken, dispatch, receiverDomain]);

    const detailsContent = useMemo(() => {
        if (!receiver || !currBalance || !amount) return null;
        return (
            <div className={CnSendFunds('details')}>
                <Title center={false} size="m" content="Details" />

                <div className={CnSendFunds('detailsItem')}>
                    <div className={CnSendFunds('detailsItem-title')}>
                        Your balance
                    </div>
                    <div className={CnSendFunds('detailsItem-value')}>
                        {currBalance} VENOM
                    </div>
                </div>
                <div className={CnSendFunds('detailsItem')}>
                    <div className={CnSendFunds('detailsItem-title')}>
                        Amount
                    </div>
                    <div className={CnSendFunds('detailsItem-value')}>
                        {amount} VENOM
                    </div>
                </div>
                {receiverDomain && (
                    <div className={CnSendFunds('detailsItem')}>
                        <div className={CnSendFunds('detailsItem-title')}>
                            Receiver by domain
                        </div>
                        <div className={CnSendFunds('detailsItem-value')}>
                            {getFormattedAddress(receiverDomain.owner)}
                        </div>
                    </div>
                )}
                {/* <div className={CnSendFunds('detailsItem')}>
                    <div className={CnSendFunds('detailsItem-title')}>
                        Blockchain fee
                    </div>
                    <div className={CnSendFunds('detailsItem-value')}>
                        0.1321312 VENOM
                    </div>
                </div> */}
            </div>
        );
    }, [currBalance, amount, receiver, receiverDomain]);

    return (
        <BaseLayout showBack={false} showUser={false} className={CnSendFunds()}>
            <div>
                <Title content="Send your funds" center={false} />

                <Input
                    value={receiver}
                    onChange={receiverChangeCallback}
                    placeholder="Address or domain"
                />
                {isReceiverDomainError && (
                    <div className={CnSendFunds('error')}>Domain not found</div>
                )}

                <InputToken
                    changeTokenHandler={selectedTokenChangeCallback}
                    value={amount}
                    onChange={amountChangeCallback}
                    placeholder="Amount"
                />

                {detailsContent}
            </div>

            <div className={CnSendFunds('actions')}>
                <Button onClick={sendTransaction}>Send</Button>
                <Button onClick={backClickCallback} view="dark">
                    Back
                </Button>
            </div>
        </BaseLayout>
    );
});

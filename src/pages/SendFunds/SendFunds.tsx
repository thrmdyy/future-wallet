import { cn } from '@bem-react/classname';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { BaseLayout } from 'layout';
import { Button, Input, InputToken, Title } from 'components';
import { useAppDispatch, useAppSelector, useWalletProvider } from 'hooks';
import { balanceSelectors, routerActions } from 'store';
import { routes } from 'consts';

import './SendFunds.scss';
import { fromDecimals, toDecimals } from 'utils';

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

    const [receiver, setReceiver] = useState(
        '0:b716e5386a27df35ce19c932f1e0dc58590d4da57a20e59cc6f89e5aa1cdf8a1',
    );

    const receiverChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setReceiver(e.target.value);
        },
        [],
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

            sendFunds(receiver, bnAmount);

            dispatch(
                routerActions.navigate({
                    path: routes.transaction.status,
                }),
            );
        }
    }, [receiver, amount, sendFunds, selectedToken, dispatch]);

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
    }, [currBalance, amount, receiver]);

    return (
        <BaseLayout showBack={false} showUser={false} className={CnSendFunds()}>
            <div>
                <Title content="Send your funds" center={false} />

                <Input
                    value={receiver}
                    onChange={receiverChangeCallback}
                    placeholder="Address"
                />

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

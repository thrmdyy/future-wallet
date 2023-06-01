import { cn } from '@bem-react/classname';
import { Icons } from 'assets';
import { FC, useCallback } from 'react';
import { Button, Title } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { routerActions, transactionStatusSelectors } from 'store';
import { TransactionStatus as ITransactionStatus } from 'types';
import { routes } from 'consts';

import './TransactionStatus.scss';

const CnTransactionStatus = cn('transactionStatus');

export const TransactionStatus: FC = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(transactionStatusSelectors.status);

    const buttonClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.home,
            }),
        );
    }, [dispatch]);

    return (
        <div className={CnTransactionStatus()}>
            {status === ITransactionStatus.PENDING ? (
                <div className={CnTransactionStatus('content')}>
                    <div className={CnTransactionStatus('title')}>
                        <Title content="Transaction sending..." />
                    </div>
                    <Icons.Loader />
                </div>
            ) : (
                <div
                    className={CnTransactionStatus('content', {
                        success: true,
                    })}
                >
                    <div className={CnTransactionStatus('top')}>
                        <div className={CnTransactionStatus('title')}>
                            <Title content="Transaction has been sent successfully" />
                        </div>
                        <Icons.Success />
                    </div>
                    <Button onClick={buttonClickCallback}>Ok</Button>
                </div>
            )}
        </div>
    );
};

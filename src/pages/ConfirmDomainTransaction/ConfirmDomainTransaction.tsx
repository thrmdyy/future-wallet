import { cn } from '@bem-react/classname';
import { Button, Title } from 'components';
import { BaseLayout } from 'layout';
import { FC, memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector, useWalletProvider } from 'hooks';
import { balanceSelectors, routerActions } from 'store';
import { fromDecimals, toDecimals } from 'utils';

import './ConfirmDomainTransaction.scss';
import { routes } from 'consts';
import { useGetParentDomain } from 'hooks/useParentDomain';

const CnConfirmDomainTransaction = cn('confirmDomainTransaction');

export const ConfirmDomainTransaction: FC = memo(() => {
    const { state } = useAppSelector((state) => state.router);
    const balanceState = useAppSelector(balanceSelectors.currAccountBalance);

    const { buyDomain } = useWalletProvider();
    const dispatch = useAppDispatch();

    const balance = useMemo(
        () =>
            balanceState
                ? fromDecimals(
                      balanceState.balance,
                      balanceState.decimals,
                  ).toFixed(2)
                : null,
        [balanceState],
    );

    const domain = useMemo(() => state.domain, [state]);

    const parentDomain = useGetParentDomain(domain.parentId);

    const confirmClickCallback = useCallback(() => {
        if (buyDomain) {
            buyDomain(domain, parentDomain);

            dispatch(
                routerActions.navigate({
                    path: routes.transaction.status,
                }),
            );
        }
    }, [dispatch, domain, buyDomain, parentDomain]);

    const backClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.home,
            }),
        );
    }, [dispatch]);

    const contractDataContent = useMemo(() => {
        if (!parentDomain) return null;

        return (
            <div className={CnConfirmDomainTransaction('details')}>
                <div className={CnConfirmDomainTransaction('details-title')}>
                    Data
                </div>
                <div className={CnConfirmDomainTransaction('details-content')}>
                    <div
                        className={CnConfirmDomainTransaction(
                            'transactionData',
                        )}
                    >
                        <div
                            className={CnConfirmDomainTransaction(
                                'transactionData-title',
                            )}
                        >
                            Method:
                        </div>
                        <div
                            className={CnConfirmDomainTransaction(
                                'transactionData-value',
                            )}
                        >
                            mintNft
                        </div>
                    </div>
                    <div
                        className={CnConfirmDomainTransaction(
                            'transactionData',
                        )}
                    >
                        <div
                            className={CnConfirmDomainTransaction(
                                'transactionData-title',
                            )}
                        >
                            root
                        </div>
                        <div
                            className={CnConfirmDomainTransaction(
                                'transactionData-value',
                            )}
                        >
                            {parentDomain.address}
                        </div>
                    </div>
                    <div
                        className={CnConfirmDomainTransaction(
                            'transactionData',
                        )}
                    >
                        <div
                            className={CnConfirmDomainTransaction(
                                'transactionData-title',
                            )}
                        >
                            name
                        </div>
                        <div
                            className={CnConfirmDomainTransaction(
                                'transactionData-value',
                            )}
                        >
                            {domain.level === 1
                                ? `.${domain.fullName}`
                                : domain.fullName}
                        </div>
                    </div>
                    <div
                        className={CnConfirmDomainTransaction(
                            'transactionData',
                        )}
                    >
                        <div
                            className={CnConfirmDomainTransaction(
                                'transactionData-title',
                            )}
                        >
                            hprice
                        </div>
                        <div
                            className={CnConfirmDomainTransaction(
                                'transactionData-value',
                            )}
                        >
                            {String(fromDecimals(Number(domain.price), 9))}{' '}
                            {' VENOM'}
                        </div>
                    </div>
                    <div
                        className={CnConfirmDomainTransaction(
                            'transactionData',
                        )}
                    >
                        <div
                            className={CnConfirmDomainTransaction(
                                'transactionData-title',
                            )}
                        >
                            json
                        </div>
                        <div
                            className={CnConfirmDomainTransaction(
                                'transactionData-value',
                            )}
                        >
                            {`{ "name": "${
                                domain.level === 1
                                    ? `.${domain.fullName}`
                                    : domain.fullName
                            }" }`}
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [parentDomain, domain]);

    return (
        <BaseLayout showBack={false} className={CnConfirmDomainTransaction()}>
            <div>
                <Title content="Transaction" center={false} />

                <div className={CnConfirmDomainTransaction('details')}>
                    <div
                        className={CnConfirmDomainTransaction('details-title')}
                    >
                        Details
                    </div>
                    <div
                        className={CnConfirmDomainTransaction(
                            'details-content',
                        )}
                    >
                        <div
                            className={CnConfirmDomainTransaction(
                                'detailsItem',
                            )}
                        >
                            <div
                                className={CnConfirmDomainTransaction(
                                    'detailsItem-title',
                                )}
                            >
                                Your balance
                            </div>
                            <div
                                className={CnConfirmDomainTransaction(
                                    'detailsItem-value',
                                )}
                            >
                                <>{balance} VENOM</>
                            </div>
                        </div>
                        <div
                            className={CnConfirmDomainTransaction(
                                'detailsItem',
                            )}
                        >
                            <div
                                className={CnConfirmDomainTransaction(
                                    'detailsItem-title',
                                )}
                            >
                                Amount
                            </div>
                            <div
                                className={CnConfirmDomainTransaction(
                                    'detailsItem-value',
                                )}
                            >
                                {fromDecimals(domain.price, 9)} VENOM
                            </div>
                        </div>
                        <div
                            className={CnConfirmDomainTransaction(
                                'detailsItem',
                            )}
                        >
                            <div
                                className={CnConfirmDomainTransaction(
                                    'detailsItem-title',
                                )}
                            >
                                Blockchain fee
                            </div>
                            <div
                                className={CnConfirmDomainTransaction(
                                    'detailsItem-value',
                                )}
                            >
                                0.1321312 VENOM
                            </div>
                        </div>
                    </div>
                </div>

                {contractDataContent}
            </div>

            <div className={CnConfirmDomainTransaction('actions')}>
                <Button onClick={confirmClickCallback} view="light" size="m">
                    Confirm transaction
                </Button>
                <Button onClick={backClickCallback} view="dark" size="m">
                    Back
                </Button>
            </div>
        </BaseLayout>
    );
});

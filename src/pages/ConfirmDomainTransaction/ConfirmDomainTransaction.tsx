import { cn } from '@bem-react/classname';
import { Button, Title } from 'components';
import { BaseLayout } from 'layout';
import { FC, memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector, useWalletProvider } from 'hooks';
import { balanceSelectors, routerActions } from 'store';
import { fromDecimals } from 'utils';

import './ConfirmDomainTransaction.scss';
import { routes } from 'consts';

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

    const confirmClickCallback = useCallback(() => {
        if (buyDomain) {
            buyDomain(domain);

            dispatch(
                routerActions.navigate({
                    path: routes.transaction.status,
                }),
            );
        }
    }, [dispatch, domain, buyDomain]);

    const backClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.home,
            }),
        );
    }, [dispatch]);

    return (
        <BaseLayout className={CnConfirmDomainTransaction()}>
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
                                {domain.price} VENOM
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

                <div className={CnConfirmDomainTransaction('details')}>
                    <div
                        className={CnConfirmDomainTransaction('details-title')}
                    >
                        Data
                    </div>
                    <div
                        className={CnConfirmDomainTransaction(
                            'details-content',
                        )}
                    >
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
                                mint
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
                                owner_address
                            </div>
                            <div
                                className={CnConfirmDomainTransaction(
                                    'transactionData-value',
                                )}
                            >
                                0:45835b554d30a9fa2c771b6da93a1cb17f9338e6a88a890669a35fc4edf5bfb8
                            </div>
                        </div>
                    </div>
                </div>
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

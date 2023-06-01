import { cn } from '@bem-react/classname';
import { Button, Title } from 'components';
import { BaseLayout } from 'layout';
import { FC, memo } from 'react';

import './ConfirmTransaction.scss';

const CnConfirmTransaction = cn('confirmTransaction');

export const ConfirmTransaction: FC = memo(() => {
    return (
        <BaseLayout className={CnConfirmTransaction()}>
            <div>
                <Title content="Transaction" center={false} />

                <div className={CnConfirmTransaction('details')}>
                    <div className={CnConfirmTransaction('details-title')}>
                        Details
                    </div>
                    <div className={CnConfirmTransaction('details-content')}>
                        <div className={CnConfirmTransaction('detailsItem')}>
                            <div
                                className={CnConfirmTransaction(
                                    'detailsItem-title',
                                )}
                            >
                                Your balance
                            </div>
                            <div
                                className={CnConfirmTransaction(
                                    'detailsItem-value',
                                )}
                            >
                                8.498 VENOM
                            </div>
                        </div>
                        <div className={CnConfirmTransaction('detailsItem')}>
                            <div
                                className={CnConfirmTransaction(
                                    'detailsItem-title',
                                )}
                            >
                                Amount
                            </div>
                            <div
                                className={CnConfirmTransaction(
                                    'detailsItem-value',
                                )}
                            >
                                5 VENOM
                            </div>
                        </div>
                        <div className={CnConfirmTransaction('detailsItem')}>
                            <div
                                className={CnConfirmTransaction(
                                    'detailsItem-title',
                                )}
                            >
                                Blockchain fee
                            </div>
                            <div
                                className={CnConfirmTransaction(
                                    'detailsItem-value',
                                )}
                            >
                                0.1321312 VENOM
                            </div>
                        </div>
                    </div>
                </div>

                <div className={CnConfirmTransaction('details')}>
                    <div className={CnConfirmTransaction('details-title')}>
                        Data
                    </div>
                    <div className={CnConfirmTransaction('details-content')}>
                        <div
                            className={CnConfirmTransaction('transactionData')}
                        >
                            <div
                                className={CnConfirmTransaction(
                                    'transactionData-title',
                                )}
                            >
                                Method:
                            </div>
                            <div
                                className={CnConfirmTransaction(
                                    'transactionData-value',
                                )}
                            >
                                WRAP
                            </div>
                        </div>
                        <div
                            className={CnConfirmTransaction('transactionData')}
                        >
                            <div
                                className={CnConfirmTransaction(
                                    'transactionData-title',
                                )}
                            >
                                owner_address
                            </div>
                            <div
                                className={CnConfirmTransaction(
                                    'transactionData-value',
                                )}
                            >
                                0:45835b554d30a9fa2c771b6da93a1cb17f9338e6a88a890669a35fc4edf5bfb8
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={CnConfirmTransaction('actions')}>
                <Button view="light" size="m">
                    Confirm transaction
                </Button>
                <Button view="dark" size="m">
                    Back
                </Button>
            </div>
        </BaseLayout>
    );
});

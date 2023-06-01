import { FC, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { AuthLayout } from 'layout';
import { Button } from 'components';
import { useNavigate } from 'react-router-dom';
import { routes } from 'consts';
import { CreateAccountSteps, createAccountActions, routerActions } from 'store';
import { useAppDispatch } from 'hooks';

import './Welcome.scss';

const CnWelcome = cn('welcome');

export const Welcome: FC = () => {
    const dispatch = useAppDispatch();

    const createNewAccountClickCallback = useCallback(() => {
        dispatch(createAccountActions.setStep(CreateAccountSteps.NEW_SEED));
        dispatch(
            routerActions.navigate({
                path: routes.createAccount[CreateAccountSteps.NEW_SEED],
            }),
        );
    }, [dispatch]);

    const siningWithSeedClickCallback = useCallback(() => {
        dispatch(createAccountActions.setStep(CreateAccountSteps.ENTER_SEED));
        dispatch(
            routerActions.navigate({
                path: routes.createAccount[CreateAccountSteps.ENTER_SEED],
            }),
        );
    }, [dispatch]);

    return (
        <AuthLayout
            title="Welcome to Crypto wallet"
            subtitle="Create a new wallet or sign in"
            className={CnWelcome()}
        >
            <div className={CnWelcome('action')}>
                <Button
                    onClick={createNewAccountClickCallback}
                    view="light"
                    size="m"
                >
                    Create new wallet
                </Button>
                <Button
                    onClick={siningWithSeedClickCallback}
                    view="dark"
                    size="m"
                >
                    Signing with seed phrase
                </Button>
            </div>
        </AuthLayout>
    );
};

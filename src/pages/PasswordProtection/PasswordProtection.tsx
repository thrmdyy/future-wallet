import { FC, useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { AuthLayout } from 'layout';
import { Button, Input } from 'components';
import { Icons } from 'assets';
import { useNavigate } from 'react-router-dom';

import './PasswordProtection.scss';
import { useAppDispatch, useAppSelector, useWalletProvider } from 'hooks';
import {
    CreateAccountSteps,
    accountActions,
    createAccountActions,
    createAccountSelectors,
    routerActions,
} from 'store';
import { routes } from 'consts';

const CnPasswordProtection = cn('passwordProtection');

export const PasswordProtection: FC = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const passwordChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        },
        [],
    );

    const passwordConfirmChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordConfirm(e.target.value);
        },
        [],
    );

    const isError = useMemo(() => {
        if (password.length < 6) return true;

        return password !== passwordConfirm;
    }, [password, passwordConfirm]);

    const walletProvider = useWalletProvider();
    const dispatch = useAppDispatch();
    const seedPhraseArr = useAppSelector(createAccountSelectors.seedPhrase);

    const createWalletClickCallback = useCallback(async () => {
        if (isError) return;
        if (!walletProvider.getAccountsFromSeedPhrase) return;
        if (!seedPhraseArr) return;

        try {
            const seedPhrase = seedPhraseArr?.join(' ');

            const accounts = await walletProvider.getAccountsFromSeedPhrase(
                seedPhrase,
                password,
            );

            dispatch(accountActions.addAccounts(accounts));

            dispatch(
                routerActions.navigate({
                    path: routes.home,
                }),
            );
        } catch {}
    }, [isError, walletProvider, dispatch, seedPhraseArr, password]);

    const backClickCallback = useCallback(() => {
        dispatch(
            createAccountActions.setStep(CreateAccountSteps.CHECK_NEW_SEED),
        );
        dispatch(
            routerActions.navigate({
                path: routes.createAccount[CreateAccountSteps.CHECK_NEW_SEED],
            }),
        );
    }, [dispatch]);

    return (
        <AuthLayout
            title="Password protection"
            className={CnPasswordProtection()}
        >
            <div className={CnPasswordProtection('form')}>
                <Input
                    leftContent={<Icons.LockPurple />}
                    type="password"
                    value={password}
                    onChange={passwordChangeCallback}
                    placeholder="Password"
                />
                <Input
                    leftContent={<Icons.LockGreen />}
                    type="password"
                    value={passwordConfirm}
                    onChange={passwordConfirmChangeCallback}
                    placeholder="Confirm password"
                />
            </div>
            <div className={CnPasswordProtection('action')}>
                <Button
                    onClick={createWalletClickCallback}
                    disabled={isError}
                    view="light"
                    size="m"
                >
                    Create the wallet
                </Button>
                <Button onClick={backClickCallback} view="dark" size="m">
                    Back
                </Button>
            </div>
        </AuthLayout>
    );
};

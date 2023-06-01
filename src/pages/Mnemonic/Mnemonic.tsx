import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { AuthLayout } from 'layout';
import { Button, Seed } from 'components';
import { useAppDispatch, useWalletProvider } from 'hooks';
import copy from 'copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import { routes } from 'consts';
import { CreateAccountSteps, createAccountActions, routerActions } from 'store';

import './Mnemonic.scss';

const CnMnemonic = cn('mnemonic');

export const Mnemonic: FC = () => {
    const walletProvider = useWalletProvider();
    const [seedPhrase, setSeedPhrase] = useState<null | string>(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (walletProvider.getRandomSeedPhrase && !seedPhrase) {
            walletProvider.getRandomSeedPhrase().then(setSeedPhrase);
        }
    }, [walletProvider, seedPhrase]);

    const copyClickCallback = useCallback(() => {
        if (seedPhrase) {
            setIsCopied(true);
            copy(seedPhrase);
        }
    }, [seedPhrase]);

    const isCopyDisabled = useMemo(
        () => !seedPhrase || isCopied,
        [seedPhrase, isCopied],
    );

    const copyButtonContent = useMemo(() => {
        return (
            <Button
                onClick={copyClickCallback}
                disabled={isCopyDisabled}
                view="light"
                size="m"
            >
                {isCopied ? 'Copied' : 'Copy all words'}
            </Button>
        );
    }, [isCopied, copyClickCallback, isCopyDisabled]);

    const dispatch = useAppDispatch();

    const nextStepClickCallback = useCallback(() => {
        if (seedPhrase) {
            dispatch(
                createAccountActions.setSeedPhrase(seedPhrase?.split(' ')),
            );
            dispatch(
                createAccountActions.setStep(CreateAccountSteps.CHECK_NEW_SEED),
            );
            dispatch(
                routerActions.navigate({
                    path: routes.createAccount[
                        CreateAccountSteps.CHECK_NEW_SEED
                    ],
                }),
            );
        }
    }, [seedPhrase, dispatch]);

    const backClickCallback = useCallback(() => {
        dispatch(createAccountActions.setStep(CreateAccountSteps.WELCOME));
        dispatch(
            routerActions.navigate({
                path: routes.createAccount[CreateAccountSteps.WELCOME],
            }),
        );
    }, [dispatch]);

    return (
        <AuthLayout title="Seed phrase" className={CnMnemonic()}>
            <Seed phrase={seedPhrase ?? ''} />

            <div className={CnMnemonic('action')}>
                <Button onClick={nextStepClickCallback} view="light" size="m">
                    I wrote it down on paper
                </Button>
                {copyButtonContent}
                <Button onClick={backClickCallback} view="dark" size="m">
                    Back
                </Button>
            </div>
        </AuthLayout>
    );
};

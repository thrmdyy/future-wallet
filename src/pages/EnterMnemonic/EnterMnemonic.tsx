import { FC, memo, useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { AuthLayout } from 'layout';
import { Button, Input, NumberBadge } from 'components';
import { useAppDispatch } from 'hooks';
import { CreateAccountSteps, createAccountActions, routerActions } from 'store';
import { useNavigate } from 'react-router-dom';
import { routes } from 'consts';

import './EnterMnemonic.scss';

const CnEnterMnemonic = cn('enterMnemonic');

const WORDS_COUNT = 12;

export const EnterMnemonic: FC = memo(() => {
    const [words, setWords] = useState<Record<number, string>>({});

    const wordsChangeCallback = useCallback((index: number) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const text = e.target.value.replace(/\s/g, '');
            setWords((prev) => ({ ...prev, [index]: text }));
        };
    }, []);

    const formContent = useMemo(() => {
        return new Array(WORDS_COUNT).fill(0).map((_, index) => {
            return (
                <Input
                    key={index}
                    leftContent={<NumberBadge content={String(index + 1)} />}
                    placeholder="Word..."
                    value={words[index] ?? ''}
                    onChange={wordsChangeCallback(index)}
                />
            );
        });
    }, [words, wordsChangeCallback]);

    const dispatch = useAppDispatch();

    const backClickCallback = useCallback(() => {
        dispatch(createAccountActions.setStep(CreateAccountSteps.NEW_SEED));
        dispatch(
            routerActions.navigate({
                path: routes.createAccount[CreateAccountSteps.NEW_SEED],
            }),
        );
    }, [dispatch]);

    const isAnswerCorrect = useMemo(() => {
        const wordsKeys = Object.keys(words);

        if (!wordsKeys.length || wordsKeys.length !== WORDS_COUNT) return false;

        return true;
    }, [words]);

    const confirmClickCallback = useCallback(() => {
        if (isAnswerCorrect) {
            const seedPhrase = Object.values(words);

            dispatch(createAccountActions.setSeedPhrase(seedPhrase));
            dispatch(
                createAccountActions.setStep(CreateAccountSteps.ADD_PASSWORD),
            );
            dispatch(
                routerActions.navigate({
                    path: routes.createAccount[CreateAccountSteps.ADD_PASSWORD],
                }),
            );
        }
    }, [isAnswerCorrect, words, dispatch]);

    return (
        <AuthLayout
            title="Enter your seed phrase"
            className={CnEnterMnemonic()}
        >
            <div className={CnEnterMnemonic('form')}>{formContent}</div>
            <div className={CnEnterMnemonic('action')}>
                <Button
                    disabled={!isAnswerCorrect}
                    onClick={confirmClickCallback}
                    view="light"
                    size="m"
                >
                    Confirm
                </Button>
                <Button onClick={backClickCallback} view="dark" size="m">
                    Back
                </Button>
            </div>
        </AuthLayout>
    );
});

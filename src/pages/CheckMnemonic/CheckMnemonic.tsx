import { FC, memo, useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { AuthLayout } from 'layout';
import { Button, Input, NumberBadge } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
    CreateAccountSteps,
    createAccountActions,
    createAccountSelectors,
    routerActions,
} from 'store';
import { getRandomFromNumber } from 'utils';
import { useNavigate } from 'react-router-dom';
import { routes } from 'consts';

import './CheckMnemonic.scss';

const CnCheckMnemonic = cn('checkMnemonic');

export const CheckMnemonic: FC = memo(() => {
    const seedPhrase = useAppSelector(createAccountSelectors.seedPhrase);
    const [words, setWords] = useState<Record<number, string>>({});

    const wordsChangeCallback = useCallback((index: number) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const text = e.target.value.replace(/\s/g, '');
            setWords((prev) => ({ ...prev, [index]: text }));
        };
    }, []);

    const randomIndexes = useMemo(() => {
        const result: number[] = [];

        if (!seedPhrase) return result;

        while (result.length < 4) {
            const randomNumber = getRandomFromNumber(seedPhrase.length - 1);

            if (!result.includes(randomNumber)) {
                result.push(randomNumber);
            }
        }

        return result;
    }, [seedPhrase]);

    const formContent = useMemo(() => {
        return randomIndexes.map((index) => {
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
    }, [randomIndexes, words, wordsChangeCallback]);

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
        if (!seedPhrase) return false;

        const wordsKeys = Object.keys(words);

        if (!wordsKeys.length || wordsKeys.length !== 4) return false;

        return wordsKeys?.every((wordsKey) => {
            const index = Number(wordsKey);

            const word = words[index];
            const seedPhraseWord = seedPhrase[index];

            return word === seedPhraseWord;
        });
    }, [words, seedPhrase]);

    const confirmClickCallback = useCallback(() => {
        if (isAnswerCorrect) {
            dispatch(
                createAccountActions.setStep(CreateAccountSteps.ADD_PASSWORD),
            );
            dispatch(
                routerActions.navigate({
                    path: routes.createAccount[CreateAccountSteps.ADD_PASSWORD],
                }),
            );
        }
    }, [isAnswerCorrect, dispatch]);

    return (
        <AuthLayout
            title="Lets check seed phrase"
            className={CnCheckMnemonic()}
        >
            <div className={CnCheckMnemonic('form')}>{formContent}</div>
            <div className={CnCheckMnemonic('action')}>
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

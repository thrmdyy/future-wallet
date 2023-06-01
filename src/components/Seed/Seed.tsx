import { FC, memo, useMemo } from 'react';
import { cn } from '@bem-react/classname';

import './Seed.scss';

const CnSeed = cn('seed');

interface ISeedProps {
    phrase: string;
}

export const Seed: FC<ISeedProps> = memo(({ phrase }) => {
    const phraseArray = useMemo(() => phrase.split(' '), [phrase]);

    const seedContent = useMemo(() => {
        const firstColumnItems = phraseArray.slice(0, 6);
        const secondColumnItems = phraseArray.slice(6, 12);

        const firstColumn = firstColumnItems.map((word, index) => (
            <SeedItem key={index} index={index} word={word} />
        ));

        const secondColumn = secondColumnItems.map((word, index) => (
            <SeedItem key={index} index={index + 6} word={word} />
        ));

        return (
            <>
                <div className={CnSeed('column')}>{firstColumn}</div>
                <div className={CnSeed('column')}>{secondColumn}</div>
            </>
        );
    }, [phraseArray]);

    return <div className={CnSeed()}>{seedContent}</div>;
});

const CnSeedItem = cn('seedItem');

const SeedItem: FC<{ word: string; index: number }> = memo(
    ({ word, index }) => {
        return (
            <div className={CnSeedItem()}>
                <div className={CnSeedItem('number')}>{`${index + 1}.`}</div>
                <div className={CnSeedItem('word')}>{word}</div>
            </div>
        );
    },
);

import { FC, memo } from 'react';
import { cn } from '@bem-react/classname';

import './Title.scss';

const CnTitle = cn('title');

interface ITitleProps {
    size?: 'l' | 'm' | 's';
    content: string;
    center?: boolean;
}

export const Title: FC<ITitleProps> = memo(
    ({ content, center = true, size = 'l' }) => {
        return <div className={CnTitle({ center, size })}>{content}</div>;
    },
);

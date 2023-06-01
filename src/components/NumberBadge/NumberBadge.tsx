import { FC, memo } from 'react';
import { cn } from '@bem-react/classname';

import './NumberBadge.scss';

const CnNumberBadge = cn('numberBadge');

interface INumberBadgeProps {
    content: string;
}

export const NumberBadge: FC<INumberBadgeProps> = memo(({ content }) => {
    return <div className={CnNumberBadge()}>{content}</div>;
});

import { FC, memo } from 'react';
import { cn } from '@bem-react/classname';

import './Subtitle.scss';

const CnSubtitle = cn('subtitle');

interface ISubtitleProps {
    content: string;
}

export const Subtitle: FC<ISubtitleProps> = memo(({ content }) => {
    return <div className={CnSubtitle()}>{content}</div>;
});

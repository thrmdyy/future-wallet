import { FC, memo } from 'react';
import { cn } from '@bem-react/classname';

import './Input.scss';

const CnInput = cn('input');

interface IInputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    leftContent?: React.ReactNode;
}

export const Input: FC<IInputProps> = memo(({ leftContent, ...props }) => {
    return (
        <div className={CnInput()}>
            {leftContent && (
                <div className={CnInput('left')}>{leftContent}</div>
            )}
            <input
                {...props}
                className={CnInput('input', { withLeftContent: !!leftContent })}
            />
        </div>
    );
});

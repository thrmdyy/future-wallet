import { FC, memo } from 'react';
import { cn } from '@bem-react/classname';

import './Button.scss';

const CnButton = cn('button');

interface IButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    size?: 's' | 'm' | 'l';
    view?: 'light' | 'dark' | 'icon' | 'dark-icon';
}

export const Button: FC<IButtonProps> = memo(
    ({ size = 'm', view = 'light', disabled, ...props }) => {
        return (
            <button
                {...props}
                disabled={disabled}
                className={CnButton({ size, view, disabled })}
            />
        );
    },
);

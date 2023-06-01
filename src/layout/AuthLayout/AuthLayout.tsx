import { FC, memo } from 'react';
import { cn } from '@bem-react/classname';

import './AuthLayout.scss';
import { Icons } from 'assets';
import { Subtitle, Title } from 'components';

const CnAuthLayout = cn('authLayout');

interface IAuthLayoutProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
}

export const AuthLayout: FC<IAuthLayoutProps> = memo(
    ({ children, className, title, subtitle }) => {
        return (
            <div className={CnAuthLayout({}, className)}>
                <div className={CnAuthLayout('header')}>
                    <Icons.Robot className={CnAuthLayout('icon')} />
                    {title && <Title content={title} />}
                    {subtitle && <Subtitle content={subtitle} />}
                </div>
                <div className={CnAuthLayout('content')}>{children}</div>
            </div>
        );
    },
);

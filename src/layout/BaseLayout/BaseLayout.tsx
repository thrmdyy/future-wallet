import { FC, memo } from 'react';
import { cn } from '@bem-react/classname';
import { Icons } from 'assets';
import { Button, NetworkSelect } from 'components';

import './BaseLayout.scss';

const CnBaseLayout = cn('baseLayout');

interface IBaseLayoutProps {
    children: React.ReactNode;
    className?: string;
    showUser?: boolean;
    showBack?: boolean;
    backClickHandler?: () => void;
    userClickHandler?: () => void;
    showNetworkSelect?: boolean;
}

export const BaseLayout: FC<IBaseLayoutProps> = memo(
    ({
        children,
        className,
        showBack = true,
        showNetworkSelect = true,
        showUser = true,
        backClickHandler,
        userClickHandler,
    }) => {
        return (
            <div className={CnBaseLayout({}, className)}>
                <div className={CnBaseLayout('header')}>
                    {showBack ? (
                        <Button onClick={backClickHandler} view="icon">
                            <Icons.Back />
                        </Button>
                    ) : (
                        <div className={CnBaseLayout('empty')}></div>
                    )}
                    {showNetworkSelect ? <NetworkSelect /> : <div></div>}
                    {showUser ? (
                        <Button onClick={userClickHandler} view="icon">
                            <Icons.User />
                        </Button>
                    ) : (
                        <div className={CnBaseLayout('empty')}></div>
                    )}
                </div>
                <div className={CnBaseLayout('content')}>{children}</div>
            </div>
        );
    },
);

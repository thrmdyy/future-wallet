import { cn } from '@bem-react/classname';
import { Icons } from 'assets';
import { FC, useCallback } from 'react';
import { useAppDispatch } from 'hooks';
import { routerActions } from 'store';
import { routes } from 'consts';

import './AccountActions.scss';

const CnAccountActions = cn('accountActions');

export const AccountActions: FC = () => {
    const dispatch = useAppDispatch();

    const sendClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.account.sendFunds,
            }),
        );
    }, [dispatch]);

    return (
        <div className={CnAccountActions()}>
            <AccountActionsItem
                onClick={sendClickCallback}
                label="Send"
                icon={<Icons.Send />}
            />
            <AccountActionsItem
                label="Receive"
                icon={<Icons.Receive />}
                disabled
            />
            <AccountActionsItem label="Swap" icon={<Icons.Swap />} disabled />
        </div>
    );
};

const CnAccountActionsItem = cn('accountActionsItem');

interface IAccountActionsItem {
    label: string;
    icon?: any;
    disabled?: boolean;
    onClick?: () => void;
}

const AccountActionsItem: FC<IAccountActionsItem> = ({
    label,
    icon,
    onClick,
    disabled = false,
}) => {
    return (
        <div onClick={onClick} className={CnAccountActionsItem({ disabled })}>
            {icon}
            {label}
        </div>
    );
};

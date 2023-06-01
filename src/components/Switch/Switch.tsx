import { cn } from '@bem-react/classname';
import { FC, memo, useCallback, useState } from 'react';

import './Switch.scss';

const CnSwitch = cn('switch');

interface ISwichProps {
    items: {
        onClick: (label: string) => void;
        label: string;
    }[];
}

export const Switch: FC<ISwichProps> = memo(({ items }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(
        items[0].label,
    );

    const selectedItemChangeCallback = useCallback(
        (label: string, cb: (label: string) => void) => {
            return () => {
                setSelectedItem(label);
                cb(label);
            };
        },
        [],
    );

    return (
        <div className={CnSwitch()}>
            {items.map(({ label, onClick }) => (
                <div
                    onClick={selectedItemChangeCallback(label, onClick)}
                    className={CnSwitch('item', {
                        selected: label === selectedItem,
                    })}
                >
                    {label}
                </div>
            ))}
        </div>
    );
});

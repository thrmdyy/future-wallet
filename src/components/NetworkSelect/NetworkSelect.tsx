import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';

import './NetworkSelect.scss';

const CnNetworkSelect = cn('networkSelect');

export const NetworkSelect: FC = memo(() => {
    return (
        <div className={CnNetworkSelect()}>
            <div className={CnNetworkSelect('item')}>Testnet</div>
        </div>
    );
});

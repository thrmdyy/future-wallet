import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { Router } from 'providers';

const CnApp = cn('app');

export const App: FC = () => {
    return (
        <div className={CnApp()}>
            <Router />
        </div>
    );
};

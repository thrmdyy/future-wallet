import { createAction } from '@reduxjs/toolkit';

const navigate = createAction<{
    path: string;
    state?: any;
}>('@router/navigate');

export const routerActions = {
    navigate,
};

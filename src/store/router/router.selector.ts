import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';

const routerSelector = (state: State) => state.router;

const path = createSelector(routerSelector, (routerState) => routerState.path);

export const routerSelectors = {
    path,
};

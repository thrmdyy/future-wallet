import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { routerActions } from './router.action';

export interface RouterState {
    path: string;
    state: any;
}

const initialState: RouterState = {
    path: '/',
    state: {},
};

export const routerSlice = createSlice<
    RouterState,
    SliceCaseReducers<RouterState>
>({
    name: 'router',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            routerActions.navigate,
            (state, { payload: { path, state: routerState } }) => {
                state.path = path;
                state.state = routerState;
            },
        );
    },
});

export const routerReducer = routerSlice.reducer;

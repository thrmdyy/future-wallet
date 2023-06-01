import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { CreateAccountSteps } from './createAccount.types';
import { createAccountActions } from './createAccount.action';

export interface CreateAccountState {
    step: CreateAccountSteps;
    seedPhrase: string[] | null;
    password: string;
}

const initialState: CreateAccountState = {
    step: CreateAccountSteps.WELCOME,
    seedPhrase: null,
    password: '',
};

export const createAccountSlice = createSlice<
    CreateAccountState,
    SliceCaseReducers<CreateAccountState>
>({
    name: 'createAccount',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccountActions.setStep, (state, { payload }) => {
            state.step = payload;
        });

        builder.addCase(
            createAccountActions.setSeedPhrase,
            (state, { payload }) => {
                state.seedPhrase = payload;
            },
        );

        builder.addCase(
            createAccountActions.setPassword,
            (state, { payload }) => {
                state.password = payload;
            },
        );
    },
});

export const createAccountReducer = createAccountSlice.reducer;

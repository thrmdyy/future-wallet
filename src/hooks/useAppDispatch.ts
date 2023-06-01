import { AnyAction, CombinedState, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Action, State } from 'store/store';

export const useAppDispatch = (): ThunkDispatch<
    CombinedState<State>,
    null,
    AnyAction
> => useDispatch<Action>();

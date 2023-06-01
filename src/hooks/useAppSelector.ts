import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { State } from 'store/store';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

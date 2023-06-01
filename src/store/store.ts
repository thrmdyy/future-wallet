import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { ignoredActions } from './store.constants';
import { persistStore } from 'redux-persist';

export const store = configureStore({
    reducer: rootReducer,
    enhancers: [],
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions,
            },
        }),
});

export const persistor = persistStore(store);

export type State = ReturnType<typeof store.getState>;
export type Action = typeof store.dispatch;

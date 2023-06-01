import { createContext } from 'react';
import { IWalletProviderContext } from './WalletProvider.types';

export const SEED_PHRASE_WORDS_COUNT = 12;

export const WalletProviderContext = createContext<IWalletProviderContext>({});

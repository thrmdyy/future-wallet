import { IWalletProviderContext, WalletProviderContext } from 'providers';
import { useContext } from 'react';

export const useWalletProvider = () => useContext<any>(WalletProviderContext);

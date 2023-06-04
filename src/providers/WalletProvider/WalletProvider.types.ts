import { Account } from '@eversdk/appkit';
import { Domain } from 'types';

export interface IWalletProviderContext {
    account?: Account;
    getRandomSeedPhrase?: () => Promise<string>;
    getAccountFromSeedPhrase?: (
        seedPhrase: string,
        password: string,
        index?: number,
    ) => Promise<any>;
    getAccountsFromSeedPhrase?: (
        seedPhrase: string,
        password: string,
    ) => Promise<any>;
    sendFunds?: (receiveAddress: string, amount: string) => Promise<any>;
    buyDomain?: (domain: Domain) => Promise<any>;
}

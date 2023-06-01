import { Account } from '@eversdk/appkit';

export interface IWalletProviderContext {
    account?: Account;
    getRandomSeedPhrase?: () => Promise<string>;
    getAccountFromSeedPhrase?: (
        seedPhrase: string,
    ) => Promise<{
        address: string;
        publicKey: string;
        privateKey: string;
        tvc: string;
        boc: string;
    }>;
    sendFunds?: (receiveAddress: string, amount: string) => Promise<any>;
}

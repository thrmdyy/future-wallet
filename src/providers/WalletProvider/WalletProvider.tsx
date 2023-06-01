import React, { FC, useCallback, useEffect, useState } from 'react';
import { tonClient } from '../TonClient';
import {
    KeyPair,
    MnemonicDictionary,
    abiContract,
    signerKeys,
} from '@eversdk/core';
import {
    SEED_PHRASE_WORDS_COUNT,
    WalletProviderContext,
} from './WalletProvider.constants';
import { accountContract, routes } from 'consts';
import { Account } from '@eversdk/appkit';
import {
    Account as IAccount,
    balanceActions,
    routerActions,
    transactionStatusActions,
} from 'store';
import { useAppDispatch, useAppSelector } from 'hooks';
import { accountsSelectors } from 'store';
import { nftContract } from 'consts/contracts';
import { TransactionStatus } from 'types';

interface IWalletProviderProps {
    children: React.ReactNode;
}

export const WalletProvider: FC<IWalletProviderProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const [account, setAccount] = useState<undefined | Account>();

    const selectedAccount = useAppSelector(accountsSelectors.selectedAccount);

    const getContractData = useCallback(async (publicKey: string) => {
        const contractBOC = (
            await tonClient.abi.encode_boc({
                params: [
                    { name: 'publicKey', type: 'uint256' },
                    { name: 'timestamp', type: 'uint64' },
                ],
                data: {
                    publicKey: `0x` + publicKey,
                    timestamp: 0,
                },
            })
        ).boc;

        const contractTVC = await tonClient.boc.encode_tvc({
            code: accountContract.code,
            data: contractBOC,
        });

        return { boc: contractBOC, tvc: contractTVC.tvc };
    }, []);

    const getAccountFromAddress = useCallback((address: string) => {
        return new Account(
            {
                abi: accountContract.abi,
                tvc: accountContract.code,
            },
            {
                client: tonClient,
                address: address,
            },
        );
    }, []);

    useEffect(() => {
        if (selectedAccount) {
            updateAccountData(selectedAccount);
        }
    }, [selectedAccount]);

    const updateBalance = useCallback(
        async (account: Account, address: string) => {
            try {
                const balance = await account.getBalance();

                dispatch(
                    balanceActions.updateBalance({
                        address,
                        symbol: 'VENOM',
                        balance: Number(balance),
                        decimals: 9,
                    }),
                );
            } catch {
                dispatch(
                    balanceActions.updateBalance({
                        address,
                        symbol: 'VENOM',
                        balance: Number(0),
                        decimals: 9,
                    }),
                );
            }
        },
        [dispatch],
    );

    const updateAccountData = useCallback(
        async (newAccount: IAccount) => {
            try {
                const account = getAccountFromAddress(newAccount.address);

                setAccount(account);

                await updateBalance(account, newAccount.address);
            } catch {}
        },
        [getAccountFromAddress, updateBalance],
    );

    const getKeyPairFromSeedPhrase = useCallback(async (phrase: string) => {
        return await tonClient.crypto.mnemonic_derive_sign_keys({
            phrase,
            dictionary: MnemonicDictionary.English,
            word_count: SEED_PHRASE_WORDS_COUNT,
        });
    }, []);

    const getRandomSeedPhrase = useCallback(async () => {
        return await tonClient.crypto
            .mnemonic_from_random({
                word_count: SEED_PHRASE_WORDS_COUNT,
                dictionary: MnemonicDictionary.English,
            })
            .then((result) => result.phrase);
    }, []);

    const getSignerKeys = useCallback((keyPair: KeyPair) => {
        return signerKeys(keyPair);
    }, []);

    const getAccountFromSeedPhrase = useCallback(
        async (seedPhrase: string) => {
            const keyPair = await getKeyPairFromSeedPhrase(seedPhrase);

            const { tvc, boc } = await getContractData(keyPair.public);

            const address =
                `0:` + (await tonClient.boc.get_boc_hash({ boc: tvc })).hash;

            return {
                address,
                publicKey: keyPair.public,
                privateKey: keyPair.secret,
                tvc,
                boc,
            };
        },
        [getKeyPairFromSeedPhrase, getContractData],
    );

    const sendFunds = useCallback(
        async (receiveAddress: string, amount: string) => {
            if (!selectedAccount || !account) return;

            try {
                dispatch(
                    transactionStatusActions.setTransactionStatus(
                        TransactionStatus.PENDING,
                    ),
                );

                const accountAbi = JSON.stringify(accountContract.abi);

                const keypair = {
                    public: selectedAccount?.publicKey,
                    secret: selectedAccount?.privateKey,
                } as KeyPair;

                const response = await tonClient.abi.encode_message_body({
                    address: selectedAccount?.address,
                    abi: {
                        type: 'Json',
                        value: accountAbi,
                    },
                    call_set: {
                        function_name: 'sendTransaction',
                        input: {
                            dest: receiveAddress,
                            value: amount,
                            bounce: false,
                            flags: 3,
                            payload: '',
                        },
                    },
                    is_internal: false,
                    signer: {
                        type: 'Keys',
                        keys: keypair,
                    },
                });

                const deployAndTransferMsg =
                    await tonClient.boc.encode_external_in_message({
                        dst: selectedAccount?.address,
                        init: selectedAccount?.tvc,
                        body: response.body,
                    });

                const sendRequestResult =
                    await tonClient.processing.send_message({
                        message: deployAndTransferMsg.message,
                        send_events: false,
                    });

                const { transaction } =
                    await tonClient.processing.wait_for_transaction({
                        abi: { type: 'Json', value: accountAbi },
                        message: deployAndTransferMsg.message,
                        shard_block_id: sendRequestResult.shard_block_id,
                        send_events: false,
                    });

                dispatch(
                    transactionStatusActions.setTransactionStatus(
                        TransactionStatus.SUCCESS,
                    ),
                );

                updateBalance(account, selectedAccount?.address);

                return transaction;
            } catch {
                // dispatch(
                //     routerActions.navigate({
                //         path: routes.home,
                //     }),
                // );
            }
        },
        [selectedAccount, dispatch, account, updateBalance],
    );

    // useEffect(() => {
    //     (async () => {
    //         const response = await tonClient.processing.process_message({
    //             message_encode_params: {
    //                 abi: abiContract(nftContract.abi),
    //                 address:
    //                     '0:85ac9e08f378369780c070b0490e84f55d523327e4adb645915e17422fce967b',
    //                 call_set: {
    //                     function_name: 'mintNft',
    //                     input: {
    //                         json: "{name: 'TIMUR'}",
    //                     },
    //                 },
    //                 signer: {
    //                     type: 'Keys',
    //                     keys: {
    //                         public: selectedAccount?.publicKey as string,
    //                         secret: selectedAccount?.privateKey as string,
    //                     },
    //                 },
    //             },
    //             send_events: false,
    //         });

    //         console.log(response);
    //     })();
    // }, []);

    return (
        <WalletProviderContext.Provider
            value={{
                account,
                getRandomSeedPhrase,
                getAccountFromSeedPhrase,
                sendFunds,
            }}
        >
            {children}
        </WalletProviderContext.Provider>
    );
};

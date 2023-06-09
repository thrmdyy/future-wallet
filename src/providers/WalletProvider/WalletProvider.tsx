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
import { nftContract, nftMinterContract } from 'consts/contracts';
import { AccountType, Domain, TransactionStatus } from 'types';
import { getPathFromIndex } from 'utils/getPathFromIndex';
import { toDecimals } from 'utils';
import { fetchDomainsFromContractRequest } from 'api/domains';

const collectionAddress =
    '0:01a2164e2b66a4b3eefc23f831d778fb0a7018148d1938d99c874588fd7a1965';

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

    const getKeyPairFromSeedPhrase = useCallback(
        async (phrase: string, index?: number) => {
            return await tonClient.crypto.mnemonic_derive_sign_keys({
                phrase,
                dictionary: MnemonicDictionary.English,
                word_count: SEED_PHRASE_WORDS_COUNT,
                path: getPathFromIndex(index ?? 0),
            });
        },
        [],
    );

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
        async (
            seedPhrase: string,
            password: string,
            index?: number,
        ): Promise<any> => {
            const keyPair = await getKeyPairFromSeedPhrase(seedPhrase, index);

            const { tvc, boc } = await getContractData(keyPair.public);

            const address =
                `0:` + (await tonClient.boc.get_boc_hash({ boc: tvc })).hash;

            const account = getAccountFromAddress(address);

            const { acc_type: accType } = await account.getAccount();

            return {
                address,
                publicKey: keyPair.public,
                privateKey: keyPair.secret,
                tvc,
                boc,
                accType,
                name: `Account ${index ? index + 1 : 1}`,
                seed: seedPhrase,
                password,
            };
        },
        [getKeyPairFromSeedPhrase, getContractData, getAccountFromAddress],
    );

    const getAccountsFromSeedPhrase = useCallback(
        async (seedPhrase: string, password: string) => {
            let index = 1;

            const firstAccount = await getAccountFromSeedPhrase(
                seedPhrase,
                password,
                0,
            );

            const accounts = [firstAccount];

            while (true) {
                const account = await getAccountFromSeedPhrase(
                    seedPhrase,
                    password,
                    index,
                );

                if (account.accType === AccountType.nonExist) {
                    break;
                } else {
                    accounts.push(account);
                }

                index += 1;
            }

            return accounts;
        },
        [getAccountFromSeedPhrase],
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
                    abi: abiContract(accountContract.abi),
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
                        abi: abiContract(accountContract.abi),
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

    const buyDomain = useCallback(
        async (domain: Domain, parentDomain: Domain) => {
            try {
                dispatch(
                    transactionStatusActions.setTransactionStatus(
                        TransactionStatus.PENDING,
                    ),
                );

                const accountAbi = abiContract(accountContract.abi);

                const amount = String(domain.price + toDecimals(2, 9));

                const keypair = {
                    public: selectedAccount?.publicKey,
                    secret: selectedAccount?.privateKey,
                } as KeyPair;

                const nftMintMessage = await tonClient.abi.encode_message_body({
                    address: collectionAddress,
                    abi: abiContract(nftMinterContract.abi),
                    call_set: {
                        function_name: 'mintNft',
                        input: {
                            root: parentDomain.address,
                            name: domain.name,
                            hPrice: String(domain.price),
                            json: JSON.stringify({
                                name:
                                    domain.level === 1
                                        ? `.${domain.fullName}`
                                        : domain.fullName,
                            }),
                        },
                    },
                    signer: {
                        type: 'External',
                        public_key:
                            'e1600c99fef3c1e7242de411ff00fcd8916937b41bbdf90193cf6dd7f1fd955b',
                    },
                    is_internal: true,
                });

                const accountTransaction =
                    await tonClient.abi.encode_message_body({
                        address: selectedAccount?.address,
                        abi: accountAbi,
                        call_set: {
                            function_name: 'sendTransaction',
                            input: {
                                dest: collectionAddress,
                                value: amount,
                                bounce: true,
                                flags: 3,
                                payload: nftMintMessage.body,
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
                        dst: selectedAccount?.address as string,
                        init: selectedAccount?.tvc,
                        body: accountTransaction.body,
                    });

                const sendRequestResult =
                    await tonClient.processing.send_message({
                        message: deployAndTransferMsg.message,
                        send_events: true,
                    });

                await tonClient.processing.wait_for_transaction({
                    abi: accountAbi,
                    message: deployAndTransferMsg.message,
                    shard_block_id: sendRequestResult.shard_block_id,
                    send_events: true,
                });

                await fetchDomainsFromContractRequest();
            } catch (err) {
                console.error(err);
            } finally {
                dispatch(
                    transactionStatusActions.setTransactionStatus(
                        TransactionStatus.SUCCESS,
                    ),
                );
            }
        },
        [dispatch, selectedAccount],
    );

    // useEffect(() => {
    //     (async () => {
    //         const response = await getAccountsFromSeedPhrase(
    //             'eager meat lounge best abuse absent extra pink venue narrow vital van',
    //             // 'vault neglect dizzy already brass reward want elegant amused bachelor fever scare',
    //         );

    //         console.log(response);
    //     })();
    // }, []);

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
                getAccountsFromSeedPhrase,
                sendFunds,
                buyDomain,
            }}
        >
            {children}
        </WalletProviderContext.Provider>
    );
};

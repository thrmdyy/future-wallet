import BigNumber from 'bignumber.js';

export const fromDecimals = (amount: number, decimals: number) =>
    BigNumber(amount)
        .dividedBy(10 ** decimals)
        .toNumber();

export const toDecimals = (amount: number, decimals: number) =>
    BigNumber(amount)
        .multipliedBy(10 ** decimals)
        .toNumber();

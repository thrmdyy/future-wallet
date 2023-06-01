export const getFormattedBalance = (balance: number | string) => {
    const balanceStr = balance.toString();

    const balanceSplittedByDecimals = balanceStr.split('.');

    const isDecimalsExist = balanceSplittedByDecimals.length > 1;

    if (!isDecimalsExist) return balanceStr;

    const [base, decimals] = balanceSplittedByDecimals;

    if (decimals.length < 8) return balanceStr;

    return `${base}.${decimals.slice(0, 5)}...`;
};

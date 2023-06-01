export const getFormattedAddress = (address?: string) => {
    if (!address) return '';

    return `${address.slice(0, 9)}...${address.slice(address.length - 4)}`;
};

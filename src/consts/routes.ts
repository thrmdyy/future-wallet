import { CreateAccountSteps } from 'store';

export const routes = {
    home: '/',
    createAccount: {
        [CreateAccountSteps.WELCOME]: `/create/${CreateAccountSteps.WELCOME}`,
        [CreateAccountSteps.ADD_PASSWORD]: `/create/${CreateAccountSteps.ADD_PASSWORD}`,
        [CreateAccountSteps.CHECK_NEW_SEED]: `/create/${CreateAccountSteps.CHECK_NEW_SEED}`,
        [CreateAccountSteps.ENTER_SEED]: `/create/${CreateAccountSteps.ENTER_SEED}`,
        [CreateAccountSteps.NEW_SEED]: `/create/${CreateAccountSteps.NEW_SEED}`,
    },
    transaction: {
        status: '/transaction/status',
    },
    account: {
        sendFunds: '/account/send/funds',
        sendNft: '/account/send/nft',
        nftViewer: '/account/nft/viewer',
        domainsSearch: '/account/domains/search',
        confirmDomainTransaction: '/account/domains/confirm',
        domainsPrimary: '/account/domains/primary',
        transactionConfirm: '/account/transaction/confirm',
        accountSelect: '/account/select',
    },
};

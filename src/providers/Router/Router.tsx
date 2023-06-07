import { routes } from 'consts';
import { useAppSelector } from 'hooks';
import {
    AccountSelect,
    Chat,
    CheckMnemonic,
    ConfirmDomainTransaction,
    ConfirmTransaction,
    Domain,
    EnterMnemonic,
    Home,
    Mnemonic,
    NftViewer,
    PasswordProtection,
    SendFunds,
    SendNft,
    TransactionStatus,
    Welcome,
} from 'pages';
import { FC, memo, useMemo } from 'react';
import { accountsSelectors, routerSelectors } from 'store';

export const Router: FC = memo(() => {
    const path = useAppSelector(routerSelectors.path);
    const selectedAccount = useAppSelector(accountsSelectors.selectedAccount);

    const router = useMemo(() => {
        switch (path) {
            case routes.futy:
                return <Chat />;
            case routes.home:
                return selectedAccount ? <Home /> : <Welcome />;
            case routes.createAccount['add-password']:
                return <PasswordProtection />;
            case routes.createAccount['check-new-seed']:
                return <CheckMnemonic />;
            case routes.createAccount['enter-seed']:
                return <EnterMnemonic />;
            case routes.createAccount['new-seed']:
                return <Mnemonic />;
            case routes.createAccount['welcome']:
                return <Welcome />;

            case routes.transaction.status:
                return <TransactionStatus />;

            case routes.account.accountSelect:
                return <AccountSelect />;
            case routes.account.sendFunds:
                return <SendFunds />;
            case routes.account.sendNft:
                return <SendNft />;
            case routes.account.nftViewer:
                return <NftViewer />;
            case routes.account.domainsSearch:
                return <Domain />;
            case routes.account.confirmDomainTransaction:
                return <ConfirmDomainTransaction />;
            case routes.account.transactionConfirm:
                return <ConfirmTransaction />;
            default:
                return null;
        }
    }, [path, selectedAccount]);

    return router;
});

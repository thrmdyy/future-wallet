import { cn } from '@bem-react/classname';
import { FC, memo, useCallback } from 'react';
import { BaseLayout } from 'layout';
import { Button, Input, InputToken, Title } from 'components';
import { useAppDispatch } from 'hooks';
import { routerActions } from 'store';
import { routes } from 'consts';

import './NftViewer.scss';

const CnNftViewer = cn('nftViewer');

export const NftViewer: FC = memo(() => {
    const dispatch = useAppDispatch();

    const backClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.home,
            }),
        );
    }, [dispatch]);

    const sendClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.account.sendNft,
            }),
        );
    }, [dispatch]);

    return (
        <BaseLayout
            backClickHandler={backClickCallback}
            showBack={true}
            showUser={false}
            className={CnNftViewer()}
        >
            <div
                className={CnNftViewer('img')}
                style={{
                    backgroundImage:
                        "url('https://static.venom.network/nft_w3w.png')",
                }}
            ></div>
            <div className={CnNftViewer('info')}>
                <Title content="Venom Network" size="m" center={false} />
                <div className={CnNftViewer('infoContent')}>
                    <div className={CnNftViewer('infoContentItem')}>
                        <div className={CnNftViewer('infoContentItem-title')}>
                            Contract
                        </div>
                        <div className={CnNftViewer('infoContentItem-value')}>
                            0:5ce7 ••• e3cb
                        </div>
                    </div>
                    <div className={CnNftViewer('infoContentItem')}>
                        <div className={CnNftViewer('infoContentItem-title')}>
                            Owner
                        </div>
                        <div className={CnNftViewer('infoContentItem-value')}>
                            0:5ce7 ••• e3cb
                        </div>
                    </div>
                    <div className={CnNftViewer('infoContentItem')}>
                        <div className={CnNftViewer('infoContentItem-title')}>
                            Manager
                        </div>
                        <div className={CnNftViewer('infoContentItem-value')}>
                            0:5ce7 ••• e3cb
                        </div>
                    </div>
                </div>
                <Button onClick={sendClickCallback}>Send</Button>
            </div>
        </BaseLayout>
    );
});

import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';
import { BaseLayout } from 'layout';
import { Button, Input, InputToken, Title } from 'components';

import './NftViewer.scss';

const CnNftViewer = cn('nftViewer');

export const NftViewer: FC = memo(() => {
    return (
        <BaseLayout showBack={true} showUser={false} className={CnNftViewer()}>
            <div
                className={CnNftViewer('img')}
                style={{
                    backgroundImage:
                        "url('https://static.venom.network/nft_w3w.png')",
                }}
            ></div>
            <div className={CnNftViewer('info')}>
                <Title content="Venom Wallet" size="m" center={false} />
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
                <Button>Send</Button>
            </div>
        </BaseLayout>
    );
});

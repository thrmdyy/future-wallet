import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';
import { BaseLayout } from 'layout';
import { Button, Input, InputToken, Title } from 'components';

import './SendNft.scss';

const CnSendNft = cn('sendNft');

export const SendNft: FC = memo(() => {
    return (
        <BaseLayout showBack={false} showUser={false} className={CnSendNft()}>
            <div>
                <Title content="Send your NFT" center={false} />

                <Input placeholder="Address" />

                <div className={CnSendNft('nft')}>
                    <div className={CnSendNft('nft-image')}>
                        <img
                            src="https://static.venom.network/nft_w3w.png"
                            alt="NFT"
                        />
                    </div>
                    <div className={CnSendNft('nft-descr')}>
                        <div className={CnSendNft('nft-name')}>
                            Venom Network
                        </div>
                        <div className={CnSendNft('nft-collection')}>
                            Venom Foundation
                        </div>
                    </div>
                </div>

                <div className={CnSendNft('details')}>
                    <Title center={false} size="m" content="Details" />

                    <div className={CnSendNft('detailsItem')}>
                        <div className={CnSendNft('detailsItem-title')}>
                            Amount
                        </div>
                        <div className={CnSendNft('detailsItem-value')}>
                            5 VENOM
                        </div>
                    </div>
                    <div className={CnSendNft('detailsItem')}>
                        <div className={CnSendNft('detailsItem-title')}>
                            Blockchain fee
                        </div>
                        <div className={CnSendNft('detailsItem-value')}>
                            0.1321312 VENOM
                        </div>
                    </div>
                </div>
            </div>

            <div className={CnSendNft('actions')}>
                <Button>Send</Button>
                <Button view="dark">Back</Button>
            </div>
        </BaseLayout>
    );
});

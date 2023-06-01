import { TonClient } from '@eversdk/core';
import { libWeb, libWebSetup } from '@eversdk/lib-web';
import { ENDPOINTS } from './TonClient.constants';
import { wasm } from 'consts';

libWebSetup({
    disableSeparateWorker: false,
    binaryURL: wasm,
});

// eslint-disable-next-line react-hooks/rules-of-hooks
TonClient.useBinaryLibrary(libWeb as any);

export const tonClient = new TonClient({
    network: {
        endpoints: ENDPOINTS,
    },
});

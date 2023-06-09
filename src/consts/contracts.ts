export const wasm = require('assets/eversdk/eversdk.wasm');

export const accountContract = {
    abi: {
        'ABI version': 2,
        data: [],
        events: [],
        fields: [
            {
                name: '_pubkey',
                type: 'uint256',
            },
            {
                name: '_timestamp',
                type: 'uint64',
            },
        ],
        functions: [
            {
                inputs: [
                    {
                        name: 'dest',
                        type: 'address',
                    },
                    {
                        name: 'value',
                        type: 'uint128',
                    },
                    {
                        name: 'bounce',
                        type: 'bool',
                    },
                    {
                        name: 'flags',
                        type: 'uint8',
                    },
                    {
                        name: 'payload',
                        type: 'cell',
                    },
                ],
                name: 'sendTransaction',
                outputs: [],
            },
            {
                inputs: [
                    {
                        name: 'flags',
                        type: 'uint8',
                    },
                    {
                        name: 'message',
                        type: 'cell',
                    },
                ],
                name: 'sendTransactionRaw',
                outputs: [],
            },
        ],
        header: ['pubkey', 'time', 'expire'],
        version: '2.3',
    },
    code: 'te6cckEBBgEA/AABFP8A9KQT9LzyyAsBAgEgAgMABNIwAubycdcBAcAA8nqDCNcY7UTQgwfXAdcLP8j4KM8WI88WyfkAA3HXAQHDAJqDB9cBURO68uBk3oBA1wGAINcBgCDXAVQWdfkQ8qj4I7vyeWa++COBBwiggQPoqFIgvLHydAIgghBM7mRsuuMPAcjL/8s/ye1UBAUAmDAC10zQ+kCDBtcBcdcBeNcB10z4AHCAEASqAhSxyMsFUAXPFlAD+gLLaSLQIc8xIddJoIQJuZgzcAHLAFjPFpcwcQHLABLM4skB+wAAPoIQFp4+EbqOEfgAApMg10qXeNcB1AL7AOjRkzLyPOI+zYS/',
};

export const nftMinterContract = {
    abi: {
        'ABI version': 2,
        version: '2.2',
        header: ['pubkey', 'time', 'expire'],
        functions: [
            {
                name: 'constructor',
                inputs: [
                    { name: 'codeNft', type: 'cell' },
                    { name: 'json', type: 'string' },
                    { name: 'codeIndex', type: 'cell' },
                    { name: 'codeIndexBasis', type: 'cell' },
                ],
                outputs: [],
            },
            {
                name: 'mintNft',
                inputs: [
                    { name: 'root', type: 'address' },
                    { name: 'hPrice', type: 'uint128' },
                    { name: 'name', type: 'string' },
                    { name: 'json', type: 'string' },
                ],
                outputs: [],
            },
            {
                name: 'setSubDomainPrice',
                inputs: [
                    { name: 'domain', type: 'address' },
                    { name: 'price', type: 'uint128' },
                ],
                outputs: [],
            },
            {
                name: 'getSubDomainPrice',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                    { name: 'domain', type: 'address' },
                ],
                outputs: [{ name: 'subPrice', type: 'uint128' }],
            },
            {
                name: 'indexBasisCode',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'code', type: 'cell' }],
            },
            {
                name: 'indexBasisCodeHash',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'hash', type: 'uint256' }],
            },
            {
                name: 'resolveIndexBasis',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'indexBasis', type: 'address' }],
            },
            {
                name: 'indexCode',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'code', type: 'cell' }],
            },
            {
                name: 'indexCodeHash',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'hash', type: 'uint256' }],
            },
            {
                name: 'getJson',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'json', type: 'string' }],
            },
            {
                name: 'totalSupply',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'count', type: 'uint128' }],
            },
            {
                name: 'nftCode',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'code', type: 'cell' }],
            },
            {
                name: 'nftCodeHash',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'codeHash', type: 'uint256' }],
            },
            {
                name: 'nftAddress',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                    { name: 'id', type: 'uint256' },
                ],
                outputs: [{ name: 'nft', type: 'address' }],
            },
            {
                name: 'supportsInterface',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                    { name: 'interfaceID', type: 'uint32' },
                ],
                outputs: [{ name: 'value0', type: 'bool' }],
            },
        ],
        data: [],
        events: [
            {
                name: 'NftCreated',
                inputs: [
                    { name: 'id', type: 'uint256' },
                    { name: 'nft', type: 'address' },
                    { name: 'owner', type: 'address' },
                    { name: 'manager', type: 'address' },
                    { name: 'creator', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'NftBurned',
                inputs: [
                    { name: 'id', type: 'uint256' },
                    { name: 'nft', type: 'address' },
                    { name: 'owner', type: 'address' },
                    { name: 'manager', type: 'address' },
                ],
                outputs: [],
            },
        ],
        fields: [
            { name: '_pubkey', type: 'uint256' },
            { name: '_timestamp', type: 'uint64' },
            { name: '_constructorFlag', type: 'bool' },
            { name: '_supportedInterfaces', type: 'optional(cell)' },
            { name: '_codeNft', type: 'cell' },
            { name: '_totalSupply', type: 'uint128' },
            { name: '_json', type: 'string' },
            { name: '_codeIndex', type: 'cell' },
            { name: '_codeIndexBasis', type: 'cell' },
            { name: '_indexDeployValue', type: 'uint128' },
            { name: '_indexDestroyValue', type: 'uint128' },
            { name: '_deployIndexBasisValue', type: 'uint128' },
            { name: '_nonce', type: 'uint8' },
            { name: '_remainOnNft', type: 'uint128' },
            { name: 'subDomainPrices', type: 'map(address,uint128)' },
            { name: 'mintedNames', type: 'map(uint256,bool)' },
            { name: 'idToOwner', type: 'map(uint256,address)' },
            { name: 'adddressToOwner', type: 'map(address,address)' },
            { name: 'registeredUntil', type: 'map(address,uint128)' },
        ],
    },
};

export const nftContract = {
    abi: {
        'ABI version': 2,
        version: '2.2',
        header: ['pubkey', 'time', 'expire'],
        functions: [
            {
                name: 'constructor',
                inputs: [
                    { name: 'owner', type: 'address' },
                    { name: '_root', type: 'address' },
                    { name: '_name', type: 'string' },
                    { name: '_price', type: 'uint128' },
                    { name: 'sendGasTo', type: 'address' },
                    { name: 'remainOnNft', type: 'uint128' },
                    { name: 'json', type: 'string' },
                    { name: 'codeIndex', type: 'cell' },
                    { name: 'indexDeployValue', type: 'uint128' },
                    { name: 'indexDestroyValue', type: 'uint128' },
                ],
                outputs: [],
            },
            {
                name: 'getDomainInfo',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [
                    { name: 'id', type: 'uint256' },
                    { name: 'domainOwner', type: 'address' },
                    { name: 'domainRoot', type: 'address' },
                    { name: 'domainName', type: 'string' },
                    { name: 'domainHPrice', type: 'uint128' },
                ],
            },
            {
                name: 'getName',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'value0', type: 'string' }],
            },
            {
                name: 'indexCode',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'code', type: 'cell' }],
            },
            {
                name: 'indexCodeHash',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'hash', type: 'uint256' }],
            },
            {
                name: 'resolveIndex',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                    { name: 'collection', type: 'address' },
                    { name: 'owner', type: 'address' },
                ],
                outputs: [{ name: 'index', type: 'address' }],
            },
            {
                name: 'getJson',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [{ name: 'json', type: 'string' }],
            },
            {
                name: 'transfer',
                inputs: [
                    { name: 'to', type: 'address' },
                    { name: 'sendGasTo', type: 'address' },
                    {
                        components: [
                            { name: 'value', type: 'uint128' },
                            { name: 'payload', type: 'cell' },
                        ],
                        name: 'callbacks',
                        type: 'map(address,tuple)',
                    },
                ],
                outputs: [],
            },
            {
                name: 'changeOwner',
                inputs: [
                    { name: 'newOwner', type: 'address' },
                    { name: 'sendGasTo', type: 'address' },
                    {
                        components: [
                            { name: 'value', type: 'uint128' },
                            { name: 'payload', type: 'cell' },
                        ],
                        name: 'callbacks',
                        type: 'map(address,tuple)',
                    },
                ],
                outputs: [],
            },
            {
                name: 'changeManager',
                inputs: [
                    { name: 'newManager', type: 'address' },
                    { name: 'sendGasTo', type: 'address' },
                    {
                        components: [
                            { name: 'value', type: 'uint128' },
                            { name: 'payload', type: 'cell' },
                        ],
                        name: 'callbacks',
                        type: 'map(address,tuple)',
                    },
                ],
                outputs: [],
            },
            {
                name: 'getInfo',
                inputs: [{ name: 'answerId', type: 'uint32' }],
                outputs: [
                    { name: 'id', type: 'uint256' },
                    { name: 'owner', type: 'address' },
                    { name: 'manager', type: 'address' },
                    { name: 'collection', type: 'address' },
                ],
            },
            {
                name: 'supportsInterface',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                    { name: 'interfaceID', type: 'uint32' },
                ],
                outputs: [{ name: 'value0', type: 'bool' }],
            },
        ],
        data: [{ key: 1, name: '_id', type: 'uint256' }],
        events: [
            {
                name: 'NftCreated',
                inputs: [
                    { name: 'id', type: 'uint256' },
                    { name: 'owner', type: 'address' },
                    { name: 'manager', type: 'address' },
                    { name: 'collection', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'OwnerChanged',
                inputs: [
                    { name: 'oldOwner', type: 'address' },
                    { name: 'newOwner', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'ManagerChanged',
                inputs: [
                    { name: 'oldManager', type: 'address' },
                    { name: 'newManager', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'NftBurned',
                inputs: [
                    { name: 'id', type: 'uint256' },
                    { name: 'owner', type: 'address' },
                    { name: 'manager', type: 'address' },
                    { name: 'collection', type: 'address' },
                ],
                outputs: [],
            },
        ],
        fields: [
            { name: '_pubkey', type: 'uint256' },
            { name: '_timestamp', type: 'uint64' },
            { name: '_constructorFlag', type: 'bool' },
            { name: '_supportedInterfaces', type: 'optional(cell)' },
            { name: '_id', type: 'uint256' },
            { name: '_collection', type: 'address' },
            { name: '_owner', type: 'address' },
            { name: '_manager', type: 'address' },
            { name: '_json', type: 'string' },
            { name: '_indexDeployValue', type: 'uint128' },
            { name: '_indexDestroyValue', type: 'uint128' },
            { name: '_codeIndex', type: 'cell' },
            { name: 'root', type: 'address' },
            { name: 'hPrice', type: 'uint128' },
            { name: 'name', type: 'string' },
        ],
    },
};

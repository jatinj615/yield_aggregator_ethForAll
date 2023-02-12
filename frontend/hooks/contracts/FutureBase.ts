import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';

const futureBase = {
    _format: 'hh-sol-artifact-1',
    contractName: 'FutureBase',
    sourceName: 'contracts/futures/FutureBase.sol',
    abi: [
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'sender',
                    type: 'address'
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256'
                }
            ],
            name: 'BurnOwnershipShare',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256'
                }
            ],
            name: 'Deposit',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'previousOwner',
                    type: 'address'
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address'
                }
            ],
            name: 'OwnershipTransferred',
            type: 'event'
        },
        {
            inputs: [],
            name: 'balanceInterestBearingToken',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'blocksPerYear',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_sender',
                    type: 'address'
                }
            ],
            name: 'burnOT',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_sender',
                    type: 'address'
                }
            ],
            name: 'burnYT',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_receiver',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: '_amount',
                    type: 'uint256'
                }
            ],
            name: 'claimOT',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_receiver',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: '_amount',
                    type: 'uint256'
                }
            ],
            name: 'claimYT',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_amount',
                    type: 'uint256'
                }
            ],
            name: 'depositInUnderlying',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [],
            name: 'expire',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [],
            name: 'expiry',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'getAPY',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'getInterestBearingToken',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'getOT',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'getYT',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'initialCapitalInUnderlying',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_destination',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: '_amountToMint',
                    type: 'uint256'
                }
            ],
            name: 'mintOT',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_destination',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: '_amountToMint',
                    type: 'uint256'
                }
            ],
            name: 'mintYT',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [],
            name: 'oT',
            outputs: [
                {
                    internalType: 'contract OwnershipToken',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'owner',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'renounceOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_blocksPerYear',
                    type: 'uint256'
                }
            ],
            name: 'setBlocksPerYear',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'string',
                    name: '_protocol',
                    type: 'string'
                },
                {
                    internalType: 'uint256',
                    name: '_durationSeconds',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: '_amountInUnderlying',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: '_epoch',
                    type: 'uint256'
                }
            ],
            name: 'start',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [],
            name: 'totalBalanceUnderlying',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'totalSupplyOT',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'totalSupplyYT',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address'
                }
            ],
            name: 'transferOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [],
            name: 'treasury',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'underlying',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'yT',
            outputs: [
                {
                    internalType: 'contract YieldToken',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'yield',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        }
    ],
    bytecode: '0x',
    deployedBytecode: '0x',
    linkReferences: {},
    deployedLinkReferences: {}
};

export interface IFutureBase extends ethers.utils.Interface {
    getAPY(): void;
    yield(): void;
}

export default futureBase;

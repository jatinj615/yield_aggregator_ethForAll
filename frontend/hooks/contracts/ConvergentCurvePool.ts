const ConvergentCurvePool = {
    address: '0x860D967C7b03CD1650752EfaAC2a9c5fdcc29A51',
    abi: [
        {
            inputs: [
                {
                    internalType: 'contract IERC20',
                    name: '_underlying',
                    type: 'address'
                },
                {
                    internalType: 'contract IERC20',
                    name: '_bond',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: '_expiration',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: '_unitSeconds',
                    type: 'uint256'
                },
                {
                    internalType: 'contract IVault',
                    name: 'vault',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: '_percentFee',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: '_percentFeeGov',
                    type: 'uint256'
                },
                {
                    internalType: 'address',
                    name: '_governance',
                    type: 'address'
                },
                {
                    internalType: 'string',
                    name: 'name',
                    type: 'string'
                },
                {
                    internalType: 'string',
                    name: 'symbol',
                    type: 'string'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'constructor'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'owner',
                    type: 'address'
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'spender',
                    type: 'address'
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256'
                }
            ],
            name: 'Approval',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'collectedBase',
                    type: 'uint256'
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'collectedBond',
                    type: 'uint256'
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'remainingBase',
                    type: 'uint256'
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'remainingBond',
                    type: 'uint256'
                }
            ],
            name: 'FeeCollection',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'from',
                    type: 'address'
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'to',
                    type: 'address'
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256'
                }
            ],
            name: 'Transfer',
            type: 'event'
        },
        {
            inputs: [],
            name: 'DOMAIN_SEPARATOR',
            outputs: [
                {
                    internalType: 'bytes32',
                    name: '',
                    type: 'bytes32'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'FEE_BOUND',
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
                    name: 'owner',
                    type: 'address'
                },
                {
                    internalType: 'address',
                    name: 'spender',
                    type: 'address'
                }
            ],
            name: 'allowance',
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
                    name: 'spender',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256'
                }
            ],
            name: 'approve',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'account',
                    type: 'address'
                }
            ],
            name: 'balanceOf',
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
            name: 'bond',
            outputs: [
                {
                    internalType: 'contract IERC20',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'bondDecimals',
            outputs: [
                {
                    internalType: 'uint8',
                    name: '',
                    type: 'uint8'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'decimals',
            outputs: [
                {
                    internalType: 'uint8',
                    name: '',
                    type: 'uint8'
                }
            ],
            stateMutability: 'pure',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'spender',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256'
                }
            ],
            name: 'decreaseApproval',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [],
            name: 'expiration',
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
            name: 'feesBond',
            outputs: [
                {
                    internalType: 'uint128',
                    name: '',
                    type: 'uint128'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'feesUnderlying',
            outputs: [
                {
                    internalType: 'uint128',
                    name: '',
                    type: 'uint128'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'getPoolId',
            outputs: [
                {
                    internalType: 'bytes32',
                    name: '',
                    type: 'bytes32'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'getVault',
            outputs: [
                {
                    internalType: 'contract IVault',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'governance',
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
            inputs: [
                {
                    internalType: 'address',
                    name: 'spender',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256'
                }
            ],
            name: 'increaseApproval',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [],
            name: 'name',
            outputs: [
                {
                    internalType: 'string',
                    name: '',
                    type: 'string'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'owner',
                    type: 'address'
                }
            ],
            name: 'nonces',
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
                    internalType: 'bytes32',
                    name: 'poolId',
                    type: 'bytes32'
                },
                {
                    internalType: 'address',
                    name: '',
                    type: 'address'
                },
                {
                    internalType: 'address',
                    name: 'recipient',
                    type: 'address'
                },
                {
                    internalType: 'uint256[]',
                    name: 'currentBalances',
                    type: 'uint256[]'
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: 'protocolSwapFee',
                    type: 'uint256'
                },
                {
                    internalType: 'bytes',
                    name: 'userData',
                    type: 'bytes'
                }
            ],
            name: 'onExitPool',
            outputs: [
                {
                    internalType: 'uint256[]',
                    name: 'amountsOut',
                    type: 'uint256[]'
                },
                {
                    internalType: 'uint256[]',
                    name: 'dueProtocolFeeAmounts',
                    type: 'uint256[]'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'bytes32',
                    name: 'poolId',
                    type: 'bytes32'
                },
                {
                    internalType: 'address',
                    name: '',
                    type: 'address'
                },
                {
                    internalType: 'address',
                    name: 'recipient',
                    type: 'address'
                },
                {
                    internalType: 'uint256[]',
                    name: 'currentBalances',
                    type: 'uint256[]'
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: 'protocolSwapFee',
                    type: 'uint256'
                },
                {
                    internalType: 'bytes',
                    name: 'userData',
                    type: 'bytes'
                }
            ],
            name: 'onJoinPool',
            outputs: [
                {
                    internalType: 'uint256[]',
                    name: 'amountsIn',
                    type: 'uint256[]'
                },
                {
                    internalType: 'uint256[]',
                    name: 'dueProtocolFeeAmounts',
                    type: 'uint256[]'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'enum IVault.SwapKind',
                            name: 'kind',
                            type: 'uint8'
                        },
                        {
                            internalType: 'contract IERC20',
                            name: 'tokenIn',
                            type: 'address'
                        },
                        {
                            internalType: 'contract IERC20',
                            name: 'tokenOut',
                            type: 'address'
                        },
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256'
                        },
                        {
                            internalType: 'bytes32',
                            name: 'poolId',
                            type: 'bytes32'
                        },
                        {
                            internalType: 'uint256',
                            name: 'lastChangeBlock',
                            type: 'uint256'
                        },
                        {
                            internalType: 'address',
                            name: 'from',
                            type: 'address'
                        },
                        {
                            internalType: 'address',
                            name: 'to',
                            type: 'address'
                        },
                        {
                            internalType: 'bytes',
                            name: 'userData',
                            type: 'bytes'
                        }
                    ],
                    internalType: 'struct IPoolSwapStructs.SwapRequest',
                    name: 'swapRequest',
                    type: 'tuple'
                },
                {
                    internalType: 'uint256',
                    name: 'currentBalanceTokenIn',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: 'currentBalanceTokenOut',
                    type: 'uint256'
                }
            ],
            name: 'onSwap',
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
            name: 'percentFee',
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
            name: 'percentFeeGov',
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
                    name: 'owner',
                    type: 'address'
                },
                {
                    internalType: 'address',
                    name: 'spender',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: 'deadline',
                    type: 'uint256'
                },
                {
                    internalType: 'uint8',
                    name: 'v',
                    type: 'uint8'
                },
                {
                    internalType: 'bytes32',
                    name: 'r',
                    type: 'bytes32'
                },
                {
                    internalType: 'bytes32',
                    name: 's',
                    type: 'bytes32'
                }
            ],
            name: 'permit',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'amountX',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: 'reserveX',
                    type: 'uint256'
                },
                {
                    internalType: 'uint256',
                    name: 'reserveY',
                    type: 'uint256'
                },
                {
                    internalType: 'bool',
                    name: 'out',
                    type: 'bool'
                }
            ],
            name: 'solveTradeInvariant',
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
            name: 'symbol',
            outputs: [
                {
                    internalType: 'string',
                    name: '',
                    type: 'string'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'totalSupply',
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
                    name: 'recipient',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256'
                }
            ],
            name: 'transfer',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'sender',
                    type: 'address'
                },
                {
                    internalType: 'address',
                    name: 'recipient',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256'
                }
            ],
            name: 'transferFrom',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool'
                }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            inputs: [],
            name: 'underlying',
            outputs: [
                {
                    internalType: 'contract IERC20',
                    name: '',
                    type: 'address'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'underlyingDecimals',
            outputs: [
                {
                    internalType: 'uint8',
                    name: '',
                    type: 'uint8'
                }
            ],
            stateMutability: 'view',
            type: 'function'
        },
        {
            inputs: [],
            name: 'unitSeconds',
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
    ]
};

export default ConvergentCurvePool;

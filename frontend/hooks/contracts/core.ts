import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { contract } from 'utils/contracts';

const core = {
  address: contract.core,
  abi: [
    // user functions
    'function deposit(bytes32 _streamKey, uint256 _amountUnderlying) external returns (uint256, uint256)',
    'function unsubscribe(bytes32 _streamKey, uint256 _otAmountToBurn) external',
    'function claimPlatformTokens(bytes32 _streamKey, address _user) public',
    'function redeemYield(bytes32 _streamKey, uint256 _epoch) external',
    'function redeemPrinciple(bytes32 _streamKey, uint256 _epoch) external',
    'function getOTYTCount(bytes32 _streamKey, uint256 _amountUnderlying) public view returns (uint256, uint256)',
    'function getYieldRemaining(bytes32 _streamKey, uint256 _epoch) public view returns (uint256)'

    // view functions
  ]
};

export interface ICore extends ethers.utils.Interface {
  deposit(streamKey: string, amountUnderlying: BigNumber): void;
  unsubscribe(streamKey: string, otAmountToBurn: BigNumber): void;
  claimPlatformTokens(streamKey: string, address: string): void;
  redeemYield(streamKey: string, epoch: number): void;
  getOTYTCount(streamKey: string, amountUnderlying: BigNumber): void;
  redeemPrinciple(streamKey: string, epoch: number): void;
  getYieldRemaining(streamKey: string, epoch: number): void;
}

export default core;

import { BigNumber, bnum } from './poolCalc/utils/bignumber';

export const constantStrings = {
  principal: 'Ownership',
  yield: 'Yield',
  allProtocols: 'All Protocols',
  error: 'Error ...',
  principalPool: 'Ownership Pool',
  yieldPool: 'Yield Pool',
  principalToken: 'Ownership Token',
  yieldToken: 'Yield Token',
  hide: 'Hide',
  showMore: 'Show More',
  using: 'Using',
  amount: 'Amount',
  oTReceived: 'OT Received',
  yTReceived: 'YT Received',
  deposit: 'Deposit',
  approve: 'Approve',
  walletApprovalRequired: 'Wallet approval required',
  approvalPending: 'Approval Pending ...',
  approvalCompleted: 'Approval Completed',
  approvalFailed: 'Approval Failed',
  available: 'Available',
  max: 'Max'
};

interface NumberConstants {
  convergingPointConstant: BigNumber;
  RAY: number;
  secondsPerYear: number;
  ethMantissa: number;
  blocksPerDay: number;
  daysPerYear: number;
  monthsPerYear: number;
}

export const numberConstants: NumberConstants = {
  convergingPointConstant: bnum('3.09396').div(bnum('0.02789')),
  RAY: Math.pow(10, 27),
  secondsPerYear: 31536000,
  ethMantissa: 1e18,
  blocksPerDay: 6570, // 13.15 seconds per block
  daysPerYear: 365,
  monthsPerYear: 12
};

import { BigNumber } from '@ethersproject/bignumber';

export interface Stream {
    id: string;
    meta: string;
    users: User[];
    epochs: Epoch[];
    otToken: OTToken;
    protocol: string;
    underlying: string;
    durationSeconds: BigNumber;
    tvl: BigNumber;
    startTimestamp: BigNumber;
    currentEpoch: Epoch;
}

interface TokenSubscription {
    id: string;
    stream: Stream;
    user: User;
    amount: BigNumber;
    epoch: Epoch;
}

interface User {
    id: string;
    address: string;
    streams: Stream[];
    subscriptions: TokenSubscription[];
}

interface OTToken {
    id: string;
    symbol: string;
    name: string;
    address: string;
    stream: Stream;
}

interface YTToken {
    id: string;
    symbol: string;
    name: string;
    address: string;
}

interface Epoch {
    id: string;
    number: number;
    stream: Stream;
    yieldToken: YTToken;
    startTimestamp: BigNumber;
}

export interface TokenSubscriptionData {
    tokenSubscriptions: TokenSubscription[];
}

export interface OTTokenData {
    ottokens: OTToken[];
}

export interface StreamData {
    streams: Stream[];
}

export interface EpochData {
    epoches: Epoch[];
}

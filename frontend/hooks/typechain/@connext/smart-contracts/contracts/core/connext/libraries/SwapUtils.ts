/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, BigNumber, BytesLike, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../../../common";

export interface SwapUtilsInterface extends utils.Interface {
  functions: {};

  events: {
    "AddLiquidity(bytes32,address,uint256[],uint256[],uint256,uint256)": EventFragment;
    "NewAdminFee(bytes32,uint256)": EventFragment;
    "NewSwapFee(bytes32,uint256)": EventFragment;
    "RemoveLiquidity(bytes32,address,uint256[],uint256)": EventFragment;
    "RemoveLiquidityImbalance(bytes32,address,uint256[],uint256[],uint256,uint256)": EventFragment;
    "RemoveLiquidityOne(bytes32,address,uint256,uint256,uint256,uint256)": EventFragment;
    "TokenSwap(bytes32,address,uint256,uint256,uint128,uint128)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewAdminFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewSwapFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidityImbalance"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidityOne"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenSwap"): EventFragment;
}

export interface AddLiquidityEventObject {
  key: string;
  provider: string;
  tokenAmounts: BigNumber[];
  fees: BigNumber[];
  invariant: BigNumber;
  lpTokenSupply: BigNumber;
}
export type AddLiquidityEvent = TypedEvent<
  [string, string, BigNumber[], BigNumber[], BigNumber, BigNumber],
  AddLiquidityEventObject
>;

export type AddLiquidityEventFilter = TypedEventFilter<AddLiquidityEvent>;

export interface NewAdminFeeEventObject {
  key: string;
  newAdminFee: BigNumber;
}
export type NewAdminFeeEvent = TypedEvent<
  [string, BigNumber],
  NewAdminFeeEventObject
>;

export type NewAdminFeeEventFilter = TypedEventFilter<NewAdminFeeEvent>;

export interface NewSwapFeeEventObject {
  key: string;
  newSwapFee: BigNumber;
}
export type NewSwapFeeEvent = TypedEvent<
  [string, BigNumber],
  NewSwapFeeEventObject
>;

export type NewSwapFeeEventFilter = TypedEventFilter<NewSwapFeeEvent>;

export interface RemoveLiquidityEventObject {
  key: string;
  provider: string;
  tokenAmounts: BigNumber[];
  lpTokenSupply: BigNumber;
}
export type RemoveLiquidityEvent = TypedEvent<
  [string, string, BigNumber[], BigNumber],
  RemoveLiquidityEventObject
>;

export type RemoveLiquidityEventFilter = TypedEventFilter<RemoveLiquidityEvent>;

export interface RemoveLiquidityImbalanceEventObject {
  key: string;
  provider: string;
  tokenAmounts: BigNumber[];
  fees: BigNumber[];
  invariant: BigNumber;
  lpTokenSupply: BigNumber;
}
export type RemoveLiquidityImbalanceEvent = TypedEvent<
  [string, string, BigNumber[], BigNumber[], BigNumber, BigNumber],
  RemoveLiquidityImbalanceEventObject
>;

export type RemoveLiquidityImbalanceEventFilter =
  TypedEventFilter<RemoveLiquidityImbalanceEvent>;

export interface RemoveLiquidityOneEventObject {
  key: string;
  provider: string;
  lpTokenAmount: BigNumber;
  lpTokenSupply: BigNumber;
  boughtId: BigNumber;
  tokensBought: BigNumber;
}
export type RemoveLiquidityOneEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, BigNumber, BigNumber],
  RemoveLiquidityOneEventObject
>;

export type RemoveLiquidityOneEventFilter =
  TypedEventFilter<RemoveLiquidityOneEvent>;

export interface TokenSwapEventObject {
  key: string;
  buyer: string;
  tokensSold: BigNumber;
  tokensBought: BigNumber;
  soldId: BigNumber;
  boughtId: BigNumber;
}
export type TokenSwapEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, BigNumber, BigNumber],
  TokenSwapEventObject
>;

export type TokenSwapEventFilter = TypedEventFilter<TokenSwapEvent>;

export interface SwapUtils extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SwapUtilsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {};

  callStatic: {};

  filters: {
    "AddLiquidity(bytes32,address,uint256[],uint256[],uint256,uint256)"(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      fees?: null,
      invariant?: null,
      lpTokenSupply?: null
    ): AddLiquidityEventFilter;
    AddLiquidity(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      fees?: null,
      invariant?: null,
      lpTokenSupply?: null
    ): AddLiquidityEventFilter;

    "NewAdminFee(bytes32,uint256)"(
      key?: PromiseOrValue<BytesLike> | null,
      newAdminFee?: null
    ): NewAdminFeeEventFilter;
    NewAdminFee(
      key?: PromiseOrValue<BytesLike> | null,
      newAdminFee?: null
    ): NewAdminFeeEventFilter;

    "NewSwapFee(bytes32,uint256)"(
      key?: PromiseOrValue<BytesLike> | null,
      newSwapFee?: null
    ): NewSwapFeeEventFilter;
    NewSwapFee(
      key?: PromiseOrValue<BytesLike> | null,
      newSwapFee?: null
    ): NewSwapFeeEventFilter;

    "RemoveLiquidity(bytes32,address,uint256[],uint256)"(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      lpTokenSupply?: null
    ): RemoveLiquidityEventFilter;
    RemoveLiquidity(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      lpTokenSupply?: null
    ): RemoveLiquidityEventFilter;

    "RemoveLiquidityImbalance(bytes32,address,uint256[],uint256[],uint256,uint256)"(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      fees?: null,
      invariant?: null,
      lpTokenSupply?: null
    ): RemoveLiquidityImbalanceEventFilter;
    RemoveLiquidityImbalance(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      fees?: null,
      invariant?: null,
      lpTokenSupply?: null
    ): RemoveLiquidityImbalanceEventFilter;

    "RemoveLiquidityOne(bytes32,address,uint256,uint256,uint256,uint256)"(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      lpTokenAmount?: null,
      lpTokenSupply?: null,
      boughtId?: null,
      tokensBought?: null
    ): RemoveLiquidityOneEventFilter;
    RemoveLiquidityOne(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      lpTokenAmount?: null,
      lpTokenSupply?: null,
      boughtId?: null,
      tokensBought?: null
    ): RemoveLiquidityOneEventFilter;

    "TokenSwap(bytes32,address,uint256,uint256,uint128,uint128)"(
      key?: PromiseOrValue<BytesLike> | null,
      buyer?: PromiseOrValue<string> | null,
      tokensSold?: null,
      tokensBought?: null,
      soldId?: null,
      boughtId?: null
    ): TokenSwapEventFilter;
    TokenSwap(
      key?: PromiseOrValue<BytesLike> | null,
      buyer?: PromiseOrValue<string> | null,
      tokensSold?: null,
      tokensBought?: null,
      soldId?: null,
      boughtId?: null
    ): TokenSwapEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}

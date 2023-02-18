/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../../../common";

export declare namespace IDiamondCut {
  export type FacetCutStruct = {
    facetAddress: PromiseOrValue<string>;
    action: PromiseOrValue<BigNumberish>;
    functionSelectors: PromiseOrValue<BytesLike>[];
  };

  export type FacetCutStructOutput = [string, number, string[]] & {
    facetAddress: string;
    action: number;
    functionSelectors: string[];
  };
}

export interface IDiamondCutInterface extends utils.Interface {
  functions: {
    "diamondCut((address,uint8,bytes4[])[],address,bytes)": FunctionFragment;
    "getAcceptanceTime((address,uint8,bytes4[])[],address,bytes)": FunctionFragment;
    "proposeDiamondCut((address,uint8,bytes4[])[],address,bytes)": FunctionFragment;
    "rescindDiamondCut((address,uint8,bytes4[])[],address,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "diamondCut"
      | "getAcceptanceTime"
      | "proposeDiamondCut"
      | "rescindDiamondCut"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "diamondCut",
    values: [
      IDiamondCut.FacetCutStruct[],
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAcceptanceTime",
    values: [
      IDiamondCut.FacetCutStruct[],
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "proposeDiamondCut",
    values: [
      IDiamondCut.FacetCutStruct[],
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "rescindDiamondCut",
    values: [
      IDiamondCut.FacetCutStruct[],
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "diamondCut", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAcceptanceTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposeDiamondCut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rescindDiamondCut",
    data: BytesLike
  ): Result;

  events: {
    "DiamondCut(tuple[],address,bytes)": EventFragment;
    "DiamondCutProposed(tuple[],address,bytes,uint256)": EventFragment;
    "DiamondCutRescinded(tuple[],address,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DiamondCut"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DiamondCutProposed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DiamondCutRescinded"): EventFragment;
}

export interface DiamondCutEventObject {
  _diamondCut: IDiamondCut.FacetCutStructOutput[];
  _init: string;
  _calldata: string;
}
export type DiamondCutEvent = TypedEvent<
  [IDiamondCut.FacetCutStructOutput[], string, string],
  DiamondCutEventObject
>;

export type DiamondCutEventFilter = TypedEventFilter<DiamondCutEvent>;

export interface DiamondCutProposedEventObject {
  _diamondCut: IDiamondCut.FacetCutStructOutput[];
  _init: string;
  _calldata: string;
  deadline: BigNumber;
}
export type DiamondCutProposedEvent = TypedEvent<
  [IDiamondCut.FacetCutStructOutput[], string, string, BigNumber],
  DiamondCutProposedEventObject
>;

export type DiamondCutProposedEventFilter =
  TypedEventFilter<DiamondCutProposedEvent>;

export interface DiamondCutRescindedEventObject {
  _diamondCut: IDiamondCut.FacetCutStructOutput[];
  _init: string;
  _calldata: string;
}
export type DiamondCutRescindedEvent = TypedEvent<
  [IDiamondCut.FacetCutStructOutput[], string, string],
  DiamondCutRescindedEventObject
>;

export type DiamondCutRescindedEventFilter =
  TypedEventFilter<DiamondCutRescindedEvent>;

export interface IDiamondCut extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDiamondCutInterface;

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

  functions: {
    diamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAcceptanceTime(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    proposeDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rescindDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  diamondCut(
    _diamondCut: IDiamondCut.FacetCutStruct[],
    _init: PromiseOrValue<string>,
    _calldata: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAcceptanceTime(
    _diamondCut: IDiamondCut.FacetCutStruct[],
    _init: PromiseOrValue<string>,
    _calldata: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  proposeDiamondCut(
    _diamondCut: IDiamondCut.FacetCutStruct[],
    _init: PromiseOrValue<string>,
    _calldata: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rescindDiamondCut(
    _diamondCut: IDiamondCut.FacetCutStruct[],
    _init: PromiseOrValue<string>,
    _calldata: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    diamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAcceptanceTime(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proposeDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    rescindDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "DiamondCut(tuple[],address,bytes)"(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null
    ): DiamondCutEventFilter;
    DiamondCut(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null
    ): DiamondCutEventFilter;

    "DiamondCutProposed(tuple[],address,bytes,uint256)"(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null,
      deadline?: null
    ): DiamondCutProposedEventFilter;
    DiamondCutProposed(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null,
      deadline?: null
    ): DiamondCutProposedEventFilter;

    "DiamondCutRescinded(tuple[],address,bytes)"(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null
    ): DiamondCutRescindedEventFilter;
    DiamondCutRescinded(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null
    ): DiamondCutRescindedEventFilter;
  };

  estimateGas: {
    diamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAcceptanceTime(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    proposeDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rescindDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    diamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAcceptanceTime(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    proposeDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rescindDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}

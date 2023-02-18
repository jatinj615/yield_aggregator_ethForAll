/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  TypedMemView,
  TypedMemViewInterface,
} from "../../../../../../@connext/smart-contracts/contracts/shared/libraries/TypedMemView";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "actual",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expected",
        type: "uint256",
      },
    ],
    name: "TypedMemView__assertType_typeAssertionFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "TypedMemView__assertValid_validityAssertionFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "TypedMemView__index_indexMoreThan32Bytes",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loc",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "len",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slice",
        type: "uint256",
      },
    ],
    name: "TypedMemView__index_overrun",
    type: "error",
  },
  {
    inputs: [],
    name: "TypedMemView__unsafeCopyTo_identityOOG",
    type: "error",
  },
  {
    inputs: [],
    name: "TypedMemView__unsafeCopyTo_invalidPointer",
    type: "error",
  },
  {
    inputs: [],
    name: "TypedMemView__unsafeCopyTo_nullPointer",
    type: "error",
  },
  {
    inputs: [],
    name: "NULL",
    outputs: [
      {
        internalType: "bytes29",
        name: "",
        type: "bytes29",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6091610038600b82828239805160001a607314602b57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060335760003560e01c8063f26be3fc146038575b600080fd5b604262ffffff1981565b60405162ffffff19909116815260200160405180910390f3fea2646970667358221220b1105fd59024c749d857e75358798ed2e5d2b19a3b19d856c95f316e1237926064736f6c63430008110033";

type TypedMemViewConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TypedMemViewConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TypedMemView__factory extends ContractFactory {
  constructor(...args: TypedMemViewConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TypedMemView> {
    return super.deploy(overrides || {}) as Promise<TypedMemView>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TypedMemView {
    return super.attach(address) as TypedMemView;
  }
  override connect(signer: Signer): TypedMemView__factory {
    return super.connect(signer) as TypedMemView__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TypedMemViewInterface {
    return new utils.Interface(_abi) as TypedMemViewInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TypedMemView {
    return new Contract(address, _abi, signerOrProvider) as TypedMemView;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Registry, RegistryInterface } from "../../contracts/Registry";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_connext",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DomainNotSupported",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "routeId",
        type: "uint256",
      },
    ],
    name: "RouteNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroRoutes",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "routeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "route",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isEnabled",
        type: "bool",
      },
    ],
    name: "RouteAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "routeId",
        type: "uint256",
      },
    ],
    name: "RouteDisabled",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domainId",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "reomoteRegistry",
            type: "address",
          },
        ],
        internalType: "struct Registry.RemoteRegistry[]",
        name: "_remoteRegistries",
        type: "tuple[]",
      },
    ],
    name: "addRemoteRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "route",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isEnabled",
            type: "bool",
          },
        ],
        internalType: "struct Registry.RouteData[]",
        name: "_routes",
        type: "tuple[]",
      },
    ],
    name: "addRoute",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "connext",
    outputs: [
      {
        internalType: "contract IConnext",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_routeId",
        type: "uint256",
      },
    ],
    name: "disableRoute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "registryForDomains",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_receiverAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "rescueFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "routes",
    outputs: [
      {
        internalType: "address",
        name: "route",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isEnabled",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "routeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "vaultAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "underlying",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiverAddress",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint32",
                name: "destinationDomain",
                type: "uint32",
              },
              {
                internalType: "uint256",
                name: "relayerFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "slippage",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
            ],
            internalType: "struct Registry.BridgeRequest",
            name: "bridgeRequest",
            type: "tuple",
          },
        ],
        internalType: "struct Registry.VaultRequest",
        name: "_depositRequest",
        type: "tuple",
      },
    ],
    name: "userDepositRequest",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "routeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "vaultAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "underlying",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiverAddress",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint32",
                name: "destinationDomain",
                type: "uint32",
              },
              {
                internalType: "uint256",
                name: "relayerFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "slippage",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
            ],
            internalType: "struct Registry.BridgeRequest",
            name: "bridgeRequest",
            type: "tuple",
          },
        ],
        internalType: "struct Registry.VaultRequest",
        name: "_withdrawRequest",
        type: "tuple",
      },
    ],
    name: "userWithdrawRequest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_transferId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "_originSender",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "_callData",
        type: "bytes",
      },
    ],
    name: "xReceive",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405162001ace38038062001ace8339810160408190526100319161009b565b61003a3361004b565b6001600160a01b03166080526100cb565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100ad57600080fd5b81516001600160a01b03811681146100c457600080fd5b9392505050565b6080516119cb62000103600039600081816101da015281816104d70152818161064f0152818161069f0152610d4001526119cb6000f3fe6080604052600436106100c25760003560e01c8063d5af2af41161007f578063ea95260111610059578063ea95260114610229578063f2fde38b1461025f578063fd614f411461027f578063ffcdf4ed146102ac57600080fd5b8063d5af2af4146101b5578063de4b0548146101c8578063def9d605146101fc57600080fd5b80632625c2a9146100c75780636ccae054146100e9578063715018a614610109578063726f16d81461011e5780638da5cb5b14610162578063be5ec80014610194575b600080fd5b3480156100d357600080fd5b506100e76100e23660046114da565b6102cc565b005b3480156100f557600080fd5b506100e7610104366004611531565b6103d3565b34801561011557600080fd5b506100e76103ef565b34801561012a57600080fd5b5061013e610139366004611572565b610403565b604080516001600160a01b0390931683529015156020830152015b60405180910390f35b34801561016e57600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610159565b6101a76101a236600461158b565b610438565b604051908152602001610159565b6101a76101c336600461158b565b61082c565b3480156101d457600080fd5b5061017c7f000000000000000000000000000000000000000000000000000000000000000081565b34801561020857600080fd5b5061021c6102173660046114da565b610a95565b604051610159919061159e565b34801561023557600080fd5b5061017c6102443660046115fb565b6002602052600090815260409020546001600160a01b031681565b34801561026b57600080fd5b506100e761027a36600461161d565b610c8a565b34801561028b57600080fd5b5061029f61029a366004611650565b610d03565b6040516101599190611799565b3480156102b857600080fd5b506100e76102c7366004611572565b610df0565b6102d4610ec5565b60005b818110156103ce5760008383838181106102f3576102f36117ac565b905060400201602001602081019061030b919061161d565b6001600160a01b0316036103325760405163d92e233d60e01b815260040160405180910390fd5b828282818110610344576103446117ac565b905060400201602001602081019061035c919061161d565b60026000858585818110610372576103726117ac565b61038892602060409092020190810191506115fb565b63ffffffff168152602081019190915260400160002080546001600160a01b0319166001600160a01b0392909216919091179055806103c6816117d8565b9150506102d7565b505050565b6103db610ec5565b6103ce6001600160a01b0384168383610f1f565b6103f7610ec5565b6104016000610f82565b565b6001818154811061041357600080fd5b6000918252602090912001546001600160a01b0381169150600160a01b900460ff1682565b6000816000013560006001600160a01b03166001828154811061045d5761045d6117ac565b6000918252602090912001546001600160a01b03160361049857604051634bd16f7f60e01b8152600481018290526024015b60405180910390fd5b6104d560208401356104b060a086016080870161161d565b6104c0606087016040880161161d565b6104d0608088016060890161161d565b610fd2565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663c2fb26a66040518163ffffffff1660e01b8152600401602060405180830381865afa158015610533573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061055791906117f1565b61056760c0850160a086016115fb565b63ffffffff161461079d57600060028161058760c0870160a088016115fb565b63ffffffff1681526020810191909152604001600020546001600160a01b0316036105c557604051636323101960e01b815260040160405180910390fd5b600083356105d960a086016080870161161d565b6105e9606087016040880161161d565b6040805160208101949094526001600160a01b039283169084015216606082015260800160408051601f19818403018152919052905061064a333060208701356106396080890160608a0161161d565b6001600160a01b0316929190611046565b6106937f00000000000000000000000000000000000000000000000000000000000000006020860135610683608088016060890161161d565b6001600160a01b0316919061107e565b60006001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016638aac16ba60c087018035906106d89060a08a016115fb565b600260006106ec60c08c0160a08d016115fb565b63ffffffff1681526020810191909152604001600020546001600160a01b031661071e6101208b016101008c0161161d565b60008b602001358c60a001604001358a6040518963ffffffff1660e01b8152600401610750979695949392919061180a565b60206040518083038185885af115801561076e573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061079391906117f1565b9350610826915050565b6107e23360018560000135815481106107b8576107b86117ac565b600091825260209182902001546001600160a01b031690860135610639608088016060890161161d565b610821833560208501356107fc60a087016080880161161d565b61080c608088016060890161161d565b61081c6060890160408a0161161d565b611193565b600091505b50919050565b6000816000013560006001600160a01b031660018281548110610851576108516117ac565b6000918252602090912001546001600160a01b03160361088757604051634bd16f7f60e01b81526004810182905260240161048f565b61089f60208401356104b060a086016080870161161d565b600060018460000135815481106108b8576108b86117ac565b6000918252602090912001546001600160a01b031663c79809496108e2608087016060880161161d565b6108f2606088016040890161161d565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604401602060405180830381865afa15801561093d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109619190611865565b90506109a333600186600001358154811061097e5761097e6117ac565b600091825260209182902001546001600160a01b038581169392911690880135611046565b600060018560000135815481106109bc576109bc6117ac565b600091825260209182902001546001600160a01b0316906323e103a8908701356109ec60a0890160808a0161161d565b6109fc60808a0160608b0161161d565b610a0c60608b0160408c0161161d565b6040516001600160e01b031960e087901b16815260048101949094526001600160a01b03928316602485015290821660448401521660648201526084016020604051808303816000875af1158015610a68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8c91906117f1565b95945050505050565b6060610a9f610ec5565b6000829003610ac1576040516318d78ff560e11b815260040160405180910390fd5b60008267ffffffffffffffff811115610adc57610adc61163a565b604051908082528060200260200182016040528015610b05578160200160208202803683370190505b50905060005b83811015610c80576000858583818110610b2757610b276117ac565b610b3d926020604090920201908101915061161d565b6001600160a01b031603610b645760405163d92e233d60e01b815260040160405180910390fd5b6001858583818110610b7857610b786117ac565b83546001810185556000948552602090942060409091029290920192919091019050610ba48282611890565b505060018054610bb491906118e9565b828281518110610bc657610bc66117ac565b6020026020010181815250507f8c7241f7d7efcaf997d919b5026078b7bc3deb9041b162b9bd9ddfc1231d2c8c81868684818110610c0657610c066117ac565b610c1c926020604090920201908101915061161d565b878785818110610c2e57610c2e6117ac565b9050604002016020016020810190610c4691906118fc565b604080519384526001600160a01b03909216602084015215159082015260600160405180910390a180610c78816117d8565b915050610b0b565b5090505b92915050565b610c92610ec5565b6001600160a01b038116610cf75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161048f565b610d0081610f82565b50565b63ffffffff8216600090815260026020526040902054606090849084906001600160a01b038084169116141580610d635750336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614155b15610d80576040516282b42960e81b815260040160405180910390fd5b600080600086806020019051810190610d999190611919565b925092509250610dd460018481548110610db557610db56117ac565b6000918252602090912001546001600160a01b038c811691168d610f1f565b610de1838c848d85611193565b50505050509695505050505050565b610df8610ec5565b8060006001600160a01b031660018281548110610e1757610e176117ac565b6000918252602090912001546001600160a01b031603610e4d57604051634bd16f7f60e01b81526004810182905260240161048f565b600060018381548110610e6257610e626117ac565b60009182526020909120018054911515600160a01b0260ff60a01b199092169190911790556040517f91a0168fe2af7d03fc4465ab611da7d997fe924f69c20e9d16a23e6fc7af88d490610eb99084815260200190565b60405180910390a15050565b6000546001600160a01b031633146104015760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161048f565b6040516001600160a01b0383166024820152604481018290526103ce90849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915261122c565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b83600003610ff357604051631f2a200560e01b815260040160405180910390fd5b6001600160a01b038316158061101057506001600160a01b038216155b8061102257506001600160a01b038116155b156110405760405163d92e233d60e01b815260040160405180910390fd5b50505050565b6040516001600160a01b03808516602483015283166044820152606481018290526110409085906323b872dd60e01b90608401610f4b565b8015806110f85750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa1580156110d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110f691906117f1565b155b6111635760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b606482015260840161048f565b6040516001600160a01b0383166024820152604481018290526103ce90849063095ea7b360e01b90606401610f4b565b600185815481106111a6576111a66117ac565b6000918252602090912001546040516330940a0f60e21b8152600481018690526001600160a01b038581166024830152848116604483015283811660648301529091169063c250283c90608401600060405180830381600087803b15801561120d57600080fd5b505af1158015611221573d6000803e3d6000fd5b505050505050505050565b6000611281826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166112fe9092919063ffffffff16565b8051909150156103ce578080602001905181019061129f919061195c565b6103ce5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161048f565b606061130d8484600085611315565b949350505050565b6060824710156113765760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161048f565b600080866001600160a01b031685876040516113929190611979565b60006040518083038185875af1925050503d80600081146113cf576040519150601f19603f3d011682016040523d82523d6000602084013e6113d4565b606091505b50915091506113e5878383876113f0565b979650505050505050565b6060831561145f578251600003611458576001600160a01b0385163b6114585760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161048f565b508161130d565b61130d83838151156114745781518083602001fd5b8060405162461bcd60e51b815260040161048f9190611799565b60008083601f8401126114a057600080fd5b50813567ffffffffffffffff8111156114b857600080fd5b6020830191508360208260061b85010111156114d357600080fd5b9250929050565b600080602083850312156114ed57600080fd5b823567ffffffffffffffff81111561150457600080fd5b6115108582860161148e565b90969095509350505050565b6001600160a01b0381168114610d0057600080fd5b60008060006060848603121561154657600080fd5b83356115518161151c565b925060208401356115618161151c565b929592945050506040919091013590565b60006020828403121561158457600080fd5b5035919050565b6000610120828403121561082657600080fd5b6020808252825182820181905260009190848201906040850190845b818110156115d6578351835292840192918401916001016115ba565b50909695505050505050565b803563ffffffff811681146115f657600080fd5b919050565b60006020828403121561160d57600080fd5b611616826115e2565b9392505050565b60006020828403121561162f57600080fd5b81356116168161151c565b634e487b7160e01b600052604160045260246000fd5b60008060008060008060c0878903121561166957600080fd5b863595506020870135945060408701356116828161151c565b935060608701356116928161151c565b92506116a0608088016115e2565b915060a087013567ffffffffffffffff808211156116bd57600080fd5b818901915089601f8301126116d157600080fd5b8135818111156116e3576116e361163a565b604051601f8201601f19908116603f0116810190838211818310171561170b5761170b61163a565b816040528281528c602084870101111561172457600080fd5b8260208601602083013760006020848301015280955050505050509295509295509295565b60005b8381101561176457818101518382015260200161174c565b50506000910152565b60008151808452611785816020860160208601611749565b601f01601f19169290920160200192915050565b602081526000611616602083018461176d565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016117ea576117ea6117c2565b5060010190565b60006020828403121561180357600080fd5b5051919050565b63ffffffff881681526001600160a01b0387811660208301528681166040830152851660608201526080810184905260a0810183905260e060c082018190526000906118589083018461176d565b9998505050505050505050565b60006020828403121561187757600080fd5b81516116168161151c565b8015158114610d0057600080fd5b813561189b8161151c565b81546001600160a01b031981166001600160a01b0392909216918217835560208401356118c781611882565b6001600160a81b03199190911690911790151560a01b60ff60a01b1617905550565b81810381811115610c8457610c846117c2565b60006020828403121561190e57600080fd5b813561161681611882565b60008060006060848603121561192e57600080fd5b8351925060208401516119408161151c565b60408501519092506119518161151c565b809150509250925092565b60006020828403121561196e57600080fd5b815161161681611882565b6000825161198b818460208701611749565b919091019291505056fea2646970667358221220142a0bc7496bedcaf36daf252869f0152d97f5aa28106636411365436e5c63dd64736f6c63430008110033";

type RegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Registry__factory extends ContractFactory {
  constructor(...args: RegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _connext: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Registry> {
    return super.deploy(_connext, overrides || {}) as Promise<Registry>;
  }
  override getDeployTransaction(
    _connext: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_connext, overrides || {});
  }
  override attach(address: string): Registry {
    return super.attach(address) as Registry;
  }
  override connect(signer: Signer): Registry__factory {
    return super.connect(signer) as Registry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RegistryInterface {
    return new utils.Interface(_abi) as RegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Registry {
    return new Contract(address, _abi, signerOrProvider) as Registry;
  }
}

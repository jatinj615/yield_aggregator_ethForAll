/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "LPToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LPToken__factory>;
    getContractFactory(
      name: "IConnext",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IConnext__factory>;
    getContractFactory(
      name: "IDiamondCut",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDiamondCut__factory>;
    getContractFactory(
      name: "IDiamondLoupe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDiamondLoupe__factory>;
    getContractFactory(
      name: "IStableSwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStableSwap__factory>;
    getContractFactory(
      name: "IXReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IXReceiver__factory>;
    getContractFactory(
      name: "AmplificationUtils",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AmplificationUtils__factory>;
    getContractFactory(
      name: "AssetLogic",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AssetLogic__factory>;
    getContractFactory(
      name: "Constants",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Constants__factory>;
    getContractFactory(
      name: "LibDiamond",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LibDiamond__factory>;
    getContractFactory(
      name: "SwapUtils",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SwapUtils__factory>;
    getContractFactory(
      name: "IConnectorManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IConnectorManager__factory>;
    getContractFactory(
      name: "IOutbox",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOutbox__factory>;
    getContractFactory(
      name: "TypedMemView",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TypedMemView__factory>;
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "ERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Upgradeable__factory>;
    getContractFactory(
      name: "ERC20BurnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20BurnableUpgradeable__factory>;
    getContractFactory(
      name: "IERC20MetadataUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20MetadataUpgradeable__factory>;
    getContractFactory(
      name: "IERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Upgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Errors__factory>;
    getContractFactory(
      name: "IPool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPool__factory>;
    getContractFactory(
      name: "IPoolAddressesProvider",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPoolAddressesProvider__factory>;
    getContractFactory(
      name: "IRoute",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRoute__factory>;
    getContractFactory(
      name: "IWETH",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH__factory>;
    getContractFactory(
      name: "Registry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Registry__factory>;
    getContractFactory(
      name: "AaveRoute",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AaveRoute__factory>;
    getContractFactory(
      name: "AaveWETHTestnetRoute",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AaveWETHTestnetRoute__factory>;
    getContractFactory(
      name: "RouteBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RouteBase__factory>;

    getContractAt(
      name: "LPToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LPToken>;
    getContractAt(
      name: "IConnext",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IConnext>;
    getContractAt(
      name: "IDiamondCut",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDiamondCut>;
    getContractAt(
      name: "IDiamondLoupe",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDiamondLoupe>;
    getContractAt(
      name: "IStableSwap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStableSwap>;
    getContractAt(
      name: "IXReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IXReceiver>;
    getContractAt(
      name: "AmplificationUtils",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AmplificationUtils>;
    getContractAt(
      name: "AssetLogic",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AssetLogic>;
    getContractAt(
      name: "Constants",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Constants>;
    getContractAt(
      name: "LibDiamond",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LibDiamond>;
    getContractAt(
      name: "SwapUtils",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SwapUtils>;
    getContractAt(
      name: "IConnectorManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IConnectorManager>;
    getContractAt(
      name: "IOutbox",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOutbox>;
    getContractAt(
      name: "TypedMemView",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TypedMemView>;
    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "ERC20Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Upgradeable>;
    getContractAt(
      name: "ERC20BurnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20BurnableUpgradeable>;
    getContractAt(
      name: "IERC20MetadataUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20MetadataUpgradeable>;
    getContractAt(
      name: "IERC20Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Upgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC20Permit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Permit>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "Errors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Errors>;
    getContractAt(
      name: "IPool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPool>;
    getContractAt(
      name: "IPoolAddressesProvider",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPoolAddressesProvider>;
    getContractAt(
      name: "IRoute",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRoute>;
    getContractAt(
      name: "IWETH",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH>;
    getContractAt(
      name: "Registry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Registry>;
    getContractAt(
      name: "AaveRoute",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AaveRoute>;
    getContractAt(
      name: "AaveWETHTestnetRoute",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AaveWETHTestnetRoute>;
    getContractAt(
      name: "RouteBase",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RouteBase>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}

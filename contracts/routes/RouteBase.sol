pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IRoute.sol";
import "../helpers/Errors.sol";


abstract contract RouteBase is IRoute, Ownable {

    address public registry;

    event RegistryAddressUpdated(address indexed registryAddress);

    constructor (address _registry) Ownable() {
        registry = _registry;
    }

    modifier onlyRegistry() {
        if(msg.sender != registry) revert Errors.InvalidSender();
        _;
    }

    function updateRegistry(address _newRegistry) external onlyOwner() {
        registry = _newRegistry;
        emit RegistryAddressUpdated(_newRegistry);
    }

    function getYieldBearingToken(
        address _underlying, 
        address _vaultAddress
    ) external view virtual returns(address);

    function deposit(
        uint256 _amount, 
        address _receiverAddress,
        address _underlying,
        address _vaultAddress
    ) external virtual;

    function withdraw(
        uint256 _amount,
        address _receiver,
        address _underlying,
        address _vaultAddress
    ) external virtual returns (uint256);

}
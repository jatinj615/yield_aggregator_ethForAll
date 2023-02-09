pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/external/aaveV3/types/DataTypes.sol";
import "../interfaces/external/aaveV3/IPoolAddressesProvider.sol";
import "../interfaces/external/aaveV3/IPool.sol";
import "./RouteBase.sol";

contract AaveRoute is RouteBase {

    using SafeERC20 for IERC20;

    /// @notice constructor only requires registry address
    /// @param _registry : address of the registry
    constructor(
        address _registry
    ) RouteBase(_registry) {}

    function deposit(
        uint256 _amount, 
        address _receiver, 
        address _underlying, 
        address _vaultAddress
    ) external override onlyRegistry {
        IERC20(_underlying).safeApprove(_vaultAddress, _amount);
        IPool(_vaultAddress).supply(_underlying, _amount, _receiver, 0);
    }

    function getYieldBearingToken(
        address _underlying, 
        address _vaultAddress
    ) external view override returns(address) {
        DataTypes.ReserveData memory poolReserves = IPool(_vaultAddress).getReserveData(_underlying);
        return poolReserves.aTokenAddress;
    }

    function withdraw(
        uint256 _amount,
        address _receiver,
        address _underlying,
        address _vaultAddress    
    ) external override onlyRegistry returns (uint256) {
        uint256 amountWithdrawn = IPool(_vaultAddress).withdraw(_underlying, _amount, _receiver);
        return amountWithdrawn;
    }

}
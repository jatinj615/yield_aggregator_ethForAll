pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IWETH.sol";
import "../interfaces/external/aaveV3/types/DataTypes.sol";
import "../interfaces/external/aaveV3/IPoolAddressesProvider.sol";
import "../interfaces/external/aaveV3/IPool.sol";
import "./RouteBase.sol";

contract AaveWETHTestnetRoute is RouteBase {

    using SafeERC20 for IERC20;

    IWETH public immutable weth;

    /// @notice constructor only requires registry address
    /// @param _registry : address of the registry
    /// @param _weth: address of aave weth
    constructor(
        address _registry,
        address _weth
    ) RouteBase(_registry) {
        weth = IWETH(_weth);
    }

    function deposit(
        uint256 _amount, 
        address _receiver, 
        address _underlying, 
        address _vaultAddress
    ) external override onlyRegistry {
        // withdraw weth from connext weth
        IWETH(_underlying).withdraw(_amount);

        // deposit to aave weth
        weth.deposit{value: _amount}();

        // deposit to aave weth vault
        IERC20(address(weth)).safeApprove(_vaultAddress, _amount);
        IPool(_vaultAddress).supply(address(weth), _amount, _receiver, 0);
    }


    function borrow(
        uint256 _amount,
        uint256 _interestRateMode,
        address _asset,
        address _onBehalfOf,
        address _vaultAddress
    ) external override onlyRegistry {
        IPool(_vaultAddress).borrow(_asset, _amount, _interestRateMode, 0, _onBehalfOf);
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

    receive() external payable {
        // TODO: add only weth acceptable
    }

}
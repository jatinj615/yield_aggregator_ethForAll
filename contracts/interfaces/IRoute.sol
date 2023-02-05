pragma solidity ^0.8.0;

interface IRoute {
    
    function deposit(
        uint256 _amount, 
        address _receiverAddress, 
        address _underlying, 
        address _vaultAddress
    ) external;

    function withdraw(
        uint256 _amount,
        address _receiver,
        address _underlying,
        address _vaultAddress 
    ) external returns (uint256);

}
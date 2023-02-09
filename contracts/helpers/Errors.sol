pragma solidity ^0.8.0;

library Errors {

    error ZeroRoutes();
    error ZeroAddress();
    error RouteNotFound(uint256 routeId);
    error ZeroAmount();
    error InvalidSender();
    error Unauthorized();
    error DomainNotSupported();

}
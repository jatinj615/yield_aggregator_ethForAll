pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";
import "./interfaces/external/aaveV3/types/DataTypes.sol";
import "./interfaces/IRoute.sol";
import "./helpers/Errors.sol";

contract Registry is IXReceiver, Ownable {

    using SafeERC20 for IERC20;

    IConnext public immutable connext;

    struct RouteData {
        address route;
        bool isEnabled;
    }

    struct BridgeRequest {
        uint32 destinationDomain;
        uint256 relayerFee;
        uint256 slippage;
        address asset;
    }

    struct VaultRequest {
        uint256 routeId;
        uint256 amount;
        address vaultAddress;
        address underlying;
        address receiverAddress;
        BridgeRequest bridgeRequest;
    }

    struct RemoteRegistry {
        uint32 domainId;
        address reomoteRegistry;
    }

    RouteData[] public routes;

    mapping(uint32 => address) public registryForDomains;

    event RouteAdded(uint256 routeId, address route, bool isEnabled);

    event RouteDisabled(uint256 routeId);


    // Todo: add source chain authentication by mapping sourceDomain->sourceRegsitry
    modifier onlySource(address _originSender, uint32 _origin) {
        if (registryForDomains[_origin] != _originSender ||
            msg.sender != address(connext)) revert Errors.Unauthorized();
        _;
    }

    modifier onlyExistingRoutes(uint256 _routeId) {
        if(routes[_routeId].route == address(0)) revert Errors.RouteNotFound(_routeId);
        _;
    }

    constructor (address _connext) {
        connext = IConnext(_connext);
    }


    function userDepositRequest(
        VaultRequest calldata _depositRequest
    )   external
        payable
        onlyExistingRoutes(_depositRequest.routeId)
        returns (bytes32)
    {
        _checkUserRequest(
            _depositRequest.amount, 
            _depositRequest.receiverAddress, 
            _depositRequest.vaultAddress, 
            _depositRequest.underlying
        );

        // Check destination domain if not same as current domain, need to bridge
        if (_depositRequest.bridgeRequest.destinationDomain != connext.domain()) {
            if (registryForDomains[_depositRequest.bridgeRequest.destinationDomain] == address(0)) revert Errors.DomainNotSupported();
            bytes memory _payload = abi.encode(
                _depositRequest.routeId,
                _depositRequest.receiverAddress,
                _depositRequest.vaultAddress
            );

            // User sends funds to this contract
            IERC20(_depositRequest.underlying).safeTransferFrom(msg.sender, address(this), _depositRequest.amount);
            // This contract approves transfer to Connext
            IERC20(_depositRequest.underlying).safeApprove(address(connext), _depositRequest.amount);

            bytes32 transferId = connext.xcall{value: _depositRequest.bridgeRequest.relayerFee}(
                _depositRequest.bridgeRequest.destinationDomain, 
                registryForDomains[_depositRequest.bridgeRequest.destinationDomain], 
                _depositRequest.bridgeRequest.asset,
                address(0), 
                _depositRequest.amount, 
                _depositRequest.bridgeRequest.slippage, 
                _payload
            );
            return transferId;
        } 
        // if bridge is not required, deposit in the vault
        else {
            IERC20(_depositRequest.underlying).safeTransferFrom(
                msg.sender, 
                routes[_depositRequest.routeId].route, 
                _depositRequest.amount
            );

            _userDeposit(
                _depositRequest.routeId, 
                _depositRequest.amount, 
                _depositRequest.receiverAddress, 
                _depositRequest.underlying, 
                _depositRequest.vaultAddress
            );
            return 0x00;
        }
        
    }

    function userWithdrawRequest(
        VaultRequest calldata _withdrawRequest
    )   external 
        payable 
        onlyExistingRoutes(_withdrawRequest.routeId)
        returns (uint256)
    {
        _checkUserRequest(
            _withdrawRequest.amount, 
            _withdrawRequest.receiverAddress, 
            _withdrawRequest.vaultAddress, 
            _withdrawRequest.underlying
        );
        
        // transfer yield bearing token from user wallet to route
        address yieldBreaingToken = IRoute(routes[_withdrawRequest.routeId].route).
                                        getYieldBearingToken(
                                            _withdrawRequest.underlying, 
                                            _withdrawRequest.vaultAddress
                                        );

        IERC20(yieldBreaingToken).safeTransferFrom(
            msg.sender, 
            routes[_withdrawRequest.routeId].route, 
            _withdrawRequest.amount
        );

        uint256 withdrawnAmount = IRoute(routes[_withdrawRequest.routeId].route).withdraw(
            _withdrawRequest.amount, 
            _withdrawRequest.receiverAddress, 
            _withdrawRequest.underlying, 
            _withdrawRequest.vaultAddress
        );

        return withdrawnAmount;
    }

    
    function xReceive(
        bytes32 _transferId,
        uint256 _amount,
        address _asset,
        address _originSender,
        uint32 _origin,
        bytes memory _callData
    ) external onlySource(_originSender, _origin) returns (bytes memory) {
        (
            uint256 _routeId,
            address _receiverAddress,
            address _vaultAddress
        ) = abi.decode(_callData, (uint256, address, address));

        IERC20(_asset).safeTransfer(routes[_routeId].route, _amount);
        // TODO: check for input params if required
        // TODO: check for revert with try catch
        _userDeposit(_routeId, _amount, _receiverAddress, _asset, _vaultAddress);
    }

    /**
     @notice Check User Request params, reverts if invalid
     @param _routeId Id of the route to follow
     @param _amount amount of underlying to deposit
     @param _receiverAddress address of the receiver to get yield tokens
     @param _vaultAddress address of vault to deposit
     @param _underlying address of underlying token
     */ 
    function _userDeposit(
        uint256 _routeId,
        uint256 _amount,
        address _receiverAddress,
        address _underlying,
        address _vaultAddress
    ) internal {
        IRoute(routes[_routeId].route).deposit(_amount, _receiverAddress, _underlying, _vaultAddress);
    }

    /**
     @notice Check User Request params, reverts if invalid
     @param _amount amount of underlying to deposit
     @param _receiverAddress address of the receiver to get yield tokens
     @param _vaultAddress address of vault to deposit
     @param _underlying address of underlying token
     */ 
    function _checkUserRequest(
        uint256 _amount,
        address _receiverAddress,
        address _vaultAddress,
        address _underlying
    ) internal pure {
        // check for amount, revert if 0
        if (_amount == 0) revert Errors.ZeroAmount();
        // check for input params, revert if zero address
        if (_receiverAddress == address(0) ||
            _vaultAddress == address(0) ||
            _underlying == address(0)) revert Errors.ZeroAddress();
    }

    // Registry Management Functions

    /**
     @notice map registry address with domain Id of remote chain
     @param _remoteRegistries: list of remote registries
     */
    function addRemoteRegistry(
        RemoteRegistry[] calldata _remoteRegistries
    ) external onlyOwner {
        for (uint256 i = 0; i < _remoteRegistries.length; i++) {
            if (_remoteRegistries[i].reomoteRegistry == address(0)) revert Errors.ZeroAddress();
            registryForDomains[_remoteRegistries[i].domainId] = _remoteRegistries[i].reomoteRegistry;
        }
    }

    // Route Management Functions

    /**
     @notice add routes to the registry
     @param _routes: list of routes to be added in `RouteData` format
     */
    function addRoute(RouteData[] calldata _routes)
        external
        onlyOwner
        returns (uint256[] memory)
    {
        if(_routes.length == 0) revert Errors.ZeroRoutes();
        uint256[] memory routeIds = new uint256[](_routes.length);
        for (uint256 i = 0; i < _routes.length; i++) {
            if(_routes[i].route == address(0)) revert Errors.ZeroAddress();
            routes.push(_routes[i]);
            routeIds[i] = routes.length - 1;
            emit RouteAdded(i, _routes[i].route, _routes[i].isEnabled);
        }
        return routeIds;
    }

    /**
     @notice Disable route if required
     @param _routeId: Id of the existing route to disable
     */
    function disableRoute(uint256 _routeId)
        external
        onlyOwner
        onlyExistingRoutes(_routeId) 
    {
        routes[_routeId].isEnabled = false;
        emit RouteDisabled(_routeId);
    }

    /**
     @notice Rescue funds if required. can only be called by `owner`
     @param _token: address of the token to rescue
     @param _receiverAddress: address of the receiver for the provided `_token`
     @param _amount: amount of the tokens to rescue
     */
    function rescueFunds(
        address _token,
        address _receiverAddress,
        uint256 _amount
    ) external onlyOwner {
        IERC20(_token).safeTransfer(_receiverAddress, _amount);
    }

}
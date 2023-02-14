const erc20 = (address) => {
    return {
        address: address,
        abi: [
            'function balanceOf(address) view returns (uint)',
            'function approve(address spender, uint256 amount) external returns (bool)',
            'function totalSupply() external view returns (uint256)',
            'function allowance(address owner, address spender) external view returns (uint256)',
            'function name() external returns (string memory)',
            'function symbol() external view returns (string memory)'
        ]
    };
};

export default erc20;

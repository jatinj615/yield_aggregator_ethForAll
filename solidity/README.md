# Bob the Yielder Smart Contracts

## Pre Requisites
- <link>`nodeV16`</link>

## Setup
1. Install dependencies
   ```
   npm install
   ```

2. Setup Environment Variables. Create a `.env` file. Sample provided in `.env.example`
   ```
    MNEMONIC=<YOUR_KEY>
    POLYGON_SCAN_API_KEY=<YOUR_KEY>
    ETHERSCAN_API_KEY=<YOUR_KEY>
    OPTIMISM_SCAN_API_KEY=<YOUR_KEY>
    ARBITRUM_SCAN_API_KEY=<YOUR_KEY>
    ALCHEMY_API_KEY=<YOUR_KEY>
   ```

3. Compile the contracts
   ```
   npx hardhat compile
   ```

4. Deployment scripts
   ```
   npx hardhat run <PATH_TO_SCRIPT> --network <NETWORK_NAME>
   ```
   `NETWORK_NAME` options - `goerli`, `optimistic_goerli`, `polygon_mumbai`, `arbitrum_goerli`.


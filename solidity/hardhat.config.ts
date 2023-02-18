import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from 'hardhat/config';
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";
import { NetworkUserConfig } from "hardhat/types";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

dotenvConfig({ path: resolve(__dirname, "./.env") });


const networkName: { [key: string]: number} = {
  "eth-goerli": 5,
  "opt-goerli": 420,
  "polygon-mumbai": 80001,
  "arb-goerli": 421613,
  "hardhat": 1
}

// TODO: refactor to a clean code
// Ensure that we have all the environment variables we need.
let mnemonic: string;
if (!process.env.MNEMONIC) {
  throw new Error("Please set your MNEMONIC in a .env file");
} else {
  mnemonic = process.env.MNEMONIC;
}

let alchemyApiKey: string;
if (!process.env.ALCHEMY_API_KEY) {
  throw new Error("Please set your ALCHEMY_API_KEY in a .env file");
} else {
  alchemyApiKey = process.env.ALCHEMY_API_KEY;
}

let etherScanApiKey: string;
if (!process.env.ETHERSCAN_API_KEY) {
  throw new Error("Please set your ETHERSCAN_API_KEY in a .env file");
} else {
  etherScanApiKey = process.env.ETHERSCAN_API_KEY;
}

let polygonScanApiKey: string;
if (!process.env.POLYGON_SCAN_API_KEY) {
  throw new Error("Please set your POLYGON_SCAN_API_KEY in a .env file");
} else {
  polygonScanApiKey = process.env.POLYGON_SCAN_API_KEY;
}

let optimismScanApiKey: string;
if (!process.env.OPTIMISM_SCAN_API_KEY) {
  throw new Error("Please set your OPTIMISM_SCAN_API_KEY in a .env file");
} else {
  optimismScanApiKey = process.env.OPTIMISM_SCAN_API_KEY;
}

let arbitrumScanApiKey: string;
if (!process.env.ARBITRUM_SCAN_API_KEY) {
  throw new Error("Please set your ARBITRUM_SCAN_API_KEY in a .env file");
} else {
  arbitrumScanApiKey = process.env.ARBITRUM_SCAN_API_KEY;
}
// End of env variables //


function createSolidityVersion(version: string) {
  return {
    version: version,
    settings: {
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  };
}


function createTestnetConfig(network: keyof typeof networkName): NetworkUserConfig {
  const url: string = "https://" + network + ".g.alchemy.com/v2/" + alchemyApiKey;
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: networkName[network],
    url,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ["local"],
    },
    hardhat: {
      // accounts: {
      //   mnemonic,
      // },
      chainId: networkName["hardhat"],
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
      forking: {
        url: "https://eth-goerli.g.alchemy.com/v2/" + alchemyApiKey
      }
    },
    goerli: createTestnetConfig("eth-goerli"),
    optimistic_goerli: createTestnetConfig("opt-goerli"),
    polygon_mumbai: createTestnetConfig("polygon-mumbai"),
    arbitrum_goerli: createTestnetConfig("arb-goerli"),
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
    feeCollector: {
      default: 1, // here this will by default take the second account as feeCollector (so in the test this will be a different account than the deployer)
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    compilers: [
      createSolidityVersion("0.8.0"),
      createSolidityVersion("0.8.10"),
      createSolidityVersion("0.8.17")
    ]
    
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  mocha: {
    timeout: 2000000
  },
  etherscan: {
    apiKey: {
      goerli: etherScanApiKey,
      polygonMumbai: polygonScanApiKey,
      optimisticGoerli: optimismScanApiKey,
      arbitrumGoerli: arbitrumScanApiKey,
    }
  }
};

export default config;
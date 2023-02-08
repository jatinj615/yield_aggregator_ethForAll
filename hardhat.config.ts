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

// Todo: load etherscan keys for all networks

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
        url: "https://eth-mainnet.alchemyapi.io/v2/" + alchemyApiKey
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
      {
        version: "0.8.17",
        settings: {
          metadata: {
            // Not including the metadata hash
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      }, 
      {
        version: "0.8.10"
      }
    ]
    
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: {
      mainnet:"",
      polygon: "",
      optimisticEthereum: "",
      arbitrumOne: "",
    }
  }
};


export default config;
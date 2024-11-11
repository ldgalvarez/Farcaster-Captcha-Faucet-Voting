const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;
const polygonRpcUrl = process.env.POLYGON_RPC_URL;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Cualquier red (para desarrollo)
    },
    amoy: {
      provider: () => new HDWalletProvider(mnemonic, polygonRpcUrl),
      network_id: parseInt(process.env.NETWORK_ID, 10), // ID de red de Polygon PoS
      gas: 5000000,
      gasPrice: 20000000000,
      confirmations: 2, // Número de confirmaciones
      timeoutBlocks: 200, // Número de bloques antes de que se agote el tiempo
      skipDryRun: true // Saltar la prueba en seco
    }
  },
  compilers: {
    solc: {
      version: "0.8.0" // Versión de Solidity
    }
  }
};

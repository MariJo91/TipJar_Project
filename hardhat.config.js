require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Cargar las variables de entorno

// Obtén tu URL RPC de Sepolia y tu clave privada desde el archivo .env
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20", // O la configuración de tus compiladores si tienes varias versiones
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      // Usa un array literal para 'accounts'. Verifica que PRIVATE_KEY no sea undefined.
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 11155111, // Este es el ID de cadena de Sepolia
    },
    
    // localhost: {
    //   url: "http://127.0.0.1:8545/",
    //   chainId: 31337,
    // },
  },
  // Opcional: si se quiere verificar contratos en Etherscan
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

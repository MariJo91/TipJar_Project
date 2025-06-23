

# 💰 TipJar: Contrato Inteligente de Propinas en Ethereum

Este proyecto implementa un contrato inteligente llamado `TipJar` en la blockchain de Ethereum, diseñado para permitir a los usuarios enviar propinas en ETH junto con un mensaje. El propietario del contrato tiene la capacidad exclusiva de retirar todos los fondos acumulados. Desarrollado con **Solidity**, **Hardhat** y **Ethers.js**, este proyecto incluye scripts de despliegue, tests automatizados y un script para interactuar con el contrato en la testnet Sepolia.

---

## 🌟 Características Principales

* **`tip(string memory message)`**: Una función `public` y `payable` que permite a cualquier usuario enviar ETH como propina y adjuntar un mensaje personalizado.
* **`withdraw()`**: Una función exclusiva para el `owner` del contrato, que le permite retirar todos los fondos de ETH acumulados en el `TipJar`.
* **Evento `NewTip`**: Se emite cada vez que se recibe una propina, registrando la dirección del remitente, la cantidad de ETH enviada y el mensaje.
* **`owner`**: Una variable pública que almacena la dirección de la cuenta que desplegó el contrato, otorgándole los permisos de retiro.

---

## 🛠️ Requisitos Previos

Antes de clonar y ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

* **Node.js** (versión 18 o superior recomendada)
* **npm** (Node Package Manager) o **yarn**
* **Hardhat**: Puedes instalarlo globalmente con `npm install -g hardhat`
* Una cuenta en **Alchemy** o **Infura** para obtener una URL RPC para la red de prueba **Sepolia**.
* Una **clave privada** de una cuenta de Ethereum que tenga fondos en la testnet Sepolia. Esta cuenta será usada para el despliegue y para actuar como el `owner` del contrato.
* (Opcional pero recomendado) Una **API Key de Etherscan** para verificar tu contrato en Sepolia después del despliegue.

---

## 🚀 Configuración del Proyecto

1.  **Clona este repositorio:**
    ```bash
    git clone [https://https://github.com/MariJo91/TipJar_Project
    cd TipJar_Project
    ```

2.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    # O si usas yarn:
    # yarn install
    ```

3.  **Configura tus variables de entorno:**
    Crea un archivo llamado `.env` en la raíz de tu proyecto (si no existe ya) y añade las siguientes variables. **¡Nunca compartas este archivo ni lo subas a GitHub!**

    ```dotenv
    SEPOLIA_RPC_URL="TU_URL_RPC_DE_SEPOLIA_AQUI"
    PRIVATE_KEY="TU_CLAVE_PRIVADA_DE_ETHEREUM_AQUI"
    ETHERSCAN_API_KEY="TU_API_KEY_DE_ETHERSCAN_AQUI" # Opcional
    ```
    * `SEPOLIA_RPC_URL`: La URL RPC que obtuviste de Alchemy o Infura para Sepolia.
    * `PRIVATE_KEY`: La clave privada de tu cuenta de Ethereum (sin el prefijo `0x`). **¡Maneja esta clave con extrema precaución!**
    * `ETHERSCAN_API_KEY`: Si deseas verificar tu contrato en Etherscan.

---

## 👨‍💻 Uso del Proyecto

### 📦 Compilar el Contrato

Para compilar el contrato inteligente `TipJar.sol`, ejecuta:

```bash
npx hardhat compile

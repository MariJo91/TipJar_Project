const hre = require("hardhat");


const CONTRACT_ADDRESS = "0xf6d7Db90020BDc7457EbDc40adc0faAf4D4bEbD5"; // EJEMPLO: "0xAbc123..."

async function main() {
    // Obtenemos el signer que usará el script (el owner del contrato en este caso)
    const [signer] = await hre.ethers.getSigners();
    console.log("Conectado con la cuenta:", signer.address);

    // Obtenemos la Factoría del Contrato para obtener la interfaz (ABI) del contrato
    const TipJarFactory = await hre.ethers.getContractFactory("TipJar");

    // Nos conectamos al contrato desplegado usando su dirección y la interfaz
    const tipJar = new hre.ethers.Contract(CONTRACT_ADDRESS, TipJarFactory.interface, signer);

    console.log(`\n--- Interactuando con TipJar en la dirección: ${CONTRACT_ADDRESS} ---`);

    // --- 1. Mostrar balance del contrato antes de las acciones ---
    console.log("\n--- Balance del contrato antes de las acciones ---");
    let contractBalance = await hre.ethers.provider.getBalance(CONTRACT_ADDRESS);
    console.log("Balance actual del TipJar:", hre.ethers.formatEther(contractBalance), "ETH");

    // --- 2. Enviar una propina con mensaje ---
    console.log("\n--- Enviando una propina ---");
    const tipAmount = hre.ethers.parseEther("0.005"); // Cantidad de ETH para la propina
    const message = "¡Hola desde el script de interacción de Hardhat!";

    try {
        const tipTx = await tipJar.tip(message, { value: tipAmount });
        await tipTx.wait(); // Esperar a que la transacción sea minada
        console.log("Propinada enviada. Hash de transacción:", tipTx.hash);
    } catch (error) {
        console.error("Error al enviar la propina:", error.message);
    }

    // --- 3. Mostrar balance después de la propina ---
    console.log("\n--- Balance del contrato después de la propina ---");
    contractBalance = await hre.ethers.provider.getBalance(CONTRACT_ADDRESS);
    console.log("Balance actual del TipJar:", hre.ethers.formatEther(contractBalance), "ETH");

    // --- 4. Ejecutar withdraw() desde el owner ---
    console.log("\n--- Intentando retirar fondos (solo owner) ---");
    const ownerAddress = await tipJar.owner(); // Obtenemos la dirección del owner del contrato

    if (signer.address.toLowerCase() === ownerAddress.toLowerCase()) {
        const initialOwnerBalance = await hre.ethers.provider.getBalance(signer.address);
        console.log("Balance inicial del owner:", hre.ethers.formatEther(initialOwnerBalance), "ETH");

        try {
            const withdrawTx = await tipJar.withdraw();
            await withdrawTx.wait(); // Esperar a que la transacción sea minada
            console.log("Fondos retirados. Hash de transacción:", withdrawTx.hash);

            const finalOwnerBalance = await hre.ethers.provider.getBalance(signer.address);
            console.log("Balance final del owner:", hre.ethers.formatEther(finalOwnerBalance), "ETH");
        } catch (error) {
            console.error("Error al retirar fondos:", error.message);
        }
    } else {
        console.log("La cuenta conectada no es el owner del contrato. No se puede retirar.");
    }

    console.log("\n--- Balance final del contrato TipJar ---");
    contractBalance = await hre.ethers.provider.getBalance(CONTRACT_ADDRESS);
    console.log("Balance final del TipJar:", hre.ethers.formatEther(contractBalance), "ETH");
}

// Manejo de errores
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
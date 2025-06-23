const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Desplegando contratos con la cuenta:", deployer.address);

  // Obtenemos la Factoría del Contrato "TipJar"
  const TipJar = await hre.ethers.getContractFactory("TipJar");

  // Desplegamos el contrato
  const tipJar = await TipJar.deploy();

  // Esperamos a que la transacción de despliegue sea minada y el contrato esté listo
  await tipJar.waitForDeployment();

  console.log("TipJar desplegado en la dirección:", tipJar.target);

  // --- OPCIONAL: Guardar la dirección del contrato ---
  // Es muy útil guardar la dirección del contrato desplegado para usarla fácilmente
  // en otros scripts (como interact.js) o en una UI.
  // Puedes descomentar las siguientes líneas si quieres guardar la dirección en un archivo:
  // const fs = require('fs');
  // const path = require('path');
  // const contractAddressPath = path.join(__dirname, '../contractAddress.js');
  // fs.writeFileSync(contractAddressPath, `module.exports = "${tipJar.target}";`);
  // console.log(`Dirección del contrato guardada en ${contractAddressPath}`);
}

// Asegúrate de manejar cualquier error durante la ejecución del script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = ethers; // Se agrega esta Linea para Desestructurar 
// console.log("🔍 ethers.utils disponible:", typeof ethers?.utils?.parseEther === "function" ? "OK" : "NOPE");

describe("TipJar", function () {
  let TipJar, tipJar, owner, tipper;

  beforeEach(async () => {
    [owner, tipper] = await ethers.getSigners();
    TipJar = await ethers.getContractFactory("TipJar");
    tipJar = await TipJar.deploy();
  });

  it("debe aceptar propinas y emitir evento", async () => {
    const tipAmount = parseEther("0.05");

    const tipTx = await tipJar.connect(tipper).tip("¡Gran trabajo!", {
      value: tipAmount,
    });

    await expect(tipTx)
      .to.emit(tipJar, "NewTip")
      .withArgs(tipper.address, tipAmount, "¡Gran trabajo!");

      // Verificar el balance del contrato después de la propina
    const contractBalance = await ethers.provider.getBalance(tipJar.target); // Usar .target en lugar de .address para versiones recientes
    expect(contractBalance).to.equal(tipAmount);
  
  });

    it("debe permitir sólo al owner hacer withdraw", async () => {
    // Se Cambia ethers.utils.parseEther a ethers.parseEther
    const tipAmount = ethers.parseEther("0.1");
    await tipJar.connect(tipper).tip("Sigue así", { value: tipAmount });

    
    // Se usa .to.be.closeTo para una comprobación más robusta del balance del owner.
    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
    const contractBalanceBeforeWithdraw = await ethers.provider.getBalance(tipJar.target);

    const withdrawTx = await tipJar.connect(owner).withdraw();
    const receipt = await withdrawTx.wait();

    const gasUsed = receipt.gasUsed;
    const gasPrice = receipt.gasPrice;
    const gasCost = gasUsed * gasPrice;

    const finalOwnerBalance = await ethers.provider.getBalance(owner.address);

    expect(finalOwnerBalance).to.be.closeTo(initialOwnerBalance + contractBalanceBeforeWithdraw - gasCost, ethers.parseEther("0.000001"));
    expect(await ethers.provider.getBalance(tipJar.target)).to.equal(0);


    await expect(tipJar.connect(tipper).withdraw()).to.be.revertedWith(
      "Solo el owner puede retirar" 
    );

  });

    it("debe reflejar correctamente el balance del contrato", async () => {
    // Se Cambia ethers.utils.parseEther a ethers.parseEther
    const tipAmount = ethers.parseEther("0.01");
    await tipJar.connect(tipper).tip("Otro tip", { value: tipAmount });

    // Se Usa .target en lugar de .address para la dirección del contrato
    const contractBalance = await ethers.provider.getBalance(tipJar.target);
    expect(contractBalance).to.equal(tipAmount);
  });
});
 

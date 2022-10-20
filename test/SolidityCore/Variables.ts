import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

describe("Variables", function () {
  async function deployContractFixture() {
    const Contract = await ethers.getContractFactory("Variables");
    const contract = await Contract.deploy();

    return { contract };
  }

  describe("Deployment of Variables contract", function () {
    it("Should print contract's doSomething functions' local variable logs", async function () {
      const { contract } = await loadFixture(deployContractFixture);
      await contract.doSomething();
    });

    it("Should log contracts state variables values", async function () {
      const { contract } = await loadFixture(deployContractFixture);
      console.log(
        `State Variables Values: 
        text: ${await contract.text()}, 
        num: ${await contract.num()}`
      );
    });
  });
});

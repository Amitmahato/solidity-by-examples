import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleStorage", function () {
  async function deploySimpleStorageFixture() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const contract = await SimpleStorage.deploy();

    return { contract };
  }

  describe("Deployment of SimpleStorage contract", function () {
    it("Should get the value that is set", async function () {
      const { contract } = await loadFixture(deploySimpleStorageFixture);

      await contract.set(7545);

      expect(await contract.get()).to.equal(7545);
    });
  });
});

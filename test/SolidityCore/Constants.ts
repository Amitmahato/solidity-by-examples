import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Constants", function () {
  async function deployContractFixture() {
    const Contract = await ethers.getContractFactory("Constants");
    const contract = await Contract.deploy();

    return { contract };
  }

  describe("Deployment of Constants contract", function () {
    it("should have right values for the constants", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      expect(await contract.MY_ADDRESS()).to.be.equal(
        "0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc",
        "Constant address value should match"
      );
      expect(await contract.MY_UINT()).to.be.equal(
        123,
        "Constant uint value should match"
      );
    });
  });
});

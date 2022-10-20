import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Loop", function () {
  async function deployLoopFixture() {
    const Loop = await ethers.getContractFactory("Loop");
    const contract = await Loop.deploy();

    return { contract };
  }

  describe("Deployment of Loop contract", function () {
    it("Should log the variables value in the loop skipping 3 & breaking after 4 for i, and upto 9 for j", async function () {
      const { contract } = await loadFixture(deployLoopFixture);
      await contract.loop();
    });
  });
});

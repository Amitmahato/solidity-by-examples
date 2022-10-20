import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("HelloWorld", function () {
  async function deployHelloWorldFixture() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();

    return { helloWorld };
  }

  describe("Deployment of HelloWorld contract", function () {
    it("Should set the right greeting", async function () {
      const { helloWorld } = await loadFixture(deployHelloWorldFixture);

      expect(await helloWorld.greet()).to.equal("Hello World!");
    });
  });
});

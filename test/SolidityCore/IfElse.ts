import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("IfElse", function () {
  async function deployIfElseFixture() {
    const IfElse = await ethers.getContractFactory("IfElse");
    const contract = await IfElse.deploy();

    return { contract };
  }

  describe("Deployment of IfElse contract", function () {
    it("Should match all the returned values from the `foo` function", async function () {
      const { contract } = await loadFixture(deployIfElseFixture);

      expect(await contract.foo(5)).equals(
        0,
        "Function foo should return 0 for parameter of value less than 10"
      );

      expect(await contract.foo(14)).equals(
        1,
        "Function foo should return 1 for parameter of value less than 20"
      );

      expect(await contract.foo(25)).equals(
        2,
        "Function foo should return 2 for parameter of value greater than 20"
      );
    });

    it("Should match all the returned values from the `ternary` function", async function () {
      const { contract } = await loadFixture(deployIfElseFixture);

      expect(await contract.ternary(5)).equals(
        1,
        "Function ternary should return 1 for parameter of value less than 10"
      );

      expect(await contract.ternary(14)).equals(
        2,
        "Function ternary should return 2 for parameter of value greater than 10"
      );
    });
  });
});

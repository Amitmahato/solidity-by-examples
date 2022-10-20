import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("Primitives", function () {
  async function deployContractFixture() {
    const Contract = await ethers.getContractFactory("Primitives");
    const contract = await Contract.deploy();

    return { contract };
  }

  describe("Deployment of Primitives contract", function () {
    it("Should check all the state values, after deployment", async function () {
      const { contract } = await loadFixture(deployContractFixture);
      expect(await contract.boo()).to.equal(true, "Boolean value should match");
      expect(await contract.u8()).to.equal(1, "uint8 values should match");
      expect(await contract.u256()).to.equal(
        456,
        "uint256 values should match"
      );
      expect(await contract.u()).to.equal(123, "values should match");
      expect(await contract.i8()).to.equal(-1, "int8 values should match");
      expect(await contract.i256()).to.equal(456, "i256 values should match");
      expect(await contract.i()).to.equal(-123, "values should match");

      expect(await contract.minInt()).to.equal(
        BigNumber.from(
          "-57896044618658097711785492504343953926634992332820282019728792003956564819968"
        ),
        "Solidity's Min Int value should match"
      );
      expect(await contract.maxInt()).to.equal(
        BigNumber.from(
          "57896044618658097711785492504343953926634992332820282019728792003956564819967"
        ),
        "Solidity's Max Int value should match"
      );

      expect(await contract.addr()).to.equal(
        "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
        "Address values should match"
      );
      expect(await contract.a()).to.equal("0xb5", "bytes1 value should match");
      expect(await contract.b()).to.equal("0x56", "bytes1 value should match");

      expect(await contract.defaultBoo()).to.equal(
        false,
        "Default boolean values should be falase"
      );
      expect(await contract.defaultUint()).to.equal(
        0,
        "Default uint values should be 0"
      );
      expect(await contract.defaultInt()).to.equal(
        0,
        "Default int values should be 0"
      );
      expect(await contract.defaultAddr()).to.equal(
        "0x0000000000000000000000000000000000000000",
        "Default value of an address should be 0x0000000000000000000000000000000000000000"
      );
    });
  });
});

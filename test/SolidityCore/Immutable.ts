import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Immutable", function () {
  async function deployContractFixture() {
    const [owner] = await ethers.provider.listAccounts();
    const myUint = 8545;

    const Contract = await ethers.getContractFactory("Immutable");

    const contract = await Contract.deploy(myUint);

    return { contract, owner, myUint };
  }

  describe("Deployment of Constants contract", function () {
    it("should set right immutable values for the state variables", async () => {
      const { contract, owner, myUint } = await loadFixture(
        deployContractFixture
      );

      expect(await contract.MY_ADDRESS()).to.be.equal(
        owner,
        "Contract address value should match with the one deploying the contract"
      );
      expect(await contract.MY_UINT()).to.be.equal(
        myUint,
        "Contract uint value should match with the set during deployment"
      );
    });
  });
});

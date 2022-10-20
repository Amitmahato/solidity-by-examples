import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("EtherUnits", function () {
  async function deployEtherUnitsFixture() {
    const EtherUnits = await ethers.getContractFactory("EtherUnits");
    const contract = await EtherUnits.deploy();

    return { contract };
  }

  describe("Deployment of EtherUnits contract", function () {
    it("Should compare all the ETH currency units", async function () {
      const { contract } = await loadFixture(deployEtherUnitsFixture);

      const oneWei = await contract.oneWei();
      const isOneWei = await contract.isOneWei();
      const oneEther = await contract.oneEther();
      const isOneEther = await contract.isOneEther();

      console.log(
        "oneWei: ",
        oneWei,
        "\tisOneWei: ",
        isOneWei,
        "\toneEther: ",
        oneEther,
        "\tisOneEther: ",
        isOneEther
      );

      expect(oneWei).to.equal(1);
      expect(isOneWei).to.equal(true);
      expect(oneEther).to.equal(BigNumber.from("1000000000000000000"));
      expect(isOneEther).to.equal(true);
    });
  });
});

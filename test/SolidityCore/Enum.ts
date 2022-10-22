import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Enum } from "../../typechain-types";

describe("Enum", function () {
  enum Status {
    Pending = 0,
    Shipped = 1,
    Accepted = 2,
    Rejected = 3,
    Canceled = 4,
  }

  async function deployContractFixture() {
    const Contract = await ethers.getContractFactory("Enum");
    const contract = (await Contract.deploy()) as Enum;

    return { contract };
  }

  describe("Deployment of Enum contract", function () {
    it("should have right value for the status state after manipulation", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      expect(await contract.get()).to.be.equal(
        Status.Pending,
        "Enum contract initializes status field with Pending status"
      );

      await contract.set(Status.Rejected);
      expect(await contract.get()).equals(
        Status.Rejected,
        "Status field should have been updated to Rejected status"
      );

      await contract.cancel();
      expect(await contract.get()).equals(
        Status.Canceled,
        "Status field should have been updated to Canceled status"
      );

      await contract.reset();
      expect(await contract.get()).equals(
        Status.Pending,
        "Status field should have been reset to Pending status"
      );
    });
  });
});

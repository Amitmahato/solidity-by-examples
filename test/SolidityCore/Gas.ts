import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import assert from "assert";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Gas", function () {
  async function deployGasFixture() {
    const Gas = await ethers.getContractFactory("Gas");
    const contract = await Gas.deploy();

    return { contract };
  }

  describe("Deployment of Gas contract", function () {
    it("Should catch an error: `TransactionExecutionError: Transaction ran out of gas`", async function () {
      const { contract } = await loadFixture(deployGasFixture);

      try {
        // the test will be stuck here for a while unless the transaction runs out of gas,
        // as the contract's forever function goes into an infinite loop
        // the test will fail automatically after the execution of this test case times-out
        await contract.forever();
        throw null;
      } catch (error: any) {
        assert(error, "Expected an error but did not get one");
        expect(error.name).to.be.equal(
          "TransactionExecutionError",
          `Expected an error of type "TransactionExecutionError" but got of type ${error.name} instead`
        );

        assert(
          error?._stack?.startsWith(
            "TransactionExecutionError: Transaction ran out of gas"
          ),
          `Expected an error starting with "TransactionExecutionError: Transaction ran out of gas" but got "${error._stack}" instead.`
        );
      }
    });
  });
});

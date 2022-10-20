import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("FirstApp - Counter", function () {
  async function deployCounterFixture() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    return { counter };
  }

  describe("Deployment of Counter contract", function () {
    it("Should initialize counter with zero value", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.get()).to.equal(0);
    });

    it("Should increase the count to 1", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment();

      expect(await counter.get()).to.equal(1);
    });

    it("Should first increase the count to 1 and then decrease it to 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment();

      expect(await counter.get()).to.equal(1);

      await counter.decrement();

      expect(await counter.get()).to.equal(0);
    });

    it("Should fail to decrease the count below 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(counter.decrement()).to.revertedWith(
        "The counter is already at its minimum possible value"
      );
    });
  });
});

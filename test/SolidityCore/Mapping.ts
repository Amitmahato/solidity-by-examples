import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { Mapping } from "../typechain-types/SolidityCore/Mapping";

describe("Mapping", function () {
  async function deployMappingFixture() {
    const accounts = await ethers.provider.listAccounts();
    const MappingContract = await ethers.getContractFactory("Mapping");
    const contract = (await MappingContract.deploy()) as Contract & Mapping;

    const vaultValue = [];
    for (let i = 0; i < accounts.length; i++) {
      vaultValue.push(i * 2 + 5 ** 2);
    }

    return { contract, accounts, vaultValue };
  }

  const storeValues = async (
    contract: Mapping,
    accounts: string[],
    vaultValue: number[]
  ) => {
    const storeValues = [];
    for (let i = 0; i < accounts.length; i++) {
      storeValues.push(contract.set(accounts[i], vaultValue[i]));
    }

    await Promise.all(storeValues);
  };

  const generateRandomFiveIndexes = (upperLimit: number) => {
    const randomFiveIndexes = [];
    for (let i = 0; i < 5; i++) {
      randomFiveIndexes.push(Math.floor(Math.random() * upperLimit));
    }
    return randomFiveIndexes;
  };

  const retrieveValuesFromIndexedAccounts = async (
    contract: Mapping,
    accounts: string[],
    indexes: number[]
  ) => {
    const retrieveValues = indexes.map((randomIndex) => {
      return contract.get(accounts[randomIndex]);
    });

    return await Promise.all(retrieveValues);
  };

  describe("Deployment of Mapping contract", function () {
    it("Should set & retrieve a provided value for each addresses", async function () {
      const { contract, accounts, vaultValue } = await loadFixture(
        deployMappingFixture
      );

      await storeValues(contract, accounts, vaultValue);
      const randomFiveIndexes = generateRandomFiveIndexes(accounts.length);
      const retrievedValues = await retrieveValuesFromIndexedAccounts(
        contract,
        accounts,
        randomFiveIndexes
      );

      randomFiveIndexes.forEach((randomIndex, index) => {
        expect(retrievedValues[index]).equals(
          vaultValue[randomIndex],
          "Stored value for the given address should match with the retrieved one"
        );
      });
    });

    it("Should set values, remove value at one address & retrieve values for each addresses", async function () {
      const { contract, accounts, vaultValue } = await loadFixture(
        deployMappingFixture
      );

      await storeValues(contract, accounts, vaultValue);
      const randomFiveIndexes = generateRandomFiveIndexes(accounts.length);

      const firstRandomIndex = randomFiveIndexes[0];
      // Remove value from the contract for the first random indexed address
      await contract.remove(accounts[firstRandomIndex]);

      const retrievedValues = await retrieveValuesFromIndexedAccounts(
        contract,
        accounts,
        randomFiveIndexes
      );

      randomFiveIndexes.forEach((randomIndex, index) => {
        if (firstRandomIndex === randomIndex) {
          expect(retrievedValues[index]).equals(
            0,
            "Stored value when removed should be set to the default value of 0"
          );
        } else {
          expect(retrievedValues[index]).equals(
            vaultValue[randomIndex],
            "Stored value for the given address should match with the retrieved one"
          );
        }
      });
    });
  });
});

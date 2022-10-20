import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { NestedMapping } from "../../typechain-types/SolidityCore/NestedMapping";

describe("NestedMapping", function () {
  async function deployMappingFixture() {
    const accounts = await ethers.provider.listAccounts();
    const NestedMappingContract = await ethers.getContractFactory(
      "NestedMapping"
    );
    const contract = (await NestedMappingContract.deploy()) as Contract &
      NestedMapping;

    const vaultKey = [];
    for (let i = 0; i < accounts.length; i++) {
      vaultKey.push([i * 2 + 5 ** 2, i * 3 + 6 ** 3]);
    }

    const vaultOpen = [];
    for (let i = 0; i < accounts.length; i++) {
      const v1Open = Math.floor(Math.random() * 2) > 0 ? true : false;
      const v2Open = Math.floor(Math.random() * 2) > 0 ? true : false;
      vaultOpen.push([v1Open, v2Open]);
    }

    return { contract, accounts, vaultKey, vaultOpen };
  }

  const storeValues = async (
    contract: NestedMapping,
    accounts: string[],
    vaultKey: number[][],
    vaultOpen: boolean[][]
  ) => {
    const storeValues = [];
    for (let i = 0; i < accounts.length; i++) {
      storeValues.push(
        contract.set(accounts[i], vaultKey[i][0], vaultOpen[i][0])
      );
      storeValues.push(
        contract.set(accounts[i], vaultKey[i][1], vaultOpen[i][1])
      );
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
    contract: NestedMapping,
    accounts: string[],
    vaultKey: number[][],
    indexes: number[]
  ) => {
    const retrieveValues = indexes.map((randomIndex) => {
      return contract.get(
        accounts[randomIndex],
        vaultKey[randomIndex][randomIndex % 2 === 0 ? 0 : 1]
      );
    });

    return await Promise.all(retrieveValues);
  };

  describe("Deployment of Mapping contract", function () {
    it("Should set & retrieve a provided value for each addresses", async function () {
      const { contract, accounts, vaultKey, vaultOpen } = await loadFixture(
        deployMappingFixture
      );

      await storeValues(contract, accounts, vaultKey, vaultOpen);
      console.log("Values have been stored");
      const randomFiveIndexes = generateRandomFiveIndexes(accounts.length);
      const retrievedValues = await retrieveValuesFromIndexedAccounts(
        contract,
        accounts,
        vaultKey,
        randomFiveIndexes
      );

      randomFiveIndexes.forEach((randomIndex, index) => {
        const openVaultIndex = randomIndex % 2 === 0 ? 0 : 1;
        expect(retrievedValues[index]).equals(
          vaultOpen[randomIndex][openVaultIndex],
          "Stored value for the given address & key should match with the retrieved one"
        );
      });
    });

    it("Should set values, remove value at one address & provided key, and retrieve values for each addresses", async function () {
      const { contract, accounts, vaultKey, vaultOpen } = await loadFixture(
        deployMappingFixture
      );

      await storeValues(contract, accounts, vaultKey, vaultOpen);
      const randomFiveIndexes = generateRandomFiveIndexes(accounts.length);

      const firstRandomIndex = randomFiveIndexes[0];
      const openVaultIndex = firstRandomIndex % 2 === 0 ? 0 : 1;
      // Remove value from the contract for the first random indexed address
      await contract.remove(
        accounts[firstRandomIndex],
        vaultKey[firstRandomIndex][openVaultIndex]
      );

      const retrievedValues = await retrieveValuesFromIndexedAccounts(
        contract,
        accounts,
        vaultKey,
        randomFiveIndexes
      );

      randomFiveIndexes.forEach((randomIndex, index) => {
        const openVaultIndex = randomIndex % 2 === 0 ? 0 : 1;
        if (firstRandomIndex === randomIndex) {
          expect(retrievedValues[index]).equals(
            false,
            "Stored value when removed should be set to the default value of false"
          );
        } else {
          expect(retrievedValues[index]).equals(
            vaultOpen[randomIndex][openVaultIndex],
            "Stored value for the given address & key should match with the retrieved one"
          );
        }
      });
    });
  });
});

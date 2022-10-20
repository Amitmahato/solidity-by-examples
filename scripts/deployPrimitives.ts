/**
 * These deployment scripts are no longer required as we have defined a task for deploying the contracts
 * The custom defined task as of now only supports the deployment of contracts that doesn't take any initialization parameter
 * For any contract that receives any argument on constructor should define its own script for deployment as it is done in ~/script/deploy.ts script file
 **/

import { ethers } from "hardhat";

async function main() {
  const Primitives = await ethers.getContractFactory("Primitives");
  const primitives = await Primitives.deploy();

  await primitives.deployed();

  console.log(`Primitives deployed to ${primitives.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

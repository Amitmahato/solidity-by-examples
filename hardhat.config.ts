import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

task("deploy", "Deploy a contract to the network.")
  .addParam("contract", "The name of the contract to deploy")
  .addOptionalVariadicPositionalParam(
    "rest",
    "...rest of the optional parameters that are directly passed to the contract's constructor. Pass in the order that the constructor expects."
  )
  .setAction(async (args, hre) => {
    // Compile all the contracts
    await hre.run("compile");

    const Contract = await hre.ethers.getContractFactory(args.contract);
    const contract = await Contract.deploy(...(args.rest ? args.rest : []));

    await contract.deployed();

    console.log(`${args.contract} deployed to ${contract.address}`);
  });

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

export default config;

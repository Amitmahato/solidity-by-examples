import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Struct } from "../../typechain-types";

interface Todo {
  text: string;
  completed: boolean;
}

describe("Struct", function () {
  const todo: Todo = {
    text: "Title 1",
    completed: false,
  };
  async function deployContractFixture() {
    const Contract = await ethers.getContractFactory("Struct");
    const contract = (await Contract.deploy()) as Struct;

    return { contract };
  }

  describe("Deployment of Struct contract", function () {
    it("should check for todos", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      let totalTodos = 0;

      await contract.create(todo.text);
      totalTodos++;

      let [text, completed] = await contract.get(totalTodos - 1);
      expect(text).to.be.equal(
        todo.text,
        "Todo text should be the one initially set"
      );
      expect(completed).to.be.equal(
        todo.completed,
        "Todo should not be initially completed"
      );

      todo.text = "Title Updated";
      await contract.updateText(totalTodos - 1, todo.text);
      [text] = await contract.get(totalTodos - 1);
      expect(text).to.be.equal(todo.text, "Todo text should have been updated");

      todo.completed = true;
      await contract.toggleCompleted(totalTodos - 1);
      let _todo = await contract.get(totalTodos - 1);
      expect(_todo.completed).to.be.equal(
        todo.completed,
        "Todo should have been marked as completed"
      );

      todo.completed = !todo.completed;
      await contract.toggleCompleted(totalTodos - 1);
      _todo = await contract.get(totalTodos - 1);
      expect(_todo.completed).to.be.equal(
        todo.completed,
        "Todo should have been marked as not completed"
      );

      await expect(contract.get(5)).revertedWith("Index out of range");
    });
  });
});

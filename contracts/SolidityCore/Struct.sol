// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./StructDeclaration.sol";

/**
 * You can define your own type by creating a struct.
 * They are useful for grouping together related data.
 * Structs can be declared outside of a contract and imported in another contract.
 */
contract Struct {
    Todo[] public todos;

    function create(string calldata _text) public {
        // 3 ways to initialize a struct
        // Method 1 - calling it like a class
        todos.push(Todo({text: _text, completed: false}));

        // Method 2 - calling it like a function
        // todos.push(Todo(_text, false));

        // Method 3 - Creating an object first and initializing the values
        // Todo memory todo;
        // todo.text = _text;
        // // todo.completed is initialized to false
        // todos.push(todo);
    }

    // Solidity automatically created a getter for 'todos' so
    // you don't actually need this function.
    function get(uint256 _index)
        public
        view
        returns (string memory text, bool completed)
    {
        require(_index < todos.length, "Index out of range");

        // it can be read in the memory as well
        Todo storage todo = todos[_index];
        return (todo.text, todo.completed);
    }

    // update todo text
    function updateText(uint256 _index, string calldata _text) public {
        require(_index < todos.length, "Index out of range");

        // if read in the memory, the update is not reflected in the state
        Todo storage todo = todos[_index];
        todo.text = _text;
    }

    function toggleCompleted(uint256 _index) public {
        require(_index < todos.length, "Index out of range");

        // if read in the memory, the update is not reflected in the state
        Todo storage todo = todos[_index];

        todo.completed = !todo.completed;
    }
}

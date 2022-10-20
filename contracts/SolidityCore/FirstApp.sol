// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.13 and less than 0.9.0
pragma solidity ^0.8.13;

contract Counter {
    uint256 public count;

    /// The counter is already at its minimum possible value
    error CounterAtMinimumValue(uint256);

    // Function to get the current count
    function get() public view returns (uint256) {
        return count;
    }

    // Function to increment count by 1
    function increment() public {
        count += 1;
    }

    // Function to decrement count by 1
    function decrement() public {
        // This function will fail if count = 0, so revert with error
        if (count < 1) {
            revert CounterAtMinimumValue(count);
        }

        count -= 1;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "hardhat/console.sol";

/**
 * Solidity supports for, while, and do while loops.
 * Don't write loops that are unbounded as this can hit the gas limit, causing your transaction to fail.
 * For the reason above, while and do while loops are rarely used.
 */

contract Loop {
    function loop() public view {
        console.log("-----------");
        // for loop
        for (uint256 i = 0; i < 10; i++) {
            if (i == 3) {
                // Skip to next iteration with continue
                continue;
            }
            if (i == 5) {
                // Exit loop with break
                break;
            }
            console.log("| i = %o |", i);
        }
        console.log("-----------");
        console.log("");
        console.log("-----------");
        // while loop
        uint256 j;
        while (j < 10) {
            console.log("| j = %o |", j);
            j++;
        }
        console.log("-----------");
    }
}

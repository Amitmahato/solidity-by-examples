// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./EnumDeclaration.sol";

contract Enum {
    Status public status;

    /**
     * 0 - Pending
     * 1 - Shipped
     * 2 - Accepted
     * 3 - Rejected
     * 4 - Canceled
     */
    function get() public view returns (Status) {
        return status;
    }

    // Update status by passing uint into input
    function set(Status _status) public {
        status = _status;
    }

    // Update to specific enum can be done in this way
    function cancel() public {
        status = Status.Canceled;
    }

    function reset() public {
        // delete will reset the value of status to 0 - Pending
        delete status;
    }
}

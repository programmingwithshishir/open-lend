// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentLoan {
    // Public variable that can be read from outside the contract.
    string public greeting;

    // Constructor sets the initial greeting message.
    constructor() {
        greeting = "Hello, blockchain!";
    }

    // Function to update the greeting.
    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
    }

    // Function to retrieve the current greeting (optional since 'greeting' is public).
    function getGreeting() public view returns (string memory) {
        return greeting;
    }
}

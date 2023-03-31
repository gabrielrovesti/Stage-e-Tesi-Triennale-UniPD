// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SafeMathTester{
    uint8 public bigNumber = 255; //unchecked --> check for the max number to not fail the single transaction

    function add() public{
        bigNumber = bigNumber + 1;
    }
}

/*
In 0.8 above:

    function add() public{
        unchecked {bigNumber = bigNumber + 1;}
    }

The code might be more gas efficient
*/
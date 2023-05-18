// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Counter{
    string public name;
    uint public count;

    constructor(string memory _name, uint _initialCount){
        name = _name;
        count = _initialCount;
    }

    function increment() public returns (uint){
        count += 1;
        return count;
    }

    function decrement() public returns (uint){
        count -= 1;
        return count;
    }

    function getCount() public view returns (uint){
        return count;
    }

    function setName(string memory _newName) public returns (string memory) {
        name = _newName;
        return name;
    }

    function getName() public view returns (string memory) {
        return name;
    }
}

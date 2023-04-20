//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuadraticProver {
    uint public a;
    uint public b;
    uint public c;
    uint public r;
    uint public y;

    function setParameters(uint _a, uint _b, uint _c) public {
        a = _a;
        b = _b;
        c = _c;
    }

    function commit() public returns (bytes32) {
        require(a > 0, "a must be greater than 0");
        require(b > 0, "b must be greater than 0");
        require(c > 0, "c must be greater than 0");

        r = uint(keccak256(abi.encodePacked(msg.sender, block.timestamp)));
        require(r > 0, "r must be greater than 0");

        y = a * r * r + b * r + c;
        return keccak256(abi.encodePacked(y));
    }

    function reveal(uint _r) public view returns (bool) {
        return keccak256(abi.encodePacked(_r)) == keccak256(abi.encodePacked(r));
    }
}

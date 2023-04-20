//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract QuadraticVerifier {
    uint public a;
    uint public b;
    uint public c;

    function setParameters(uint _a, uint _b, uint _c) public {
        a = _a;
        b = _b;
        c = _c;
    }

    function verify(uint _y, uint _bit, bytes32 _commitment, uint _r) public view returns (bool) {
        uint computedY;
        if (_bit == 0) {
            computedY = a * _r * _r + b * _r + c;
        } else {
            computedY = a * (_r + 1) * (_r + 1) + b * (_r + 1) + c;
        }
        return _y == computedY && keccak256(abi.encodePacked(_y)) == _commitment;
    }

}

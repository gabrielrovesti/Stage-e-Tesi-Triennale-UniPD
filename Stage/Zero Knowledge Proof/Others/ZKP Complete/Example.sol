// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Verifier.sol";

contract Example {
    // Define the proof struct
    struct Proof {
        uint256 a;
        uint256 b;
        uint256 c;
    }

    // Define the public inputs
    uint256 public y;

    // Define the proving key
    uint256[2] public provingKeyA;
    uint256[2][2] public provingKeyB;
    uint256[2] public provingKeyC;

    // Define the verification key
    uint256[2] public verificationKeyA;
    uint256[2][2] public verificationKeyB;
    uint256[2] public verificationKeyC;
    uint256 public verificationKeyH;
    uint256 public verificationKeyK;

    constructor(uint256 _y, uint256[2] memory _provingKeyA, uint256[2][2] memory _provingKeyB, uint256[2] memory _provingKeyC, uint256[2] memory _verificationKeyA, uint256[2][2] memory _verificationKeyB, uint256[2] memory _verificationKeyC, uint256 _verificationKeyH, uint256 _verificationKeyK) {
        y = _y;
        provingKeyA = _provingKeyA;
        provingKeyB = _provingKeyB;
        provingKeyC = _provingKeyC;
        verificationKeyA = _verificationKeyA;
        verificationKeyB = _verificationKeyB;
        verificationKeyC = _verificationKeyC;
        verificationKeyH = _verificationKeyH;
        verificationKeyK = _verificationKeyK;
    }

    function prove(uint256 x, Proof memory proof) public view returns (bool) {
        // Verify that the proof is valid
        require(Verifier.verify(verificationKeyA, verificationKeyB, verificationKeyC, verificationKeyH, verificationKeyK, proof.a, proof.b, proof.c), "Invalid proof");

        // Verify that the computed output matches the expected output
        uint256 result = proof.a * proof.b % verificationKeyH * proof.c % verificationKeyH;
        return result == x * y % verificationKeyH;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityVerification{
    struct DID{
        uint256 id;
        address holder;
        address issuer;
        address verifier;
        bool isVerified;
    }

    mapping(uint256 => DID) public dids;
    mapping(address => bool) public issuers;
    mapping(address => bool) public verifiers;

    function registerDID(address _holder, address _issuer, address _verifier) public {
        bytes32 hash = keccak256(abi.encodePacked(_holder, _issuer, _verifier));
        uint256 id = uint256(hash);
        require(dids[id].holder == address(0), "DID already exists.");

        dids[id].id = id;
        dids[id].holder = _holder;
        dids[id].issuer = _issuer;
        dids[id].verifier = _verifier;
        dids[id].isVerified = false;
    }

    function addIssuer(address _issuer) public {
        require(issuers[_issuer] == false, "Issuer already exists.");
        require(msg.sender == _issuer, "Only issuer can add themselves.");
        issuers[_issuer] = true;
    }

    function removeIssuer(address _issuer) public {
        require(msg.sender == _issuer, "Only issuer can remove themselves.");
        issuers[_issuer] = false;
    }

    function addVerifier(address _verifier) public {
        require(verifiers[_verifier] == false, "Verifier already exists.");
        require(msg.sender == _verifier, "Only verifier can add themselves.");
        verifiers[_verifier] = true;
    }

    function removeVerifier(address _verifier) public {
        require(msg.sender == _verifier, "Only verifier can remove themselves.");
        verifiers[_verifier] = false;
    }
}
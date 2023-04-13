// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Basic contract for Self-Sovereign Identity
// with a single DID (Decentralized Identifier)
// and a few attributes 
contract SelfSovereignIdentity {
    struct DID {
        address holder;
        address issuer;
        address verifier;
        mapping(string => string) attributes;
    }

    mapping(uint256 => DID) public dids;

    function createDID(address _holder, address _issuer, address _verifier, string memory _name, uint256 _age, string memory _email) public {
        bytes32 hash = keccak256(abi.encodePacked(_holder, _issuer, _verifier));
        uint256 id = uint256(hash);
        require(dids[id].holder == address(0), "DID already exists.");

        dids[id].holder = _holder;
        dids[id].issuer = _issuer;
        dids[id].verifier = _verifier;
        dids[id].attributes["name"] = _name;
        dids[id].attributes["age"] = toString(_age);
        dids[id].attributes["email"] = _email;
    }

    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}

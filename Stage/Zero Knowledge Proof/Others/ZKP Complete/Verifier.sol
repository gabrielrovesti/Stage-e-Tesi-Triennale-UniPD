// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library Verifier {
    function verify(uint256[2] memory a, uint256[2][2] memory b, uint256[2] memory c, uint256 h, uint256 k, uint256 inputA, uint256 inputB, uint256 inputC) public pure returns (bool) {
        // Compute the hash of the inputs
        bytes32 inputHash = keccak256(abi.encodePacked(inputA, inputB, inputC));

        // Verify the proof
        return ecmulVerify(a, b, c, h, k, inputHash);
    }

    function ecmulVerify(uint256[2] memory a, uint256[2][2] memory b, uint256[2] memory c, uint256 h, uint256 k, bytes32 inputHash) private pure returns (bool) {
        // Compute the challenge
        uint256 challenge = uint256(keccak256(abi.encodePacked(a, b, c, inputHash))) % h;

        // Compute the left-hand side of the pairing equation
        uint256[2] memory lhs = ecmul(a, challenge);

        // Compute the right-hand side of the pairing equation
        uint256[2] memory rhs = ecadd(ecmul(b[0], uint256(inputHash)), ecmul(b[1], challenge));

        // Check that the two sides are equal
        return ecrec(lhs) == ecrec(rhs) && ecrec(c) == ecrec(ecmul([h, 0], k));
    }

    function ecmul(uint256[2] memory p, uint256 s) private pure returns (uint256[2] memory r) {
        uint256 x = p[0];
        uint256 y = p[1];

        assembly {
            let m := mul(0xa0d9c2d3984a9e26f147b7c7e3a565523f5f5ae5d5a7f1ba643de6c9d6b8f6b, s)
            m := mod(m, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe)            
            let qx := mulmod(x, m, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe)
            let qy := addmod(mulmod(y, m, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe), sub(0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe, s), 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe)
            r := mload(0x40)
            mstore(r, qx)
            mstore(add(r, 32), qy)
        }
    }

    function ecadd(uint256[2] memory p, uint256[2] memory q) private pure returns (uint256[2] memory r) {
        uint256 x1 = p[0];
        uint256 y1 = p[1];
        uint256 x2 = q[0];
        uint256 y2 = q[1];

        assembly {
            let m := mulmod(add(y1, y2), 0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe)
            let n := mulmod(add(x1, x2), 0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe)
            let o := mulmod(mulmod(sub(x1, x2), sub(y1, y2), 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe), 0x3, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe)
            let qx := addmod(sub(mulmod(m, m, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe), add(n, o)), 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe)
            let qy := addmod(mulmod(sub(n, qx), m, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe), sub(mulmod(o, 2, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe), mulmod(m, m, 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe)), 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe)
            r := mload(0x40)
            mstore(r, qx)
            mstore(add(r, 32), qy)
        }
    }

    function ecrec(uint256[2] memory p) private pure returns (bytes32) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 hash = keccak256(abi.encodePacked(p[0], p[1]));
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, hash));
        return prefixedHash;
    }
}

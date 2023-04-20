# ZKP Quadratic Equation Example

In this example, we demonstrate how to prove that a solution to a quadratic equation is known without revealing the actual solution.

Suppose we want to prove that we know a solution `x` to the quadratic equation `ax^2 + bx + c = 0`, where `a`, `b`, and `c` are known values. To prove that we know `x` without revealing the actual value of `x`, we can use a Zero Knowledge Proof (ZKP) protocol based on commitment and disclosure.

## Protocol

Here is how the protocol works:

1. Choose a random value `r` and calculate `y = a*r^2 + b*r + c`.
2. Send `y` to the verifier and commit to reveal `r` at a later time.
3. The verifier randomly chooses one of two options: "0" or "1."
4. If the verifier chooses "0," the demonstrator reveals `r`. The verifier then verifies that `y = a*r^2 + b*r + c`.
5. If the verifier chooses "1," the demonstrator unveils `r + 1`. The verifier then verifies that `y = a*(r+1)^2 + b*(r+1) + c`.

## Implementation

We provide an example implementation of the protocol in Solidity:

### Demonstrator

```solidity
contract QuadraticDemo {
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
        r = uint(keccak256(abi.encodePacked(msg.sender, now)));
        y = a * r * r + b * r + c;
        return keccak256(abi.encodePacked(y));
    }

    function reveal(uint _r) public view returns (bool) {
        return keccak256(abi.encodePacked(_r)) == keccak256(abi.encodePacked(r));
    }
}
```

### Verifier

```solidity
contract QuadraticVerifier {
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
```

## Usage

To use the protocol, the demonstrator sets the values of `a`, `b`, and `c` using the `setParameters` function, then calls the `commit` function to commit to revealing `r` at a later time. The demonstrator then sends the value `y` to the verifier.

The verifier randomly chooses a bit and verifies the proof by calling the `verify` function with the value `y`, the randomly chosen bit, the hash of the value `y`, and the value `r` revealed by the demonstrator.

We hope this example implementation helps you understand how to implement a ZKP protocol based on commitment and disclosure.
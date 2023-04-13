# @version ^0.2.0

sender: public(address)
receiver: public(address)

@external
@payable
def __init__(receiver: address):
    asser _receiver != ZERO_ADDRESS, "Receiver address cannot be zero"
    self.sender = msg.sender
    self.receiver = receiver

@internal
@pure
def _getHash(amount: uint256, nonce: uint256) -> bytes32:
    return keccak256(concat(
        convert(msg.sender, bytes32),
        convert(amount, bytes32),
        convert(nonce, bytes32)
    ))

@external
@view
def getHash(_amount: uint256, _nonce: uint256) -> bytes32:
    return self._getHash(_amount, _nonce)

@internal 
@view 
def _getEthSignedHash(_amount: uint256) -> bytes32:
    return keccak256(concat(
        b'\x19Ethereum Signed Message: 32',
        self._getHash(_amount, self.nonce)
    ))

@external
@view
def getEthSignedHash(_amount: uint256) -> bytes32:
    return self._getEthSignedHash(_amount)

@internal 
@view
def _verify(_amount: uint256, _sig: bytes[65]) -> bool:
    ethSignedHash: bytes32 = self._getEthSignedHash(_amount)

    r: bytes32 = slice(_sig, 0, 32)
    s: bytes32 = slice(_sig, 32, 32)
    v: uint256 = convert(slice(_sig, 64, 1), uint256)

    # ecrecover() is a very useful Solidity function that allows the smart contract to validate that incoming data is properly signed by an expected party.
    return ecrecover(ethSignedHash, v, r, s) == self.sender

@external
@view
def verify(_amount: uint256, _sig: bytes[65]) -> bool:
    return self._verify(_amount, _sig)

@external 
def close(_amount: uint256, _sig: bytes[65]):
    assert self._verify(_amount, _sig), "Invalid signature"
    self.nonce += 1
    send(self.receiver, _amount)

@external
def withdraw():
    assert msg.sender == self.sender, "Only sender can withdraw"
    send(self.sender, self.balance)
    
@external
def cancel():
    assert msg.sender == self.sender, "Only sender can cancel"
    send(self.sender, self.balance)
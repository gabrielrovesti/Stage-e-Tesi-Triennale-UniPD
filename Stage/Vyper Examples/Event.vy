# @version ^0.2.2

event Transfer:
    sender: address
    recevier: address
    value: uint256
    x: indexed(uint256)
    y: indexed(uint256)
    value: uint256

event Authorized:
    address: indexed(address)
    authorized: bool

@external
def transfer(to: address, amount: uint256):
    log Transfer(msg.sender, to, amount)

### example of cheap storage
def grantAuthorization(address: address):
    assert self.authorized[msg.sender] == "!authorized"
    self.authorized[address] = True
    log Authorized(address, True)

def revokeAuthorization(address: address):
    assert self.authorized[msg.sender] == "!authorized"
    self.authorized[address] = False
    log Authorized(address, False)
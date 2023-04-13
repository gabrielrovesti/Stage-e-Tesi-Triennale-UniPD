# @version ^0.2.0

event Payment:
    sender: indexed(address)
    receiver: indexed(address)
    amount: uint256
    balance: uint256
    gasLeft: uint256

@external
@payable
def __default__():
    log Payment(msg.sender, msg.value, block.gasleft)
# @version ^0.2.0

@external
@payable
def sendEther(to: address):
    send(to, msg.value)
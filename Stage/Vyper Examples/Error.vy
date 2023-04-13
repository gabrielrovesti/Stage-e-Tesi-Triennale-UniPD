@version ^0.2.0

# assert and raise
# state changres are reverted
# error bubbles up
# UNREACHABLE

x: public(String[10])
owner: public(address)

@external
def __init__():
    self.owner = msg.sender

@external
def setX(_x: String[10]):
    assert msg.sender == self.owner
    self.x = _x
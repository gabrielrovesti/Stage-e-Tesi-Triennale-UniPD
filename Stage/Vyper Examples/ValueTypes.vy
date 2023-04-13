# @version ^0.2.0

b: public(bool)
i: public(int)
u: public(uint)
d: public(decimal)
addr: public(address)
b32: public(bytes32)
bs: public(Bytes[100])
s: public(string[100])

@external
def __init__():
    self.b = True
    self.i = 42
    self.u = 42
    self.d = 42.0
    self.addr = msg.sender
    self.b32 = b"hello"
    self.bs[0] = b"hello"
    self.s[0] = "hello"

    
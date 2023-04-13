struct Person:
    name: String[100]
    age: uint256

nums: public(uint256[10])
myMap: public(HashMap[address, uint256])
person: public(Person)

@external
def __init__():
    self.nums[5] = 123
    self.myMap[msg.sender] = 456
    self.person = Person({
        name: "David",
        age: 21
    })
    

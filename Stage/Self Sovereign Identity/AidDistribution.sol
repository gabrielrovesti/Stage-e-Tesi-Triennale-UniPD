//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AidDistribution{
    struct Identity {
        string name;
        string addr;
        uint256 aidReceived;
        bool isRegistered;
    }
    
    mapping(address => Identity) public identities;
    address[] public identityAddresses;
    address owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function.");
        _;
    }

    modifier onlyRegistered(){
        require(identities[msg.sender].isRegistered, "Only registered identities can call this function.");
        _;
    }

    function checkIdentity(address _address) public view returns (bool) {
        return identities[_address].isRegistered;
    }
    
    function registerIdentity(string memory _name, string memory _address) public {
        require(!identities[msg.sender].isRegistered, "Identity already registered.");
        identities[msg.sender] = Identity({
            name: _name,
            addr: _address,
            aidReceived: 0,
            isRegistered: true
        });
        identityAddresses.push(msg.sender);
    }
    
    function requestAid(uint256 _amount) public {
        require(identities[msg.sender].isRegistered, "Identity not registered.");
        require(_amount > 0, "Aid amount must be greater than 0.");
        require(_amount <= address(this).balance, "Insufficient funds in contract.");
        identities[msg.sender].aidReceived += _amount;
        payable(msg.sender).transfer(_amount);
    }
    
    function getIdentityAddresses() public view onlyOwner returns (address[] memory) {
        return identityAddresses;
    }
    
    function getIdentity(address _address) public view returns (string memory, string memory, uint256) {
        return (identities[_address].name, identities[_address].addr, identities[_address].aidReceived);
    }
}
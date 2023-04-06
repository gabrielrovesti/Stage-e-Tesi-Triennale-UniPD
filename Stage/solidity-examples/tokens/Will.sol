// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.7;

// Code following the examples from https://www.youtube.com/watch?v=h8kZxbVuGTU&list=PLzb46hGUzitDd39YzB1YvZqeIXXtmBrHX&index=11

contract Will{
    address owner;
    uint fortune;
    bool isDeceased;

    constructor() payable{
        owner = msg.sender;
        fortune = msg.value;
        isDeceased = false;
    }

    //create modifier so the only person who can call this function is the owner
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    //create modifier so the only person who can call this function is the owner
    modifier mustBeDeceased(){
        require(isDeceased == true);
        _;
    }

    // list of family wallets
    address payable[] familyWallets;

    //mapping of inheritance
    mapping (address => uint) inheritance;

    // set inheritance for each address
    function setInheritance(address payable wallet, uint amount) public {
        familyWallets.push(wallet);
        inheritance[wallet] = amount;
    }

    // Pay each family member based on their wallet address

    function payout() private mustBeDeceased {
        for (uint i = 0; i < familyWallets.length; ++i){
            familyWallets[i].transfer(inheritance[familyWallets[i]]);
            // trasfering the funds from contract address to receiver address
        }
    }

    // oracle switch simulation
    function deceased() public onlyOwner{
        isDeceased = true;
        payout();
    }
}
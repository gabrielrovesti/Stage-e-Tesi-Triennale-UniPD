// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

// The contract allows only its creator o create new coins
// Anyone can send coins to each other without a need to register
// Code based on the example from:
// https://www.youtube.com/watch?v=chdYNPCC8ck&list=PLzb46hGUzitDd39YzB1YvZqeIXXtmBrHX&index=13
contract Coin{
    address public minter;
    mapping(address => uint) public balances;

    // Events allow clients to react to specific contract changes you declare
    event Sent(address from, address to, uint amount);

    // this only runs on contract deploy
    constructor(){
        minter = msg.sender;
    }

    // make new coins and send them to the receiver address
    // only the owner of the contract can create new coins
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter); // only the owner of the contract can create new coins
        require(amount < 1e60); // prevent overflow
        balances[receiver] += amount; // add the amount to the receiver balance
    }

    error insufficentBalance(uint requested, uint available);

    // send any amout of coins to an existing address
    function send(address receiver, uint amount) public {
        if(amount > balances[msg.sender]) { // / prevent underflow (if the sender has less coins than the amount to send
            revert insufficentBalance({
                requested: amount,
                available: balances[msg.sender]
            });
        } 
        balances[msg.sender] -= amount; // specular to the previous function
        balances[receiver] += amount; 
        emit Sent(msg.sender, receiver, amount); // emit the event (to be used by the client
    }
}
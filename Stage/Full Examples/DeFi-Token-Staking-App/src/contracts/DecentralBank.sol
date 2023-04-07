// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked; //false
    mapping(address => bool) public isStaking; //false

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // staking function
    function depositTokens(uint _amount) public {
        require(_amount > 0, "Amount can not be 0");
        // transfer tether tokens to this contract address
        tether.transferFrom(msg.sender, address(this), _amount);
        
        // update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        
        // if current user not staked up untill this point
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (withdrawal)
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "account balance is 0 can't withdraw tokens");

        //withdraw tokens and send to back to investors account
        tether.transfer(msg.sender, balance);

        //reset staking balance
        stakingBalance[msg.sender] = 0;

        //uodate staking status
        isStaking[msg.sender] = false;
    }

    // Issue rewards
    function issueTokens() public {
        require(msg.sender == owner, "Caller must be ownwer");
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9;
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}

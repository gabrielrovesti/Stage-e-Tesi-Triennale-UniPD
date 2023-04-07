const { artifacts } = require("truffle");

const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

const web3 = require("web3");
const chai = require("chai");

const { assert } = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

// eslint-disable-next-line no-undef
contract("DecentralBank", function([owner, customer]) {
  let tether, rwd, decentralBank;

  //convert to wei -> 1 eth = "1000000000000000000" wei
  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  // eslint-disable-next-line no-undef
  before(async function() {
    // load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(tether.address, rwd.address);
    // transfer all tokens to DecentralBank (1 million)
    await rwd.transfer(decentralBank.address, tokens("1000000"));
    // transfer 100 mock Tether to Customer
    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  describe("Mock Tether Deployment", async function() {
    it("matches name successfully", async function() {
      const name = await tether.name();
      assert.equal(name, "Tether Token");
    });
  });

  describe("Mock RWD Deployment", async function() {
    it("matches name successfully", async function() {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentral Bank Deployment", async function() {
    it("matches name successfully", async function() {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });
    it("contract has tokens", async function() {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });
  });

  describe("Yield Farming", async function() {
    it("rewards tokens for staking", async function() {
      let result;
      // check customer balance
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock wallet balance before staking"
      );

      // check staking for customers of 100 mock tokens
      await tether.approve(decentralBank.address, tokens("100"), { from: customer });
      await decentralBank.depositTokens(tokens("100"), { from: customer });

      // check updated balance of Customer
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("0"),
        "customer mock wallet balance after staking"
      );

      // check updated balance of Decentral Bank
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Decentral Bank mock wallet balance after staking from customer"
      );

      // check isStaking balance
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "true",
        "customer is staking status after staking"
      );

      // Issue token
      await decentralBank.issueTokens({ from: owner });

      // Ensure Only Owner Can Issue Tokens
      await decentralBank.issueTokens({ from: customer }).should.be.rejected;

      // check results after unstaking
      await decentralBank.unstakeTokens({ from: customer });

      //check that tokens were returned to customer
      result = await  tether.balanceOf(customer);
      assert.equal(result.toString(), tokens('100'), 'customer Mock wallet hasn\'t been returned after unstaking');
      
      //check that balance of TokenFarm customer account is empty
      result = await  tether.balanceOf(decentralBank.address);
      assert.equal(result.toString(), tokens('0'), 'customer Mock wallet isn\'t empty after unstaking');
      
      result = await  decentralBank.stakingBalance(customer);
      assert.equal(result.toString(), tokens('0'), 'customer Mock decentralBank isn\'t empty after unstaking');
    });
  });
  //Hook description test
});

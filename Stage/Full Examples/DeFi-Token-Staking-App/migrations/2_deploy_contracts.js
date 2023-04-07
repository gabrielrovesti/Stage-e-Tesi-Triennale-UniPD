// eslint-disable-next-line
const Tether = artifacts.require("Tether");
// eslint-disable-next-line
const RWD = artifacts.require("RWD");
// eslint-disable-next-line
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock Tether contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  // Deploy RWD contract
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  // Transfer all tokens to DecentralBank (1 million)
  await rwd.transfer(decentralBank.address, "1000000000000000000000000"); //1M

  // Distribute 100 Mock Tether tokens to investor
  await tether.transfer(accounts[1], "1000000000000000000");
};

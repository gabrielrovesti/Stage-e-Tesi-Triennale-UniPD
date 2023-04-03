const Web3 = require('web3')

require('dotenv').config()

// we take it from infura.io dashboard

const rpcURL = `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`;

const web3 = new Web3(rpcURL); // create a web3 instance

web3.eth.getBlockNumber().then(console.log); // get the latest block number

// account as an example
const account = "0x90e63c3d53E0Ea496845b7a03ec7548B70014A91"

//checking the account balance
web3.eth.getBalance(address, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
})
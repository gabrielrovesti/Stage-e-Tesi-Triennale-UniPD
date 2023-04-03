const { ethers } = require("ethers");
require('dotenv').config()

// we take it from infura.io dashboard

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)

//rich contract from EtherScan
const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log('Balance: ', balance.toString())
}

main()
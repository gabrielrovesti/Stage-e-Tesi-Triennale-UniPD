const { ethers } = require("ethers");
require('dotenv').config()

// we take it from infura.io dashboard

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)

const main = async () => {
    const block = await provider.getBlock(1000000)
    console.log('Block: ', block)

    const blockNumber = await provider.getBlockNumber()
    console.log('Block number: ', blockNumber)

    const blockWithTransactions = await provider.getBlockWithTransactions(1000000)
    console.log('Block with transactions: ', blockWithTransactions)

}

main()
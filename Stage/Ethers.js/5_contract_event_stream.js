const { ethers } = require("ethers");
require('dotenv').config()

// we take it from infura.io dashboard

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)

const ERC_20_ABI=[
    // Read-Only Functions
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint)",
    "function totalSupply() view returns (uint)",
    "function balanceOf(address) view returns (uint)",
    "function allowance(address, address) view returns (uint)",
    // Write Functions
    "function transfer(address, uint) returns (bool)",
    "function approve(address, uint) returns (bool)",
    "function transferFrom(address, address, uint) returns (bool)",
    // Events - These are emitted when state changes
    "event Transfer(address indexed from, address indexed to, uint value)",
    "event Approval(address indexed owner, address indexed spender, uint value)"
]

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const block = await provider.getBlockNumber()

    // Filter for Transfer events to and from an address
    const transferFilter = contract.filters.Transfer(null, '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e') // here we can put the address we want to filter
    const transferEvents = await contract.queryFilter(transferFilter, block - 1000, block) // we can also specify the block range we want to filter

    console.log('Transfer Events: ', transferEvents)

    // Filter for Approval events to and from an address
    const approvalFilter = contract.filters.Approval('0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e', null)
    const approvalEvents = await contract.queryFilter(approvalFilter)
    console.log('Approval Events: ', approvalEvents)
}

main()
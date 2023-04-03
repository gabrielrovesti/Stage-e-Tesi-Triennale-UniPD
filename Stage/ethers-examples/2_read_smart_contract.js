const { ethers } = require("ethers");
require('dotenv').config()

// we take it from infura.io dashboard

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)

//rich contract from EtherScan
const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI (which is a stablecoin) Contract

//An ABI is a JSON object that defines the functions of a contract
//in this case we are using the ERC20 ABI, which is the standard for all ERC20 tokens
const ERC_20_ABI = [
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
]

const contract = new ethers.Contract(address, ERC_20_ABI, provider)


const main = async () => {
    const name = await contract.name()
    const symbol = await contract.symbol()
    const decimals = await contract.decimals()
    const totalSupply = await contract.totalSupply()

    console.log('Contract Address: ', address)
    console.log('Name: ', name)
    console.log('Symbol: ', symbol)
    console.log('Decimals: ', decimals.toString())
    console.log('Total Supply: ', totalSupply.toString())

    const balance = await contract.balanceOf('0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e')
    console.log('Balance: ', balance.toString())
    console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`)
}

main()
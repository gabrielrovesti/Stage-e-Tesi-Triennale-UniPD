const { ethers } = require("ethers");
require('dotenv').config()

// we take it from infura.io dashboard

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`)

//const account = ethers.Wallet.createRandom() //create a rondom one

//need to have some ether in the account, using Sepolia since it's the only one that receives ethers on the testnet from Chainlink,
//the others are deprecated

const account_sender = new ethers.Wallet(process.env.SENDER, provider)
const account_receiver = new ethers.Wallet(process.env.RECEIVER, provider)

//from advanced option on MetaMask, we get the private key
const privateKey = process.env.PRIVATE_KEY

//we create a wallet from the private key
const wallet = new ethers.Wallet(privateKey, provider)

const ERC_20_ABI = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    // Get the account balance
    "function balanceOf(address) view returns (uint256)",
    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",
    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)"
]

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ERC_20_ABI, provider)

const main = async () => {
    const name = await contract.name()
    const symbol = await contract.symbol()
    const decimals = await contract.decimals()
    const totalSupply = await contract.totalSupply()
    const balance = await wallet.getBalance(account_sender)

    console.log("Name: ", name)
    console.log("Symbol: ", symbol)
    console.log("Decimals: ", decimals)
    console.log("Total supply: ", totalSupply.toString())
    console.log("Balance of sender: ", balance.toString())

    const tx = await contractWithWallet.transfer(account_receiver.address, ethers.utils.parseEther("0.01"))
    console.log("Transaction hash: ", tx.hash)

    const receipt = await tx.wait()
    console.log("Transaction receipt: ", receipt)

    const balance_sender_after = await wallet.getBalance(account_sender)
    console.log("Balance after transaction of sender: ", balance_sender_after.toString())
    
    const balance_receiver_after = await wallet.getBalance(account_receiver)
    console.log("Balance after transaction of receiver: ", balance_receiver_after.toString())
}

main()
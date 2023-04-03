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

const main = async () => {

    const balance_sender = await wallet.getBalance(account_sender)
    console.log("Balance before transaction of sender: ", ethers.utils.formatEther(balance_sender))

    const balance_receiver = await wallet.getBalance(account_receiver)
    console.log("Balance before transaction of receiver: ", ethers.utils.formatEther(balance_receiver))

    const tx = await wallet.sendTransaction({
        to: account_receiver.address,
        value: ethers.utils.parseEther("0.01")
    })

    console.log("Transaction hash: ", tx.hash)

    const receipt = await tx.wait()
    console.log("Transaction receipt: ", receipt)

    const balance_sender_after = await wallet.getBalance(account_sender)
    console.log("Balance after transaction of sender: ", ethers.utils.formatEther(balance_sender_after))

    const balance_receiver_after = await wallet.getBalance(account_receiver)
    console.log("Balance after transaction of receiver: ", ethers.utils.formatEther(balance_receiver_after))
}

main()
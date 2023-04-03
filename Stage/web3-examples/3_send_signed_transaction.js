var Tx = require('ethereumjs-tx').Transaction
require('dotenv').config()

const Web3 = require('web3')

const web3 = `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`;

web3.eth.getTransactionCount(process.env.ADDRESS_FROM, (err, txCount) => {
    // Build the transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: process.env.ADDRESS_TO,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    // Sign the transaction
    const tx = new Tx(txObject, { 'chain': 'mainnet' })
    tx.sign(process.env.PRIVATE_KEY_1)

    // Serialize the transaction and convert to hex
    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')
 
    // Broadcast the transaction to the network
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
        // Use this txHash to find the contract on Etherscan
    })
})

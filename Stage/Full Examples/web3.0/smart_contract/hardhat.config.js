//https://eth-sepolia.g.alchemy.com/v2/MfJSbyyXDvjfNAeiwhVUfMcmcJDcgc-v

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/MfJSbyyXDvjfNAeiwhVUfMcmcJDcgc-v",
      accounts: ['1381cd0a970ca6fd67cabee1bd4622513ad2044c637976f08bf91c8f102b50c6']
    }
  }
}
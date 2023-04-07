//synchronous [solidity]
//asynchronous [javascript]

const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main(){
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const encrypted = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD,
        process.env.PRIVATE_KEY
    );
    console.log(encrypted);
    fs.writeFileSync("./.encryptedKey.json", JSON.stringify(encrypted));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
});


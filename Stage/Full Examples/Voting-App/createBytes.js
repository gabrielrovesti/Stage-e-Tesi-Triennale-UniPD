const ethers = require('ethers');

async function createBytes(args){
    const name = args[0];
    const bytes = ethers.utils.toUtf8Bytes(name);
    console.log('Name is: ' + bytes);
}

createBytes(process.argv.slice(2));
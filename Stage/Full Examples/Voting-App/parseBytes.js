const ethers = require('ethers');

async function parseBytes(args){
    const bytes = args[0];
    const name = ethers.utils.toUtf8Bytes(bytes);
    console.log('Bytes are: ' + name);
}

parseBytes(process.argv.slice(2));
const bip39 = require("bip39");
const { BIP32Factory } = require("bip32");
const ecc = require('tiny-secp256k1')
const bip32 = BIP32Factory(ecc);
const TronWeb = require("tronweb");


const HttpProvider = TronWeb.providers.HttpProvider; //This provider is optional, you can just use a url for the nodes instead

const fullNode = new HttpProvider("https://api.shasta.trongrid.io"); //Full node http endpoint
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io"); // Solidity node http endpoint
const eventServer = new HttpProvider("https://api.shasta.trongrid.io"); //solidity node http endpoint


const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

const generateTRXWallet = async (req, res) => {
    try {
        // Convert the mnemonic phrase to a seed
        const seednew = await bip39.mnemonicToSeed("shoulder fortune cover scale present frame need fog van seminar cup mansion");
        // Create a new BIP32 node from the seed
        const node = await bip32.fromSeed(seednew);
        let countvalue = 1;

        // Derive a child key from the BIP32 node using the specified path
        const child = await node.derivePath(`m/44'/195'/0'/0/${countvalue}`);
        const privateKey = await child.privateKey.toString("hex");
        console.log("Private Key:", privateKey);

        // Generate the TRON address from the private key
        const address = await tronWeb.address.fromPrivateKey(privateKey);
        console.log("Generated Address:", address);

    } catch (error) {
        console.log('Error occurred during wallet generation:', error);
    }
};


generateTRXWallet()
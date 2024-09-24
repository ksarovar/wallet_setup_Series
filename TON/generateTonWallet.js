
const { mnemonicToWalletKey } = require("@ton/crypto");
const { WalletContractV4, TonClient, fromNano } = require("@ton/ton");
const { getHttpEndpoint } = require("@orbs-network/ton-access");


const generateTONWallet = async (req, res) => {
    try {
    const mnemonic = ""
        const key = await mnemonicToWalletKey(mnemonic.split(" "));
        const secret = key.secretKey
        const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
        // print wallet address
        const account = wallet.address.toString({ testOnly: true })
        const workchain = wallet.address.workChain
        // console.log(wallet);
        const secretHex = secret.toString('hex');
        console.log("address :",account,secret);
        console.log("secret :", secretHex);
    } catch (error) {
        console.log(error);
    }
}
generateTONWallet();
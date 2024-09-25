const bip39 = require("bip39");

const generatemnemonic=()=>{

    try {
        let mnemonic=bip39.generateMnemonic(256);//256 for 24 work mnemonic
        console.log(mnemonic);
    } catch (error) {
        console.log(error);
    }
}
generatemnemonic()
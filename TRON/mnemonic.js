
const bip39 = require("bip39");

const generateMnemonic = (req, res) => {
    try {
      let mnemonic = bip39.generateMnemonic();
      console.log(mnemonic);
    } catch (error) {
console.log(error);    }
  }
generateMnemonic()
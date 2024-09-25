const bip39 = require("bip39");
const bip32 = require("bip32");
const bitcoin = require("bitcoinjs-lib");
const ecc = require('tiny-secp256k1')

const generateBTCWalletMainnet = () => {
    try {
        mnemonic="trim grape cool when staff duck knock trim bachelor father call drastic axis swarm bicycle truly inquiry stable room virus rabbit regret beach scorpion"
      //  mnemonic="warm asset cereal cloth quote urban when ship rigid chaos deputy goose nature mechanic carpet crew finish box estate middle ramp laptop quit laptop"
      const seednew = bip39.mnemonicToSeedSync(mnemonic);
      // console.log("bip32",bip32.BIP32Factory(ecc).fromSeed(seednew));
      let root = bip32.BIP32Factory(ecc).fromSeed(seednew);
      // Derivation path
      const path = `m/84'/0'/0'/0/1`; //mainnet
      let child = root.derivePath(path);
      let address = bitcoin.payments.p2wpkh({
        pubkey: child.publicKey,
        network: bitcoin.networks.bitcoin,
      }).address;
    const privateKey = child.privateKey.toString("hex");
    return { address, privateKey };
    } catch (error) {
      console.log(error)
    }
  }
const generateBTCWalletTestnet = () => {
    try {
        // const mnemonic = "trim grape cool when staff duck knock trim bachelor father call drastic axis swarm bicycle truly inquiry stable room virus rabbit regret beach scorpion";
        mnemonic="warm asset cereal cloth quote urban when ship rigid chaos deputy goose nature mechanic carpet crew finish box estate middle ramp laptop quit laptop"

        const seednew = bip39.mnemonicToSeedSync(mnemonic);
        let root = bip32.BIP32Factory(ecc).fromSeed(seednew);
        
        // Derivation path for testnet
        const path = `m/84'/1'/0'/0/1`; // Change the coin type to 1 for testnet
        let child = root.derivePath(path);
        
        let address = bitcoin.payments.p2wpkh({
            pubkey: child.publicKey,
            network: bitcoin.networks.testnet, // Use testnet network
        }).address;

        const privateKey = child.privateKey.toString("hex");
        return { address, privateKey };
    } catch (error) {
        console.log(error);
    }
}
console.log(generateBTCWalletMainnet(),generateBTCWalletTestnet());

//   {
//     address: 'bc1qm0eqdlnt68vjhr20dh8xyd2dztvfll63wy6d6u',
//     privateKey: '237b744f16a39203e386fd3851b44cc74f36476ffbed97d1f1b3ac3c77713334'
//   }

//testnet

// {
//     address: 'tb1q063nlhpy8r69pmrc9jf8wawc48u2ddn2zzwj0q',
//     privateKey: '08b2070ce959c1e454ece9e988e9b4cdd3395494a9d8823b07e58e509bb593a0'
//   }

// {
//   address: 'tb1qjpdztu6tkpnru3xp36enmn0772e5cz4dtp7u8d',
//   privateKey: 'c4db138a5e85698c515bc956ebd89abaefb04bf004928cb96764f64f40d2191b'
// }
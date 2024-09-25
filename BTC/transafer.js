const axios = require('axios');

const fromAddress = 'tb1q063nlhpy8r69pmrc9jf8wawc48u2ddn2zzwj0q'; // Replace with the sender's address
const toAddress = 'tb1qjpdztu6tkpnru3xp36enmn0772e5cz4dtp7u8d'; // Replace with the recipient's address
const amount = 100000; // Amount in satoshis (0.001 BTC = 100000 satoshis)
const privateKey = '08b2070ce959c1e454ece9e988e9b4cdd3395494a9d8823b07e58e509bb593a0'; // Replace with the sender's private key
const network = 'testnet'; // or 'mainnet'

const transferBTC = async (fromAddress, toAddress, amount, privateKey, network) => {
    // Check if addresses are valid (simple length check)
    if (fromAddress.length < 26 || fromAddress.length > 42) {
        console.error("Invalid sender address format.");
        return { success: false, error: "Invalid sender address format." };
    }
    
    if (toAddress.length < 26 || toAddress.length > 42) {
        console.error("Invalid recipient address format.");
        return { success: false, error: "Invalid recipient address format." };
    }

    // Check for self-transfer
    if (fromAddress === toAddress) {
        console.error("Cannot transfer to the same address.");
        return { success: false, error: "Cannot transfer to the same address." };
    }

    // Check for a valid amount
    if (amount <= 0) {
        console.error("Amount must be greater than zero.");
        return { success: false, error: "Amount must be greater than zero." };
    }

    try {
        const url = network === 'mainnet' 
            ? 'https://api.blockcypher.com/v1/btc/main/txs/new'
            : 'https://api.blockcypher.com/v1/btc/test3/txs/new';

        // Create transaction data
        const txData = {
            inputs: [{ addresses: [fromAddress] }],
            outputs: [{ addresses: [toAddress], value: amount }],
        };

        // Create a new transaction
        const newTxResponse = await axios.post(url, txData);
        const newTx = newTxResponse.data;

        // Sign the transaction
        const signUrl = network === 'mainnet' 
            ? 'https://api.blockcypher.com/v1/btc/main/txs/send'
            : 'https://api.blockcypher.com/v1/btc/test3/txs/send';

        const signedTx = {
            ...newTx,
            privkeys: [privateKey],
        };

        const sendResponse = await axios.post(signUrl, signedTx);
        return { success: true, transaction: sendResponse.data };
    } catch (error) {
        console.error(`Error transferring BTC on ${network}:`, error.response ? error.response.data : error.message);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
};

const initiateTransfer = async () => {
    const result = await transferBTC(fromAddress, toAddress, amount, privateKey, network);
    console.log('Transfer Result:', result);
};

initiateTransfer();

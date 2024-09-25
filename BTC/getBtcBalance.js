const axios = require('axios');

const getBTCBalance = async (address, network) => {
    try {
        const url = network === 'mainnet' 
            ? `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`
            : `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`;

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching balance for ${network}:`, error.message);
        return null;
    }
};

// Example usage
const mainnetAddress = 'bc1qm0eqdlnt68vjhr20dh8xyd2dztvfll63wy6d6u'; // Replace with a valid mainnet address
const testnetAddress = 'tb1q063nlhpy8r69pmrc9jf8wawc48u2ddn2zzwj0q'; // Replace with a valid testnet address

const getBalances = async () => {
    const mainnetBalance = await getBTCBalance(mainnetAddress, 'mainnet');
    console.log('Mainnet Balance:', mainnetBalance);

    const testnetBalance = await getBTCBalance(testnetAddress, 'testnet');
    console.log('Testnet Balance:', testnetBalance);
};

getBalances();

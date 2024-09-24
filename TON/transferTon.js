const { mnemonicToWalletKey } = require("@ton/crypto");
const { WalletContractV4, TonClient, internal } = require("@ton/ton");
const { getHttpEndpoint } = require("@orbs-network/ton-access");

const tonTransfer = async (req, res) => {
    try {
        const mnemonic = ""; 
        const key = await mnemonicToWalletKey(mnemonic.split(" "));
        const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

        // Initialize ton rpc client on testnet with a longer timeout
        const endpoint = await getHttpEndpoint({ network: "testnet" });
        const client = new TonClient({ endpoint, timeout: 60000 }); // Set timeout to 60 seconds
        // Ensure wallet is deployed
        if (!await client.isContractDeployed(wallet.address)) {
            return console.log("Wallet is not deployed");
        }
        // Send 0.05 TON to the specified address
        const walletContract = client.open(wallet);
        const seqno = await walletContract.getSeqno();
        await walletContract.sendTransfer({
            secretKey: key.secretKey,
            seqno: seqno,
            messages: [
                internal({
                    to: "kQApxkCJJJvtw_KrId5IBvFJKsb8stWqZnCT_TPV6VpCCXhk",
                    value: "0.01", // 0.05 TON
                    body: "Hello", // optional comment
                    bounce: false,
                })
            ]
        });
        // Wait until confirmed
        let currentSeqno = seqno;
        while (currentSeqno === seqno) {
            console.log("Waiting for transaction to confirm...");
            await sleep(1500);
            currentSeqno = await walletContract.getSeqno();
        }
        console.log("Transaction confirmed!");

    } catch (error) {
        console.log("Error:", error.message);
    }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Call the function
tonTransfer();

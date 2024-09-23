
const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider; //This provider is optional, you can just use a url for the nodes instead
const fullNode = new HttpProvider("https://nile.trongrid.io"); //Full node http endpoint
const solidityNode = new HttpProvider("https://nile.trongrid.io"); // Solidity node http endpoint
const eventServer = new HttpProvider("https://nile.trongrid.io"); //solidity node http endpoint
const privatekey=""
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer,privatekey);
const trxTransfer = async () => {
    try {
     const recieverAddress="TCCABp3tuctUUhtBrNPhvuffdNhYPPcZYF"
      const address = await tronWeb.address.fromPrivateKey(privatekey);
      console.log(await tronWeb.trx.getBalance(address),address);
        // let totalAmount = await tronWeb.trx.getBalance(address) - 1000000;   // subtracting 1 TRX in case of transaction fee
        let amount=1000000
        const tradeobj = await tronWeb.transactionBuilder.sendTrx(recieverAddress, amount);
        const signedtxn = await tronWeb.trx.sign(tradeobj);
        const result = await tronWeb.trx.sendRawTransaction(signedtxn);
        console.log(result);
    } catch (error) {
      console.log(error)
    }
}
  trxTransfer()

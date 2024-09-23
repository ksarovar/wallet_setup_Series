
const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider; //This provider is optional, you can just use a url for the nodes instead
const fullNode = new HttpProvider("https://nile.trongrid.io"); //Full node http endpoint
const solidityNode = new HttpProvider("https://nile.trongrid.io"); // Solidity node http endpoint
const eventServer = new HttpProvider("https://nile.trongrid.io"); //solidity node http endpoint
const privatekey="65073c2a0a867c7855308ff1235fe6706b6419b151c92967f41807bb7fe0b7bf"
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer,privatekey);
// privatekey="412d07d9f59339d9fc1d33e3236a3330de1c1b3c1be3f62f87b252f0ea9e2284"
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
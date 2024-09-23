
const TronWeb = require("tronweb");

const HttpProvider = TronWeb.providers.HttpProvider; //This provider is optional, you can just use a url for the nodes instead
const fullNode = new HttpProvider("https://nile.trongrid.io"); //Full node http endpoint
const solidityNode = new HttpProvider("https://nile.trongrid.io"); // Solidity node http endpoint
const eventServer = new HttpProvider("https://nile.trongrid.io"); //solidity node http endpoint
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);
const accountTRXBalance = async (req, res) => {
    try {

      const balance = await tronWeb.trx.getBalance("TUGMHXgxPPsieUWr86m6kCxGMSBG3QiY8T");
      if (balance != 0) {
        let Balance = balance / 1000000;
        console.log("TRX:",Balance);
      } else {
        console.log("balance of trx", balance);
      }
    } catch (error) {
      console.log(error)
    }
  };
  accountTRXBalance()

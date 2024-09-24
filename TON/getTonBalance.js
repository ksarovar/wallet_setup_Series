
const { WalletContractV4, TonClient, fromNano }=  require("@ton/ton") ;
const { getHttpEndpoint }=  require("@orbs-network/ton-access") ;

const accountTONBalance = async (req, res) => {
    try {
    // initialize ton rpc client on testnet
      const endpoint = await getHttpEndpoint({ network: "testnet" }); // for mainnet { network: "mainnet" }
      const client = new TonClient({ endpoint });
      const balance = await client.getBalance("kQDk4G63HfS0jLU4_Jy_LMxmv-sDN_okEjuNrYLczFm1B8JX");
      console.log("balance:", fromNano(balance));
    } catch (error) {
      console.log(error)
       console.log(error);   
 }
  };
  accountTONBalance()

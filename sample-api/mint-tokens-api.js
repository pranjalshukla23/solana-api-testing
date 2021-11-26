
//solana web3
const solanaWeb3 = require('@solana/web3.js');

//destructuring functions in solana web3
const {clusterApiUrl, Connection, PublicKey} = require("@solana/web3.js");

//creating a connection to mainnet
let connection = new Connection(clusterApiUrl('mainnet-beta'));



//configuration properties
let config1 = {
    filters: [
        {
            dataSize: 165,
        },
        {
            memcmp: {
                offset: 32,
                bytes: "FBUKfg7Thx4WDM4ATehJe1xWzuGtMk1myXhRSvuSq19h"
            }
        }
    ],
};

async function getResult(){

    let data=[];

    //getting parsed program accounts
    let txs = await connection.getParsedProgramAccounts(new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), config1);



     //get minted tokens list
   for (let i=0; i< txs.length;i++) {


       //console.log(txs[i].account.data.parsed.info.mint);

       data.push(txs[i].account.data.parsed.info.mint);

   }

   console.log(data);


}

getResult();

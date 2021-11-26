
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
                offset: 0,
                bytes: "HVbJncemetZjMuseRWKWZB1em6wXn3BxjX9v36R9ZUFU"
            }
        }
    ],
};

async function getResult(){

    //getting parsed program accounts
    let txs = await connection.getParsedProgramAccounts(new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), config1);



    let count=0;
  /*  console.log(txs[0].account.data.parsed.info.tokenAmount.amount);
    console.log(txs[0].account.data.parsed.info.owner);*/

    for(let i=0; i< txs.length;i++){

        if(txs[i].account.data.parsed.info.tokenAmount.amount> 0){

            count ++;

            console.log(txs[i].account.data.parsed.info.owner);
        }


    }

    console.log(count++);

}

getResult();

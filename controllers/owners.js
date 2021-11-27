//solana web3
const solanaWeb3 = require('@solana/web3.js');

//destructuring functions in solana web3
const {clusterApiUrl, Connection, PublicKey} = require("@solana/web3.js");

//creating a connection to mainnet
let connection = new Connection(clusterApiUrl('mainnet-beta'));

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//path module
const path = require('path');


function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}



//function to fetch all the owners
module.exports = async (req,res) => {


    const csvWriter = createCsvWriter({
        path: path.resolve(__dirname,'../','static','owners.csv'),
        header: [
            {id: 'owner', title: 'Token_Owner'},
            {id: 'address', title: 'Mint_Address'}
        ],
        append:false
    });


    let owners = [];

    let data = [];



    let count=0;


    console.log(req.body.token);

    //list of owners
    let addresses = req.body.token;

    //traversing through list of addresses
    for(let i=0;i<addresses.length;i++){


        //configuration properties
        let config1 = {
            filters: [
                {
                    dataSize: 165,
                },
                {
                    memcmp: {
                        offset: 0,
                        bytes: addresses[i]
                    }
                }
            ],
        };

        //add delay of 1 second
       await  waitforme(1000);

        //getting parsed program accounts
        let txs = await connection.getParsedProgramAccounts(new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), config1);



        for(let j=0; j< txs.length;j++){

            if(txs[j].account.data.parsed.info.tokenAmount.amount> 0){

                count ++;

                owners.push({
                   owner: txs[j].account.data.parsed.info.owner,
                    address: addresses[i]
                });

                data.push({

                    owner:txs[j].account.data.parsed.info.owner,
                    address:  addresses[i]

                })
            }


        }

    }

    csvWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'));

    //total owners
    console.log(count++);

    //send response
    res.status(200).json({
        owners: owners
    })
}

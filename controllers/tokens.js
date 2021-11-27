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
        path: path.resolve(__dirname,'../','static','tokens.csv'),
        header: [
            {id: 'wallet', title: 'Wallet_Address'},
            {id: 'token', title: 'Token_Address'}
        ],
        append:false
    });


    let tokens = [];

    let data = [];



    console.log(req.body.owner);

    //list of owners
    let addresses = req.body.owner;

    //traversing through list of addresses
    for(let i=0;i<addresses.length;i++) {


        let config1 = {
            filters: [
                {
                    dataSize: 165,
                },
                {
                    memcmp: {
                        offset: 32,
                        bytes: addresses[i]
                    }
                }
            ],
        };

        await waitforme(2000);

        //getting parsed program accounts
        let txs = await connection.getParsedProgramAccounts(new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), config1);



        for (let j = 0; j < txs.length; j++) {


            data.push({

                wallet: addresses[i],
                token: txs[j].account.data.parsed.info.mint
            });

            tokens.push({

                wallet: addresses[i],
                token: txs[j].account.data.parsed.info.mint
            })

        }

    }

    console.log(data);


    csvWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'));


    //send response
    res.status(200).json({
        tokens: tokens
    })
}

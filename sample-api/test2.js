const request = require('request');


let object = {
    "offset": 32,
    "bytes": "Vonxgv69HKNgF7mgz8tpvAuVa9it1hzDBaMEjZJa2cx"
}
let options = {
    url: "http://api.mainnet-beta.solana.com",
    method: "post",
    headers:
        {
            "content-type": "application/json"
        },
    body: JSON.stringify( {"jsonrpc": "2.0", "id": "1", "method": "getProgramAccounts", "params": ["TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            {
                "encoding": "jsonParsed",

            "filters": [
         {
        "dataSize": 165
       },
       {
        "memcmp": object
    }

]}]})

};

request(options, (error, response, body) => {
    if (error) {
        console.error('An error has occurred: ', error);
    } else {

        let data = JSON.parse(body);

       console.log(data.result.length)


       console.log('The mint list is: ')
        for(var i=0 ;i<data.result.length;i++){

                console.log(data.result[i].account.data.parsed.info.mint);
            }
        }

});


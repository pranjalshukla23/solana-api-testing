const request = require('request');

/*const fs  = require('fs');

let object = {
    "memcmp": {
        "offset": 0,
        "bytes": "3DzRTAxToFUXPFFCWLbEYuNBhHvCaju5rhj2Ld1RgS8z"
    }
}

const data = fs.readFileSync("./addresses.csv").toString();

let dataArray = data.split(' ');

console.log(dataArray);*/


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
                        "memcmp": {
                            "offset": 0,
                            "bytes": "GkSMSvjjcd8AXqbkzo4CiFXrsVB5JEhqLvd48HoVhJDA"
                        }
                    }],
            }]})
};

request(options, (error, response, body) => {
    if (error) {
        console.error('An error has occurred: ', error);
    } else {

        let data = JSON.parse(body);

        /*  console.log(body)

           console.log(data.result.length);
           console.log(data.result[0].account.data.parsed.info.tokenAmount.amount);
           console.log(data.result[1].account.data.parsed.info.tokenAmount.amount);*!/*/

        console.log(data.result.length);

        for(var i=0 ;i<data.result.length;i++){

            if(data.result[i].account.data.parsed.info.tokenAmount.amount > 0){


                console.log(data.result[i].account.data.parsed.info.owner);
            }
        }


    }
});
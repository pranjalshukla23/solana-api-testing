
async function getTokens() {

    let text = '';

    //get multiple values
    let owner = document.getElementById('owner').value.split(',');

    console.log(owner);

    const res = await axios.post(`http://localhost:3000/post/tokens`, {

        owner: owner
    });


   /* //traversing through owners and token addresses
    for (let i = 0; i < res.data.tokens.length; i++) {

        text += `The owner ${res.data.tokens[i].wallet} has token with token address ${res.data.tokens[i].token}` + "<br>";


    }*/


    // document.getElementById('mint').innerHTML = text;

    for (let k = 0; k < owner.length; k++) {

        let count = 0;

        for (let l = 0; l < res.data.tokens.length; l++) {

            if (owner[k] === res.data.tokens[l].wallet) {

                count++;
            }
        }
        text += `The owner ${owner[k]} has ${count} tokens` +"<br>";
        document.getElementById('mint').innerHTML = text;
    }
}



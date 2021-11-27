
async function getOwners(){

   document.getElementById('bar').style.display='block';

    const elem = document.getElementById("myBar");
    let width = 1;
    const id = setInterval(frame, 3000);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            document.getElementById('link').style.display='block';
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1  + '%';
        }
    }
    let text='';

    //get multiple values
    let token  = document.getElementById('token').value.split(',');

    console.log(token);

    const res = await axios.post(`http://localhost:3000/post/owners`,{

        token: token
    });

   /* //traversing through owners and token addresses
    for(let i=0; i<res.data.owners.length;i++){

        text += `The account which minted the  token ${res.data.owners[i].address} is ${res.data.owners[i].owner}` +"<br>";


    }

    document.getElementById('mint').innerHTML = text;
*/

    for (let k = 0; k < token.length; k++) {

        let count = 0;

        for (let l = 0; l < res.data.owners.length; l++) {

            if (token[k] === res.data.owners[l].address) {

                count++;
            }
        }
        text += `The total accounts which minted the token ${token[k]} are ${count}` +"<br>";
       // document.getElementById('mint').innerHTML = text;
    }

}
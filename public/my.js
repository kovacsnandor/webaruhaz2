console.log("frontend: heló");
const url = "http://localhost:3000/products/"


async function getProducts(){
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}

async function postProduct(){
    console.log("post");
    let body = {
        name: "Á10",
        quantity: 99,
        price: 6500,
        type: "fémáru"
    }

    body = JSON.stringify(body);
    
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
}

getProducts();

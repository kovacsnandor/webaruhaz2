console.log("frontend: heló");
const url = "http://localhost:3000/products/"


async function getProducts(){
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}


getProducts();

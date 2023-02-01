
console.log("frontend: heló");
const url = "http://localhost:3000/products/"


async function getProducts() {
  let response = await fetch(url);
  let data = await response.json();
  let products = data;
  viewTable(products)
  // console.log(data);
}

function viewTable(products) {
  let trHtml = "";
  for (const aru of products) {
    trHtml += `<tr>`
    for (const key in aru) {
      trHtml += `<td>${aru[key]}</td>`

    }
    trHtml += `</tr>`
  }

  document.getElementById('tbody').innerHTML = trHtml;
}





getProducts();

console.log("frontend: heló");
const url = "http://localhost:3000/products/"




async function postProduct() {
  console.log("post");
  let body = {
    name: document.getElementById("name").value,
    quantity: +document.getElementById("quantity").value,
    price: +document.getElementById("price").value,
    type: document.getElementById("type").value

  }


  // obj -> json
  body = JSON.stringify(body);

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  })
  alertOk()
}


function alertOk() {
  document.getElementById("alertOk").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("alertOk").classList.add("d-none");
  }, 2000);
}

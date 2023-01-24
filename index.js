const express = require("express");
const app = express();
let port = 3000;
const fs = require("fs");
const uniqid = require("uniqid");

const dataFile = "./data/products.json";

//Middleware
app.use(express.json());

app.get("/products", function (req, res) {
  fs.readFile(dataFile, (error, data) => {
    let products = JSON.parse(data);
    res.send(products);
  });
});

app.get("/products/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  fs.readFile(dataFile, (error, data) => {
    let products = JSON.parse(data);
    const productById = products.find((product) => product.id === id);
    if (!productById) {
      let message = {
        error: `Not found id: ${id}`,
      };
      res.status(404);
      res.send(message);
      return;
    }

    res.send(productById);
  });
});

app.post("/products", function (req, res) {
  const body = req.body;

  const newProduct = {
    id: uniqid(),
    name: body.name,
    quantity: body.quantity,
    price: body.price,
    type: body.type,
  };

  fs.readFile(dataFile, (error, data) => {
    //json -> objektum lista
    let products = JSON.parse(data);
    products.push(newProduct);
    //objektumlista -> json
    products = JSON.stringify(products);
    console.log(products);
    fs.writeFile(dataFile, products, (error) => {
      res.send(newProduct);
    });
  });
});

app.delete("/products/:id", function (req, res) {
  const id = req.params.id;

  fs.readFile(dataFile, (error, data) => {
    let products = JSON.parse(data);
    //megkeressük
    const productIndexById = products.findIndex((product) => product.id === id);
    if (productIndexById === -1) {
      let message = {
        error: `not founc id: ${id}`,
      };
      res.status(404);
      res.send(message);
      return;
    }

    //törli amit kell
    products.splice(productIndexById, 1);
    //visszaírjuk
    products = JSON.stringify(products);
    fs.writeFile(dataFile, products, (error) => {
      res.send({ id: id });
    });
  });
});


app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    fs.readFile(dataFile,(error, data)=>{
        const products = JSON.parse(data);
        const productIndexById = products.findIndex(product => product.id == id);
        if (productIndexById === -1) {
            let message = {
                error: `id: ${id} not found`
            }
            res.status(404);
            res.send(message);
            // res.send(JSON.stringify(message));
            return;
        }
        const updatedProduct = {
            id: id,
            name: req.body.name,
            quantity: Number(req.body.quantity),
            price: Number(req.body.price),
            type: req.body.type,
          };
        products[productIndexById] = updatedProduct;
        fs.writeFile(dataFile, JSON.stringify(products), (error, data)=>{
            res.send(updatedProduct);
        });
        
    });
});

app.listen(port, () => {
  console.log(`Express server ok. port: ${port}`);
});

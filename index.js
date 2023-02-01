const express = require("express");
const app = express();
let port = 3000;
const fs = require("fs");
const path = require("path")
const uniqid = require("uniqid");
const cors = require("cors")
const sanitizerHtml = require("sanitize-html")

const dataFile = "./data/products.json";

//Middleware
app.use(express.json());
//statikus tartalmak kiszolgálása
app.use('/public', express.static('public'));

const corsConf = {
  "origin": ["http://127.0.0.1:5500", "http://localhost:8080"],
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.use(cors(corsConf));

//get home
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "./frontend/index.html"));
})

//get home
app.get('/post', function(req, res){
  res.sendFile(path.join(__dirname, "./frontend/post.html"));
})

app.get("/products", function (req, res) {
  fs.readFile(dataFile, (error, data) => {
    let products = JSON.parse(data);
    res.send(products);
  });
});

app.get("/products/:id", function (req, res) {
  const id = req.params.id;
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
    name: sanitizerHtml(body.name),
    quantity: +sanitizerHtml(body.quantity),
    price: +sanitizerHtml(body.price),
    type: sanitizerHtml(body.type)
  };

  fs.readFile(dataFile, (error, data) => {
    //json -> objektum lista
    let products = JSON.parse(data);
    products.push(newProduct);
    //objektumlista -> json
    products = JSON.stringify(products);
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
          id: uniqid(),
          name: sanitizerHtml(body.name),
          quantity: +sanitizerHtml(body.quantity),
          price: +sanitizerHtml(body.price),
          type: sanitizerHtml(body.type)
        }
        products[productIndexById] = updatedProduct;
        fs.writeFile(dataFile, JSON.stringify(products), (error, data)=>{
            res.send(updatedProduct);
        });
        
    });
});

app.listen(port, () => {
  console.log(`Express server ok. port: ${port}`);
});

# Json szerver

## projekt inicializálása
`npm init -y`

## Telepítendő modulok

- szerver: `npm i --save express`  
- XSS védelem: `npm install sanitize-html` 
- egyedi azonosító (id): `npm install uniqid`

Telepítés egyszerre:
- `npm i express sanitize-html uniqid`

# Express server
- Branch: `01_Express_beindítása`
```js
const express = require('express')
const app = express()
let port = 3000

app.get('/products', function (req, res) {
  res.send('Hello World')
})

app.listen(port, ()=>{
    console.log(`Express server ok. port: ${port}`);
})
```

# Adatszerkezet
- Branch: `02_Adatszerkezet`

```json
product = {
    "id": "string",
    "name": "string",
    "quantity": "int",
    "price": "number",
    "type": "string"
}
```
A kész adatszerkezet:
```json
[
    {
      "id": "apcj6tclbfhqung",
      "name": "Á22",
      "quantity": 24,
      "price": 2500,
      "type": "tejtermék"
    },
    {
      "id": "apcjbuglbfhs62f",
      "name": "Á2",
      "quantity": 24,
      "price": 2500,
      "type": "tejtermék"
    },
    {
      "id": "apcj1q8lbfnah5m",
      "name": "Á1",
      "quantity": 24,
      "price": 2500,
      "type": "tejtermék"
    }
  ]
```

# 3 get, file system
- branch: `03_Get_FileSystem`
Ezt valósítottuk meg:
```rest
### get products
get http://localhost:3000/products/

### get product by id
get http://localhost:3000/products/apcj6tclbfhqungx
```






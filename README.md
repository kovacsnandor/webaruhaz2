# Json szerver

## projekt inicializálása
`npm init -y`

## Telepítendő modulok

- `npm i --save express`  
- `npm install sanitize-html` 
- `npm install uniqid`

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




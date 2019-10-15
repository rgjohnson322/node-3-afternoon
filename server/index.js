const express = require("express");
const massive = require("massive");
require("dotenv").config();
const app = express();
const { SERVER_PORT, CONNECTION_STRING } = process.env;
const products_controller = require("./controllers/products_controller");



massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set("db", dbInstance);
    console.log("database connected")
})
.catch(err => console.log(err));

app.use(express.json());

app.post('/api/products', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);



app.listen (SERVER_PORT, () => {
    console.log(`listening on ${SERVER_PORT}`)
})

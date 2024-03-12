const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const bp = require('body-parser')

//variable global 
require('dotenv/config');
const api = process.env.API_URL;

// Permissions to communicate HTTP REQUEST 
app.use(cors());
app.options('*', cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(morgan('tiny')); // muestra la url en el console que apunta cuando hace una peticion

//Exporting routers module
const usersRouter = require('./routers/users');
const clientsRouter = require('./routers/clients');
const ordersRouter = require('./routers/orders');
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');

//Routers
app.use(`${api}/login`, usersRouter);
app.use(`${api}/clients`, clientsRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);

app.listen(port, () => {
    console.log(` Server is running on port ${port} `);
});
 

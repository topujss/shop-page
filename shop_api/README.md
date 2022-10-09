## Online Shop Rest Api


## HOW TO WORK ON API

* CUSTOMERS
    * Create Customer
        * name
        * email
        * cell
        * location
        * zip code
        * shipping address
        * billing
        * address
    * Customer View
    * Customer Single data View
    * Customer Single data Update
    * Customer Single data Delete
* Product
    * Create Product
        * name
        * slug
        * regular price
        * sale price
        * stock
        * short desc
        * long
    * Product View
    * Product Single data View
    * Product Single data Update
    * Product Single data Delete
* Category
    * Category Product
        * name
        * slug
        * photo
    * Category Single data Update
    * Category Single data Delete
* Tag
    * Tag Product
        * name
        * slug
    * Tag Single data Update
    * Tag Single data Delete

## Usage

If are you want to download and use

```console
npm install 
```
## Server structure

```console
//package include
const express           = require('express');
const dotenv            = require('dotenv');
const customersRouter   = require('./routes/customersRouter');
const tagRouter         = require('./routes/tagRouter');
const categoryRouter    = require('./routes/categoryRouter');
const productRouter     = require('./routes/productRouter');

//Environment variable 
dotenv.config();
const PORT = process.env.PORT || 4040;

//express init
const app = express();

//middleware init
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//public folder static
app.use(express.static('public'));

//API init
app.use('/api/v1/customers', customersRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/tag', tagRouter);

//server listen
app.listen(PORT, ()=>{
    console.log(`server running on port : ${PORT}`);
})

```

## Packages Include

* Express Js
* Nodemon
* dotenv
* multer
* randomstring

## Live For API 

[Live Project](https://documenter.getpostman.com/view/19116844/2s83mYqkUQ)


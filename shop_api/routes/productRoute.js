//file include
const express = require('express');
const { getAllProduct, createProduct, productView, ProductUpdate, productDelete} = require('../controllers/productControllers');
const { multerProductStorage } = require('../utility/storageDisk');

// router init
const productRouter = express.Router();   

//routes
productRouter.route('/').get(getAllProduct).post(multerProductStorage(),createProduct);
productRouter.route('/:slug').get(productView);
productRouter.route('/:id').put(multerProductStorage(),ProductUpdate).delete(productDelete);


//module exports
module.exports = productRouter;

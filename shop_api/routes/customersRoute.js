//file include
const express = require('express');
const { allCustomerInfo, createCustomer, customerView, customerUpdate, customerDelete  } = require('../controllers/customersControllers');
const { multerCustomerStorage } = require('../utility/storageDisk');

// router init
const customersRouter = express.Router();   

//routes
customersRouter.route('/').get(allCustomerInfo).post(multerCustomerStorage(),createCustomer);
customersRouter.route('/:id').get(customerView).put(multerCustomerStorage(),customerUpdate).delete(customerDelete);


//module exports
module.exports = customersRouter;

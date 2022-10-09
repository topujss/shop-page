//file include
const express = require('express');
const { allCategoryInfo, createCategory, categoryUpdate,
    CategoryDelete } = require('../controllers/categoryControllers');
const { multerCategoryStorage } = require('../utility/storageDisk');

// router init
const categoryRouter = express.Router();   

//routes
categoryRouter.route('/').get(allCategoryInfo).post(multerCategoryStorage(),createCategory);
categoryRouter.route('/:id').put(multerCategoryStorage(),categoryUpdate).delete(CategoryDelete);



//module exports
module.exports = categoryRouter;

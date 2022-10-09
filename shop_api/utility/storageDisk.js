// package include
const multer = require('multer');
const path = require('path');
const randomstring = require('randomstring');

// multer Customer photo
const multerCustomerStorage = () => {
  //multer diskStorage
  const customerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/customer'));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        randomstring.generate(7) +
          '_' +
          randomstring.generate({ length: 7, charset: 'alphabetic' }) +
          '_' +
          file.originalname
      );
    },
  });

  //multer
  return multer({
    storage: customerStorage,
  }).single('customer_photo');
};

// multer category photo
const multerCategoryStorage = () => {
  //multer diskStorage
  const categoryStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/category'));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        randomstring.generate(7) +
          '_' +
          randomstring.generate({ length: 7, charset: 'alphabetic' }) +
          '_' +
          file.originalname
      );
    },
  });

  //multer
  return multer({
    storage: categoryStorage,
  }).single('category_photo');
};

// multer Product photo
const multerProductStorage = () => {
  //multer diskStorage
  const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/product'));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        randomstring.generate(7) +
          '_' +
          randomstring.generate({ length: 7, charset: 'alphabetic' }) +
          '_' +
          file.originalname
      );
    },
  });

  //multer
  return multer({
    storage: productStorage,
  }).array('product_photo');
};

//module exports
module.exports = {
  multerCustomerStorage,
  multerCategoryStorage,
  multerProductStorage,
};

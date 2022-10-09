//required
const { getProductDB, updateProductDB } = require("../utility/read_&_write");
const getRandomID = require("../utility/getRandomID");
const getSlug = require("../utility/getSlug");

/**
 * @desc Get All Product
 * @name GET api/v1/product
 * @access public
 */
const getAllProduct = (req, res) => {
  //all  Product db
  const Product = getProductDB();

  //send Product data
  res.status(200).json(Product);
};

/**
 * @desc Create Product
 * @name POST api/v1/product
 * @access public
 */
const createProduct = (req, res) => {
  //all Product db
  const Product = getProductDB();

  //product multiple image
  let pdImg = [];
  req.files?.forEach((pd) => {
    pdImg.push(pd?.filename);
  });

  //Product data add
  Product.push({
    id: getRandomID(),
    ...req.body,
    slug: getSlug(req.body?.name),
    product_photo: req.files ? pdImg : "//i.ibb.co/vzzJm1V/Tshirt.jpg",
  });

  //validated
  if (!req.body) {
    //responsive
    res.status(400).json({
      status: false,
      message: "Invalid Product data!",
    });
  } else {
    //update data
    updateProductDB(Product);

    //responsive
    res.status(201).json({
      status: true,
      message: "Product create successfully",
    });
  }
};

/**
 * @desc Product single data view
 * @name GET api/v1/product/slug
 * @access public
 */
const productView = (req, res) => {
  //all Product db
  const Product = getProductDB();

  //get slug
  const { slug } = req.params;

  //get data
  const data = Product.find((data) => data.slug == slug);

  //validated
  if (Product.some((data) => data.slug == slug)) {
    //responsive
    res.status(200).json(data);
  } else {
    //responsive
    res.status(404).json({
      status: false,
      message: "Product not Found!!",
    });
  }
};

/**
 * @desc Product Single data Update
 * @name PUT api/v1/product/id
 * @access public
 */
const ProductUpdate = (req, res) => {
  //all Product db
  const Product = getProductDB();

  //get id
  const { id } = req.params;

  //get index
  const index = Product.findIndex((data) => data.id == id);

  //product multiple image
  let pdImg = [];
  req.files.forEach((pd) => {
    pdImg.push(pd?.filename);
  });

  //validated
  if (Product.some((data) => data.id == id)) {
    //update Product data
    Product[index] = {
      ...Product[index],
      ...req.body,
      product_photo: req.files ? pdImg : Product[index]?.product_photo,
    };

    //update data
    updateProductDB(Product);

    //responsive
    res.status(200).json({
      status: true,
      message: "Product Update Successfully",
    });
  } else {
    //responsive
    res.status(404).json({
      status: false,
      message: "Product not Found!!",
    });
  }
};

/**
 * @desc Product Single data delete
 * @name DELATE api/v1/product/id
 * @access public
 */
const productDelete = (req, res) => {
  //all Product db
  const Product = getProductDB();

  //get id
  const { id } = req.params;

  //get data
  const allData = Product.filter((data) => data.id != id);

  //validated
  if (Product.some((data) => data.id == id)) {
    //update data
    updateProductDB(allData);

    //responsive
    res.status(201).json({
      status: true,
      message: "Product Delete successfully",
    });
  } else {
    //responsive
    res.status(404).json({
      status: false,
      message: "Product not Found!!",
    });
  }
};

//module exports
module.exports = {
  getAllProduct,
  createProduct,
  productView,
  ProductUpdate,
  productDelete,
};

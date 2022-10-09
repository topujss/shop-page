//required
const { getCategoryDB, updateCategoryDB } = require("../utility/read_&_write");
const getRandomID = require("../utility/getRandomID");
const getSlug = require("../utility/getSlug");

/**
 * @desc All Category info display
 * @name GET api/v1/category
 * @access public
 */
 const allCategoryInfo = (req,res) => {

    //all Category db 
    const category = getCategoryDB();

    //send customer data
    res.status(200).json(category);
    
}

/**
 * @desc Create Category info
 * @name POST api/v1/category
 * @access public
 */
 const createCategory = (req,res) => {

    //all Category db 
   const Category = getCategoryDB();

   //Category data add
   Category.push({
       id : getRandomID(),
       ...req.body,
       slug : getSlug(req.body?.name),
       category_photo : req.file ? req.file.filename : "//i.ibb.co/ZNFNBjp/category.webp"
   });

   //validated
   if(!req.body){
       //responsive
       res.status(400).json({
           "status"  : false,
           "message" : "Invalid Category data!"
       });

   }else{
       //update data
       updateCategoryDB(Category);

       //responsive
       res.status(201).json({
           "status"  : true,
           "message" : "Category create successfully"
       });
     
   }  
  
}


/**
 * @desc Category Single data Update 
 * @name PUT api/v1/category/id
 * @access public
 */
 const categoryUpdate = (req,res) => {
    //all Category db 
    const Category = getCategoryDB();

    //get id
    const { id }  = req.params;

    //get index
    const index = Category.findIndex(data => data.id == id);

    //validated
    if(Category.some(data => data.id == id)){

        //update Category data
        Category[index] = {
            ...Category[index],
            ...req.body,
            category_photo : req.file ? req.file.filename : Category[index]?.category_photo
        };

        //update data
        updateCategoryDB(Category);

        //responsive
        res.status(200).json({
            "status"  : true,
            "message" : "Category Update Successfully"
        });
     
   }else{

        //responsive
        res.status(404).json({
            "status"  : false,
            "message" : "Category not Found!!"
        });

        
   }  
}


/**
 * @desc Category Single data delete
 * @name DELATE api/v1/category/id
 * @access public
 */
 const CategoryDelete = ( req, res ) => {
    //all Category db 
    const Category = getCategoryDB();

    //get id
    const { id }  = req.params;

    //get data
    const allData = Category.filter(data => data.id != id);

    //validated
    if(Category.some(data => data.id == id)){
      
       //update data
       updateCategoryDB(allData);

       //responsive
       res.status(201).json({
           "status"  : true,
           "message" : "Category Delete successfully"
       });
       
   }else{

        //responsive
        res.status(404).json({
           "status"  : false,
           "message" : "Category not Found!!"
       });
        
     
   }  

}




//module exports
module.exports = {
    allCategoryInfo,
    createCategory,
    categoryUpdate,
    CategoryDelete
}
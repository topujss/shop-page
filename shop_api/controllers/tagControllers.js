//required
const { getTagDB, updateTagDB } = require("../utility/read_&_write");
const getSlug = require('../utility/getSlug');
const getRandomID = require("../utility/getRandomID");


/**
 * @desc Get All Tag 
 * @name GET api/v1/tag
 * @access public
 */
 const getAllTag = (req,res) => {

    //all  tag db 
    const tag = getTagDB();

    //send customer data
    res.status(200).json(tag);
}

/**
 * @desc Create Tag 
 * @name POST api/v1/tag
 * @access public
 */
 const createTag = (req,res) => {

    //all tag db 
   const tag = getTagDB();

   //tag data add
   tag.push({
       id : getRandomID(),
       ...req.body,
       slug : getSlug(req.body?.name)
   });

   
   //validated
   if(!req.body){
       //responsive
       res.status(400).json({
           "status"  : false,
           "message" : "Invalid tag data!"
       });

   }else{
       //update data
       updateTagDB(tag);

       //responsive
       res.status(201).json({
           "status"  : true,
           "message" : "tag create successfully"
       });
     
   }  
  
}


/**
 * @desc Tag Single data Update 
 * @name PUT api/v1/tag/id
 * @access public
 */
 const tagUpdate = (req,res) => {

    //all tag db 
   const tag = getTagDB();

    //get id
    const { id }  = req.params;

    //get index
    const index = tag.findIndex(data => data.id == id);

    //validated
    if(tag.some(data => data.id == id)){

        //update customer data
        tag[index] = {
            ...tag[index],
            ...req.body
        };

        //update data
        updateTagDB(tag);

        //responsive
        res.status(200).json({
            "status"  : true,
            "message" : "tag Update Successfully"
        });
     
   }else{

        //responsive
        res.status(404).json({
            "status"  : false,
            "message" : "tag not Found!!"
        });

        
   }  
}


/**
 * @desc tag Single data delete
 * @name DELATE api/v1/tag/id
 * @access public
 */
 const tagDelete = ( req, res ) => {
    //all tag db 
    const tag = getTagDB();

    //get slug
    const { id }  = req.params;

    //get data
    const allTag = tag.filter(data => data.id != id);

    //validated
    if(tag.some(data => data.id == id)){
      
       //update data
       updateTagDB(allTag);

       //responsive
       res.status(201).json({
           "status"  : true,
           "message" : "Tag Delete successfully"
       });
       
   }else{

        //responsive
        res.status(404).json({
           "status"  : false,
           "message" : "Tag not Found!!"
       });
        
     
   }  

}



module.exports = {
    getAllTag,
    createTag,
    tagUpdate,
    tagDelete
} 




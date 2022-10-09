//required
const { getCustomerDB, updateCustomerDB } = require("../utility/read_&_write");
const getRandomID = require("../utility/getRandomID");

/**
 * @desc All customer info display
 * @name GET api/v1/customers
 * @access public
 */
const allCustomerInfo = (req,res) => {

    //all customer db 
    const customer = getCustomerDB();

    //send customer data
    res.status(200).json(customer);
}

/**
 * @desc Create customer info
 * @name POST api/v1/customers
 * @access public
 */
const createCustomer = (req,res) => {

     //all customer db 
    const customer = getCustomerDB();

    //customer data add
    customer.push({
        id : getRandomID(),
        ...req.body,
        customer_photo : req.file ? req.file.filename : "//i.ibb.co/DDbjkbw/profile.png"
    });

    //validated
    if(!req.body){
        //responsive
        res.status(400).json({
            "status"  : false,
            "message" : "Invalid customer data!"
        });

    }else{
        //update data
        updateCustomerDB(customer);

        //responsive
        res.status(201).json({
            "status"  : true,
            "message" : "customer profile create successfully"
        });
      
    }  
   
}


/**
 * @desc Customer single data view
 * @name GET api/v1/customers/id
 * @access public
 */
const customerView = (req,res) => {
     //all customer db 
     const customer = getCustomerDB();

     //get id
     const { id }  = req.params;


     //get data
     const data = customer.find(data => data.id == id);

     //validated
     if(customer.some(data => data.id == id)){
         //responsive
         res.status(200).json(data);

    }else{
        //responsive
        res.status(404).json({
            "status"  : false,
            "message" : "Page not Found!!"
        });
       
      
    }  
    
}

/**
 * @desc Customer Single data Update 
 * @name PUT api/v1/customers/id
 * @access public
 */
const customerUpdate = (req,res) => {
    //all customer db 
    const customer = getCustomerDB();

    //get id
    const { id }  = req.params;

    //get index
    const index = customer.findIndex(data => data.id == id);

    //validated
    if(customer.some(data => data.id == id)){

        //update customer data
        customer[index] = {
            ...customer[index],
            ...req.body,
            customer_photo : req.file ? req.file.filename : customer[index]?.customer_photo
        };

        //update data
        updateCustomerDB(customer);

        //responsive
        res.status(200).json({
            "status"  : true,
            "message" : "customer profile Update Successfully"
        });
     
   }else{

        //responsive
        res.status(404).json({
            "status"  : false,
            "message" : "Page not Found!!"
        });

        
   }  
}

/**
 * @desc customer Single data delete
 * @name DELATE api/v1/customers/id
 * @access public
 */
const customerDelete = ( req, res ) => {
     //all customer db 
     const customer = getCustomerDB();

     //get id
     const { id }  = req.params;

     //get data
     const allData = customer.filter(data => data.id != id);

     //validated
     if(customer.some(data => data.id == id)){
       
        //update data
        updateCustomerDB(allData);

        //responsive
        res.status(201).json({
            "status"  : true,
            "message" : "customer profile Delete successfully"
        });
        
    }else{

         //responsive
         res.status(404).json({
            "status"  : false,
            "message" : "Page not Found!!"
        }); 
      
    }  

}

//module exports
module.exports = {
    allCustomerInfo,
    createCustomer,
    customerView,
    customerUpdate,
    customerDelete
}
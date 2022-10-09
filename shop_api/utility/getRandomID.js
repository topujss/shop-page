
// random id generator 
const getRandomID = () => {

    //id generator
    return Date.now() + "_" + Math.ceil(Math.random() * 10000);
    
}

// module exports
module.exports = getRandomID;
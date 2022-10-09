
//get slug
const getSlug = (title = "") => {

   

    //make slug
    return title.toLowerCase().replace(/[^\w-]+/g, '-');

}

//module exports
module.exports = getSlug ;
const mongoose = require('mongoose');
async function connection(){
    try{
       await mongoose.connect('');
       console.log("db connect");
    }
    catch(error){
        if(error)
        {
            throw error;
        }
    }
}
module.exports=connection;
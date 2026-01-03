const mongoose = require('mongoose');

function connecDB() {
    mongoose.connect(process.env.MONGOODB_URL)
    .then(() => {
        console.log("databse connected");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connecDB;
const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/food-view")
    .then(()=>{
        console.log("MOngoDB connected");
    })
    .catch((err)=>{
        console.log("MongoDB connection error:",err);
    })
}

module.exports = connectDB
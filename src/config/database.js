const mongoose = require("mongoose");

const connectDB = async ()=>{
    mongoose.connect(
        "mongodb+srv://vaibhavmishra245:0ld5igLgyYyikUBS@tinderappdatabase.70nwg.mongodb.net/tinderAppDataBase"
    )
}

module.exports = connectDB;

   
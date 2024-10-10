const mongoose = require("mongoose")

const {Schema } = mongoose;

const userSchema = new Schema ({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    mobileNumber:{
        type:Number
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
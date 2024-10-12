const mongoose = require("mongoose")
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            require:true
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Please Enter VAlid Email")
                }
            }
        },
        password: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: Number,
            // required: true,
        },
        age: {
            type: Number,
            min: 18
        },
        gender: {
            type: String,
            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("In valid Gender")
                }
            }
        },
        photoUrl: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHe5JZvnW6uJe9-Ae2dUy6qJpBUjSOqdT46w&s"
        },
        about: {
            type: String,
            default: "Please write something about you.."
        },
        skills: {
            type: [String],
        }
    },
    {
        timestamps:true
    }
);

userSchema.methods.getJwtToken = async function() {
    const token = await jwt.sign({ _id: this._id }, "VAibhav@Shreya786")
    return token;
  };
userSchema.methods.isValidUserPassword = async function(InpUserPassword) {
    const isValidPAssword = await bcrypt.compare(InpUserPassword, this.password)
    return isValidPAssword;
  };

const User = mongoose.model('User', userSchema);
module.exports = User;
const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/user");

authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
    const ALLOWED_UPDATE = [
        "_id",
        "firstName",
        "lastName",
        "emailId",
        "password",
        "mobileNumber",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills"
    ]
    const { firstName, lastName, emailId, password, mobileNumber } = req.body;

    var isAllowed = Object.keys(req.body).length > 0 &&
        Object.keys(req.body).every(key => ALLOWED_UPDATE.includes(key))
    try {
        if (!isAllowed) throw Error("Request Body is invalid")

        const hashPassword = await bcrypt.hash(password, 11);
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: hashPassword,
            mobileNumber: mobileNumber
        });
        await user.save();
        res.send("User data saved successfully..!")
    } catch (error) {
        res.status(404).send("Encountered some Error..??" + error.message);
    }
})

authRouter.post("/login", async (req, res) => {
    //validate user credential (email Id and password)
    const { emailId, password } = req.body;
    try {
        const user = await User.findOne({ "emailId": emailId });
        if (user == null) throw new Error("Invalid Email ID")
        // isValidUserPassword = await bcrypt.compare(password, user.password)
        isValidUserPassword = await user.isValidUserPassword(password)
        if (!isValidUserPassword) throw new Error("password is invalid")
        //Add token to cookie and send response back to the user
        // const token = await jwt.sign({ _id: user._id }, "VAibhav@Shreya786")
        const token = await user.getJwtToken();
        res.cookie("token", token);
        res.send("Login Successfully...!")
    } catch (Erorr) {
        res.status(400).send("Encountered some Error??" + Erorr);
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      res.send("Logout Successful........@@");
})

module.exports = authRouter;
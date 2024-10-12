const express = require("express");
const bcrypt = require('bcrypt');
const validator = require('validator');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const {userAuth} = require("./middlewares/auth")
app.use(express.json()) // to convert req in json
app.use(cookieParser())
app.post("/signUp", async (req, res) => {
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

app.post("/login", async (req, res) => {
    //validate user credential (email Id and password)
    const { emailId, password } = req.body;
    try {
        const user = await User.findOne({ "emailId": emailId });
        if (user == null) throw new Error("Invalid Email ID")
        // isValidUserPassword = await bcrypt.compare(password, user.password)
        isValidUserPassword = isValidUserPassword(password)
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

app.get("/profile",userAuth, async (req, res) => {

    try {
        const user = req.user
        console.log("user--",user)
        //commented codes will be handled by "userAuth middleware

        // const token = req.cookies.token
        //  if(!token) throw new Error("Invalid Token")
        // //validate token
        // const decodedData = await jwt.verify(token, "VAibhav@Shreya786")
        // const { _id } = decodedData;
        // const user = await User.findById(_id)
        //if(!user) throw new Error("Please Login again")
        res.send(user)
    } catch (Erorr) {
        res.status(400).send("Encountered some Error??" + Erorr);
    }

})

app.get("/user", async (req, res) => {
    const emailId = req.body.emailId;
    try {
        const allUser = await User.find({ emailId: emailId })
        res.send("Got the user successfully");
    } catch (error) {
        res.status(400).send("Encountered some Error..??");
    }

})

app.delete("/user", async (req, res) => {

    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId)
        res.send("User deleted Successfully...!")
    } catch (err) {
        res.status(400).send("Encountered some Error..??" + err.message);
    }


})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    const isEmail = Object.keys(req.body).includes("emailId");


    try {
        if (isEmail) throw Error("Email cannot be updated...!!")
        await User.findByIdAndUpdate(
            { _id: userId },
            data,
            { runValidators: true }
        );
        res.send("Record updated successfully...!");
    } catch (err) {
        res.status(400).send("Encountered some Error..??" + err.message);
    }
})

connectDB()
    .then(() => {
        console.log("Database connected..........!")
        app.listen(3001, () => {
            console.log("Server is successfully listening on port::3001")
        })
    }).catch((err) => {
        console.log("cannot connect to database......", err);
    })


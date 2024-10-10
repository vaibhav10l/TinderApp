const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
app.use(express.json())
app.post("/signUp", async (req, res) => {
    //static way of posting data
    // const userData = {
    //     firstName: "Shreya",
    //     lastNAme: "Mishra",
    //     emailId: "shreya@gmail.com",
    //     password: "shreya@123",
    //     mobileNumber: 8527777777,
    // }

    // Dynamic way of posting data.
    try {
        console.log("request body---", req.body);
        const user = new User(req.body);
        await user.save();
        res.send("User data saved successfully..!")
    } catch (err) {
        res.status(400).send("Encountered some Error..??", err.message);
    }
})

app.get("/user", async (req, res) => {
    const emailId = req.body.emailId;
    try {
        const allUser = await User.find({ emailId: emailId })
        console.log("allUser--", allUser)
        res.send("Got the user successfully");
    } catch (err) {
        res.status(400).send("Encountered some Error..??", err.message);
    }

})

app.delete("/user", async (req,res) => {

    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId)
        res.send("User deleted Successfully...!")
    }catch (err) {
        res.status(400).send("Encountered some Error..??", err.message);
    }


})

app.patch("/user",async (req,res)=>{
    const userId = req.body.userId;
    const data =req.body;

    try{
        await User.findByIdAndUpdate({_id:userId},data);
        res.send("Record updated successfully...!");
    }catch (err) {
        res.status(400).send("Encountered some Error..??", err.message);
    }
})

connectDB()
    .then(() => {
        console.log("Database connected..........!")
        app.listen(3001, () => {
            console.log("Server is successfully listening on port::3001")
        })
    }).catch((err) => {
        console.log("cannot connect to database......", err)
    })


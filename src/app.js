// console.log("This is first line of my first node js backend project")
const express = require("express");

const app = express();
app.use("/home",(req,res)=>{
    res.send("Hello from the home")
})
app.use("/login",(req,res)=>{
    res.send("Hello from the login")
})
app.use("/about",(req,res)=>{
    res.send("Hello from the about")
})
app.use("/type",(req,res)=>{
    res.send("Hello from the type")
})
app.listen(3001,()=>{
    console.log("Server is successfully listening on port::3001")
})
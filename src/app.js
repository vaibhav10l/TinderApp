// console.log("This is first line of my first node js backend project")
const express = require("express");
// order of the routes matter a lots
 //If first route matches with the routes decleared below , it will always go into 1st route. 
const app = express();
app.use("/user",(req,res)=>{
 res.send("ABRACADABRA!!!!!!")
})
app.get("/user",(req,res)=>{
    res.send("this is to GET the user")
})
app.post("/user",(req,res)=>{
    res.send("this is to POST the user")
})
app.delete("/user",(req,res)=>{
    res.send("this is to delete the user")
})
// app.use("/login",(req,res)=>{ 
//     res.send("Hello from the login")
// })
// app.use("/login222",(req,res)=>{ 
//     res.send("Hello from the login222")
// })
// app.use("/login/4",(req,res)=>{
//     res.send("Hello from the login 4")
// })
// app.use("/about",(req,res)=>{
//     res.send("Hello from the about")
// })
// app.use("/type",(req,res)=>{
//     res.send("Hello from the type")
// })

// app.use("/",(req,res)=>{
//     res.send("Hello from the / route")
// })
app.listen(3001,()=>{
    console.log("Server is successfully listening on port::3001")
})
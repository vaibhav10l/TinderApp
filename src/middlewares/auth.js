const jwt = require("jsonwebtoken")
const User = require("../models/user")
const userAuth = async (req,res,next)=>{
try{
    //Read the token
const {token} = req.cookies;
if(!token) throw new Error("Invalid Token>>>>")
//validate the token 
const decodedData = jwt.verify(token, "VAibhav@Shreya786");
const {_id} = decodedData;
const user = await User.findById(_id);
if(!user) throw new Error("User Not FOUND>>>")
    req.user = user;
    next();
}catch(err){
res.status(400).send("ERROR::::"+err.message)
}
}

module.exports = {userAuth};
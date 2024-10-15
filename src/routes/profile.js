const express = require("express");
const {userAuth} = require("../middlewares/auth")
profileRouter = express.Router();

profileRouter.get("/profile",userAuth, async (req, res) => {

    try {
        const user = req.user
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

module.exports = profileRouter;
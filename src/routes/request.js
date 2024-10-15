const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:user_id", userAuth, async (req, res) => {
    console.log(req.params)
    const fromUserId = req.user._id;
    const toUserId = req.params.user_id;
    const status = req.params.status;





    try {
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ messege: "Invalid status:::::" + status });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({ messege: "USER_NOT_FOUND:::::" });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });
        if (existingConnectionRequest) {
            return res
                .status(400)
                .send({ message: "Connection Request Already Exists!!" });
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();
        res.json({
            message: "Connection created",
            data
        })
    } catch (err) {
        res.status(400).send("Error Occured..." + err)
    }
})

module.exports = requestRouter;
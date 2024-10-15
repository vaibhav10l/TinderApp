const mongoose = require("mongoose");
const {Schema} = mongoose;

const connectionRequestSchema = new Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        status:{
            type:String,
            required:true,
            enum:{
                values:["accepted","rejected","ignored","interested"],
                message:`{VALUE} is incorrect status type`
            }
        }
    },
    {
        timestamps:true
    }
)

const ConnectionRequestModal = mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequestModal;
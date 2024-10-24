const express = require("express");
const connectDB = require("./config/database")
const app = express();
const cookieParser = require('cookie-parser')
var cors = require('cors')
 
app.use(express.json()) // to convert req in json
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


connectDB()
    .then(() => {
        console.log("Database connected..........!")
        app.listen(3001, () => {
            console.log("Server is successfully listening on port::3001")
        })
    }).catch((err) => {
        console.log("cannot connect to database......", err);
    })


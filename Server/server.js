require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/conndb")
const { default: mongoose } = require("mongoose")
const PORT=process.env.PORT||8880
const app=express()
connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/user",require("./routs/userRouts"))
app.use("/api/todo",require("./routs/todoRouts"))
app.use("/api/photo",require("./routs/photoRouts"))
app.use("/api/post",require("./routs/postRouts"))
app.get("/", (req, res) => {
    res.send("hi")
})
mongoose.connection.once('open',()=>{
    console.log("the connection to the DB is open")
    app.listen(PORT,()=>{
        console.log(`the server run on port ${PORT}`)
    })
})
mongoose.connection.on('err',()=>{
    console.log(" connection  error "+err)
})


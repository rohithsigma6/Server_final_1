const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const connect = ()=>{
    return mongoose.connect("mongodb+srv://rbjuly31:rbjuly31@cluster0.wwq2azn.mongodb.net/")
}
require("./mainRoutes")(app);
app.listen(1998,()=>{
    connect()
    console.log("Data base connected")
})
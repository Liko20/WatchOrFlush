const express = require('express')
const cors = require('cors')
const app = express()
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
const api = require('./routes/api')
const cookieParser = require('cookie-parser')

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



app.use('/',api)

uri = "mongodb://0.0.0.0:27017/moviereview"
  mongoose.connect(uri,{}).then(() => {
        console.log("Success")
    }).catch((err) => {
        console.log("Unable to connect to server: " + err)
    })

app.listen( 5000, ()=>{
    console.log("listening on port 5000")
})


 
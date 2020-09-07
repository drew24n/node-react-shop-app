import {auth} from "./api/user/auth";
import {login} from "./api/user/login";
import {register} from "./api/user/register";

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const {user, password, db} = require('./database/connection/dev') //dev connection
const dbConnection = `mongodb+srv://${user}:${password}@shop.ca8tl.mongodb.net/${db}?retryWrites=true&w=majority`
mongoose.connect(dbConnection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('database connected')).catch(error => console.log(error))

const app = express()
app.use(express.json(), cookieParser())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

export {app}

//User API
register()
login()
auth()
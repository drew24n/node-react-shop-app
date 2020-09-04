const express = require('express')
export const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000
const dbConnection = 'mongodb+srv://andrew91:0k4pvQu9RDk6QIBc@shop.ca8tl.mongodb.net/shop?retryWrites=true&w=majority'

mongoose.connect(dbConnection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('database connected')).catch(error => console.log(error))

const app = express()

app.use(express.json())
app.use(cookieParser())

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

export {app}

//add new user API
import {addNewUser} from "./api/user/addNewUser";
addNewUser()
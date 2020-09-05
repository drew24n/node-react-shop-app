const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const {login, password, db} = require('./database/auth/dev') //dev connection
const dbConnection = `mongodb+srv://${login}:${password}@shop.ca8tl.mongodb.net/${db}?retryWrites=true&w=majority`
mongoose.connect(dbConnection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('database connected')).catch(error => console.log(error))

const app = express()
app.use(express.json(), cookieParser())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

export {app}

//API requests
const register = require('./api/user/register')
const auth = require('./api/user/auth')
register()
auth()
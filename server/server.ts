const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const {user, password, db} = require('./devDB') //dev database connection
const dbConnection = `mongodb+srv://${user}:${password}@shop.ca8tl.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('database connected'))
    .catch(error => console.log(error))

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: ['https://travel-catalog.netlify.app', 'http://localhost:3000']}))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

export {app}

//user api
require('./api/user/login')()
require('./api/user/logout')()
require('./api/user/register')()
require('./api/user/auth')()
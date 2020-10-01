import {auth} from "./server/api/user/auth";
import {login} from "./server/api/user/login";
import {register} from "./server/api/user/register";
import {logout} from "./server/api/user/logout";

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const {user, password, db} = require('./server/database/connection/dev') //dev database connection
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

app.use(express.json(), cookieParser())
app.use(cors({credentials: true, origin: ['https://drew24n.github.io', 'http://localhost:3000']}))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

export {app}

//User API
register()
login()
auth()
logout()
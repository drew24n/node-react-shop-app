const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const login = require('./api/user/login')
const auth = require('./api/user/auth')
const logout = require('./api/user/logout')
const register = require('./api/user/register')

const {env: {MONGO_URI}} = require('./config')
const PORT = process.env.PORT || 5000
const whiteList = ['https://travel-catalog.netlify.app', 'http://localhost:3000']

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: whiteList}))
app.use(auth, logout, register, login)

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
    })
    .catch(error => console.log(error))
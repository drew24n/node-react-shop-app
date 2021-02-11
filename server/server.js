const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const {env: {MONGO_URI}} = require('./config')
const PORT = process.env.PORT || 5000
const whiteList = ['https://travel-catalog.netlify.app', 'http://localhost']

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: whiteList}))
app.use('/api/user', require('./routes/userRoutes'))

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('database connected'))
    .then(() => app.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
    .catch(error => console.log(error))

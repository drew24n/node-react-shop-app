const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'Name min length is 3 symbols'],
        maxlength: [25, 'Name max length is 25 symbols'],
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
        minlength: [3, 'Last name min length is 3 symbols'],
        maxlength: [25, 'Last name max length is 25 symbols'],
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        maxlength: [35, 'Email max length is 35 symbols'],
        trim: true,
        unique: [true, 'This email is already taken'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: [5, 'Password min length is 5 symbols'],
        maxlength: [65, 'Password max length is 65 symbols'],
        required: [true, 'Password is required']
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//encrypt password
userSchema.pre('save', function (next) {
    let user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function (error, salt) {
            if (error) return next(error)
            bcrypt.hash(user.password, salt, function (error, hash) {
                if (error) return next(error)
                user.password = hash
                next()
            })
        })
    } else next()
})

//compare passwords
userSchema.methods.comparePassword = function (plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, function (error, match) {
        if (error) return callback(error)
        callback('', match)
    })
}

//generate token
userSchema.methods.generateToken = function (callback) {
    let user = this
    user.token = jwt.sign(user.id.toString(), 'secret')
    user.save((error, user) => {
        if (error) return callback(error)
        callback('', user)
    })
}

userSchema.statics.findByToken = function (token, callback) {
    let user = this
    jwt.verify(token, 'secret', function (error, decode) {
        user.findOne({"_id": decode, "token": token}, function (error, user) {
            if (error) return callback(error)
            callback('', user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: true
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: true
    },
    email: {
        type: String,
        maxlength: 35,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 65,
        required: true
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

//custom method - compare passwords
userSchema.methods.comparePassword = function (plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, function (error, match) {
        if (error) return callback(error)
        callback('', match)
    })
}

//custom method - generate token
userSchema.methods.generateToken = function (callback) {
    let user = this
    user.token = jwt.sign(user._id.toString(), 'secret')
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

export const User = mongoose.model('User', userSchema)
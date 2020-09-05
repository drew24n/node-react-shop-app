const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 50
    },
    lastName: {
        type: String,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 50
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

const User = mongoose.model('User', userSchema)

module.exports = User
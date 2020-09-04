import {mongoose} from "../../index";

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

const User = mongoose.model('User', userSchema)

module.exports = {User}
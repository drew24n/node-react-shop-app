const {Router} = require('express')
const User = require('../../models/user')

const userRoute = Router()

userRoute.post('/api/user/register', (req, res) => {
    const user = new User(req.body)
    User.findOne({email: req.body.email}, (error, doc) => {
        if (error) return res.status(200).json({success: false, message: error.message})
        if (doc && doc.email === req.body.email) {
            return res.status(200).json({success: false, message: 'Email is already taken'})
        }
        let validationError = user.validateSync()
        if (validationError) return res.status(200).json({
            success: false,
            message: validationError.errors[Object.keys(validationError.errors)[0]].message
        })
        user.save()
        res.status(200).json({success: true, message: `User ${req.body.name} is registered. You can login now`})
    })
})

module.exports = userRoute
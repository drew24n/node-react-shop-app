const {Router} = require('express')
const User = require('../../models/user')
const authMiddleware = require('../../middleware/authMiddleware')

const userRoute = Router()

userRoute.get('/api/user/logout', authMiddleware, (req, res) => {
    User.findOneAndUpdate({id: req.body.user.id}, {token: ''}, {},(error) => {
        if (error) return res.status(200).json({success: false, error})
        return res.status(200).send({success: true, message: 'Logged out'})
    })
})

module.exports = userRoute
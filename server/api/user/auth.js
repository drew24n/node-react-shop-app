const {Router} = require('express')
const authMiddleware = require('../../middleware/authMiddleware')

const userRoute = Router()

userRoute.get('/api/user/auth', authMiddleware, (req, res) => {
    res.status(200).json({
        isAuthorized: true,
        id: req.body.user.id,
        email: req.body.user.email,
        name: req.body.user.name,
        lastName: req.body.user.lastName,
        role: req.body.user.role
    })
})

module.exports = userRoute
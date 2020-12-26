const {Router} = require('express')
const {User} = require('../models/userModel')
const {authMiddleware} = require('../middleware/authMiddleware')

const router = Router()

router.post('/register', (req, res) => {
    const user = new User(req.body)
    User.findOne({email: req.body.email}, async (error, doc) => {
        if (error) return res.status(200).json({success: false, message: error.message})
        if (doc && doc.email === req.body.email) {
            return res.status(200).json({success: false, message: 'Email is already taken'})
        }
        let validationError = user.validateSync()
        if (validationError) return res.status(200).json({
            success: false,
            message: validationError.errors[Object.keys(validationError.errors)[0]].message
        })
        await user.save()
        res.status(200).json({success: true, message: `User ${req.body.name} is registered.`})
    })
})

router.post('/login', (req, res) => {
    //find email in database
    User.findOne({email: req.body.email}, (error, user) => {
        if (!user) return res.status(200).json({success: false, message: 'Wrong email or password'})
        //compare password with database
        user.comparePassword(req.body.password, (error, match) => {
            if (!match) return res.status(200).json({success: false, message: 'Wrong email or password'})
            //if passwords match - create token
            user.generateToken((error, user) => {
                if (error) return res.status(200).send(error)
                res.cookie('token', user.token, process.env.PORT
                    ? {sameSite: 'none', secure: true, httpOnly: true}
                    : {}
                ).status(200).json({success: true, message: 'Logged in'})
            })
        })
    })
})

router.get('/auth', authMiddleware, (req, res) => {
    res.status(200).json({
        isAuthorized: true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role
    })
})

router.get('/logout', authMiddleware, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, {}, (error) => {
        if (error) return res.status(200).json({success: false, error})
        return res.status(200).send({success: true, message: 'Logged out'})
    })
})

module.exports = router
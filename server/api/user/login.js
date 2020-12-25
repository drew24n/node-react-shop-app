const {Router} = require('express')
const User = require('../../models/user')

const userRoute = Router()

userRoute.post('/api/user/login', (req, res) => {
    //find email in database
    User.findOne({email: req.body.email}, (error, user) => {
        if (!user) return res.status(200).json({success: false, message: 'Wrong email or password'})
        //compare password with database
        user.comparePassword(req.body.password, (error, match) => {
            if (!match) return res.status(200).json({success: false, message: 'Wrong email or password'})
            //if passwords match - create token
            user.generateToken((error, user) => {
                if (error) return res.status(200).send(error)
                res.cookie('token', user.token,
                    {sameSite: 'none', secure: true, httpOnly: true}
                ).status(200).json({success: true, message: 'Logged in'})
            })
        })
    })
})

module.exports = userRoute
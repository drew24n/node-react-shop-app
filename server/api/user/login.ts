import {app} from "../../index";

const User = require('../../database/models/user')

const login = () => {
    app.post('/api/user/login', (req, res) => {
        //find email in database
        User.findOne({email: req.body.email}, (error, user) => {
            if (!user) return res.status(401).json({success: false, message: 'Wrong email or password'})
            //compare password with database
            user.comparePassword(req.body.password, (error, match) => {
                if (!match) return res.status(401).json({success: false, message: 'Wrong email or password'})
                //if passwords match - create token
                user.generateToken((error, user) => {
                    if (error) return res.status(500).send(error)
                    res.cookie('token', user.token).status(200).json({success: true, message: 'Login successful'})
                })
            })
        })
    })
}

module.exports = login
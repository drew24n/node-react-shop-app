import {app} from "../../index";

const User = require('../../database/models/user')

const register = () => {
    app.post('/api/user/register', async (req, res) => {
        const user = new User(req.body)
        try {
            await user.save()
            res.status(201).json({success: true, message: `User ${req.body.name} is registered!`})
        } catch (error) {
            res.status(500).json({success: false, message: `Unable to register user. ${error}`})
        }
    })
}

module.exports = register
import {app} from "../../server";

const {authMiddleware} = require('../../middleware/authMiddleware')
const {User} = require('../../models/user')

function logout() {
    app.get('/api/user/logout', authMiddleware, (req, res) => {
        User.findOneAndUpdate({id: req.user.id}, {token: ''}, (error, doc) => {
            if (error) return res.status(200).json({success: false, error})
            return res.status(200).send({success: true, message: 'Logged out'})
        })
    })
}

module.exports = logout
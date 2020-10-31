import {app} from "../../server";

const {authMiddleware} = require('../../middleware/authMiddleware')

function auth() {
    return app.get('/api/user/auth', authMiddleware, (req, res) => {
        res.status(200).json({
            isAuthorized: true,
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            lastName: req.user.lastName,
            role: req.user.role
        })
    })
}

module.exports = auth
const User = require('../models/user')

function authMiddleware(req, res, next) {
    let token = req.cookies.token
    User.findByToken(token, (error, user) => {
        if (error) return error
        if (!user) return res.status(200).json({isAuthorized: false})
        req.token = token
        req.user = user
        next()
    })
}

module.exports = authMiddleware
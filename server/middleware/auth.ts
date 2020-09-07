import {User} from "../database/models/user";

export const authMiddleware = (req, res, next) => {
    let token = req.cookies.token
    User.findByToken(token, (error, user) => {
        if (error) return error
        if (!user) return res.status(401).json({success: false, message: 'Not authorized'})
        req.token = token
        req.user = user
        next()
    })
}
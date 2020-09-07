import {app} from "../../index";
import {User} from "../../database/models/user";
import {authMiddleware} from "../../middleware/authMiddleware";

export const logout = () => {
    app.get('/api/user/logout', authMiddleware, (req, res) => {
        User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (error, doc) => {
            if (error) return res.status(500).json({success: false, error})
            return res.status(200).send({success: true, message: 'Logged out'})
        })
    })
}
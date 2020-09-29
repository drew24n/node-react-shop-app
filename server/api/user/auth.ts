import {app} from "../../../index";
import {authMiddleware} from "../../middleware/authMiddleware";

export const auth = () => {
    app.get('/api/user/auth', authMiddleware, (req, res) => {
        res.status(200).json({
            _id: req._id,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastName: req.user.lastName,
            role: req.user.role
        })
    })
}
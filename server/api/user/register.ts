import {app} from "../../../index";
import {User} from "../../database/models/user";

export const register = () => {
    app.post('/api/user/register', (req, res) => {
        const user = new User(req.body)
        User.findOne({email: req.body.email}, (error, doc) => {
            if (error) return res.status(200).json({success: false, message: error.message})
            if (doc && doc.email === req.body.email) {
                return res.status(200).json({success: false, message: 'Email is already taken'})
            }
            const validationError = user.validateSync()
            if (validationError) return res.status(200).json({success: false, message: validationError.message})
            user.save()
            res.status(200).json({success: true, message: `User is registered`})
        })
    })
}
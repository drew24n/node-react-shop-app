import {app} from "../../../index";
import {User} from "../../database/models/user";

export const register = () => {
    app.post('/api/user/register', async (req, res) => {
        const user = new User(req.body)
        try {
            User.findOne({email: req.body.email}, async (error, email) => {
                if (email && email._doc.email === req.body.email) {
                    return res.status(200).json({success: false, message: 'Email is already taken'})
                } else {
                    await user.save()
                    res.status(201).json({success: true, message: `User is registered`})
                }
            })
        } catch (error) {
            res.status(201).json({success: false, message: `Unable to register user`})
        }
    })
}
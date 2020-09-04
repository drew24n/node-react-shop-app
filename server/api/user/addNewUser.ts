import {app} from "../../index";
const {User} = require('../../database/models/user')

export const addNewUser = () => {
    app.post('/api/users/register', async (req, res) => {
        const user = new User(req.body)
        try {
            await user.save()
            res.status(201).json(`User '${req.body.name}' added!`)
        } catch (error) {
            res.status(500).json(`Unable to add user. Error: ${error}.`)
        }
    })
}
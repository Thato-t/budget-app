import express from 'express';
import Users from '../models/user.js'

const userRoutes = express.Router();

userRoutes.post('/', async (req, res) => {
    const {username} = req.body;
    console.log(req.body)
    const user = await Users.findOne({username})
    console.log(user)
    if(user){
        console.log(`${user} is already taken try another name`)
    }else{
        try {
            const newUser = new Users({ username});
            newUser.save();
            res.status(201).json(userRoutes);
        } catch (error) {
            res.status(500).json({error: err.message})
        }
    }
})

export default userRoutes
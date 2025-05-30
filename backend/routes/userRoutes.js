import express from 'express';
import Users from '../models/user.js'

const userRoutes = express.Router();
let usernames;

userRoutes.post('/', async (req, res) => {
    const {username} = req.body;
    usernames = username
    console.log(usernames)
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

userRoutes.delete('/', async (req, res) => {
    let username = usernames
    console.log(username)
    const deleteUser = await Users.findOneAndDelete({username})
    try {
        if(!deleteUser){
            res.status(500).json({ message: 'User not found'})
        }
        res.status(200).json({ message: `${deleteUser} deleted`})
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error})
    }
})

export default userRoutes
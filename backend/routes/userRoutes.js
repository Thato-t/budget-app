import express from 'express';
import {LocalStorage} from 'node-localstorage';
import Users from '../models/user.js'
import Logs from '../models/log.js'

const userRoutes = express.Router();
const localStorage = new LocalStorage('../scratch');

userRoutes.post('/', async (req, res) => {
    // let count = 0;
    const {username} = req.body;
    // let newUser;
    try {
        // const checking = await Users.find({username})
        // console.log(checking)
        // if (checking.length === 0){
        //     newUser = await new Users({ username, count});
        // } else{
        //     if (checking.count === count){
        //         for (let i = 0; i < checking.length; i++){
        //             let count = i 
        //             newUser = await new Users({ username, count})
        //         }
        //     }
        // }
        const newUser = await new Users({ username })
        await newUser.save();
        localStorage.setItem('username', username)
        console.log(newUser)
        res.status(201).json({ newUser })
    } catch (error) {
        console.error('found error', error)
        res.status(500).json({error: error})
    }
    
})

userRoutes.get('/home/users/user', async (req, res) => {
    const username = localStorage.getItem('username');
    const pin = localStorage.getItem('pin');
    console.log(pin)
    let newName;
    try {
        let newName = await Logs.findOne({ pin })
        console.log(newName)
        if (pin){
            res.status(201).json({newName})
            return
        }
        const name = await Users.findOne({ username });
        console.log(name)
        if (!username.includes(/\d+/) && name.username === username){
            const id = name._id.toString()
            const lastCharId = id.slice(-4);
            const pin = name.username + lastCharId;
            localStorage.setItem('pin', pin)
            newName = await new Logs({ username, pin }); 
            await newName.save();
            res.status(201).json({newName});
        }
    } catch (error) {
        console.error('Found error', error);
        res.status(500).json({ error: error})
    }
    
})

userRoutes.delete('/settings/users/:username', async (req, res) => {
    const pin = localStorage.getItem('pin');
    console.log(pin)
    const deleteUser = await Users.findOneAndDelete({ pin })
    const deleteLog = await Logs.findOneAndDelete({ pin })
    try {
        if(!deleteUser && !deleteLog){
            console.log(`${deleteUser.pin} not found`)
            res.status(404).json({ message: 'User not found'})
        }else{
            await deleteLog.drop()
            console.log(`${deleteUser.pin} deleted`)
            res.status(204).json({ message: `${deleteUser} deleted`})
        }

    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error})
    }
})

export default userRoutes
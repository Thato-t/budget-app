import express from 'express';
import Logs from '../models/log.js'

const userRoutes = express.Router();



// creating new user account
userRoutes.post('/:email', async (req, res) => {
    const {email, username} = req.body;
    try{
        const userExisit = await Logs.findOne({ email });
        if(userExisit){
            console.log(`${userExisit.email} found`);
            const user = userExisit;
            res.status(200).json({user});
            return
        }else{
            console.log(`${email} not found`);
        }
    }catch(error){
        console.error('Error found', error);
        res.status(404).json(error)
    }
    try {
        const newUser = await new Logs({ username, email })
        await newUser.save();
        console.log(`${newUser} created`);
        res.status(201).json({ newUser });
    } catch (error) {
        console.error('found error', error);
        res.status(500).json({error: error});
    }
    
})

// login in and checking if user exists
userRoutes.get('/users/:email', async (req, res) => {
    const paramsPin = req.params.email;
    try{
        const findUsername = await Logs.findOne({paramsPin});
        if (!findUsername){
            const errMsg = `${paramsPin} not found`;
            console.log(errMsg);
            res.status(200).json({ errMsg });
        }else{
            const found = `${paramsPin} found`;
            console.log(findUsername, 'found');
            res.status(200).json({ found });
        }
    }catch (error){
        console.log('Error found: ', error);
        res.status(500).json(error);
    }

})

// fetching user
userRoutes.get('/emails/:email', async (req, res) => {
    const email = req.params.email;
    try{
        const findUsername = await Logs.findOne({email});
        console.log(findUsername)
        if (!findUsername){
            const errMsg = `${email} doesn't exist`;
            console.log(errMsg);
            res.status(200).json({ errMsg });
            return
        }else{
            console.log(findUsername, 'found');
            const user = findUsername;
            res.status(200).json({ user });
            return
        }
    }catch (error){
        console.log('Error found: ', error);
        res.status(500).json(error);
    }

})
// Delete users account 
userRoutes.delete('/user/delete/:email', async (req, res) => {
    const email = req.params.email;
    const deleteLog = await Logs.findOne({ email });
    try {
        if(!deleteLog){
            console.log(`${username} not found`);
            res.status(404).json('User not found');
        }else{
            await Logs.findOneAndDelete({ email });
            console.log(`user deleted`);
            res.status(204);
        }
        
    } catch (error) {
        res.status(500).json('Error deleting user', error)
    }
})


export default userRoutes
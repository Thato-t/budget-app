import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    count: Number
})

const Users = mongoose.model('Users', userSchema);

export default Users;
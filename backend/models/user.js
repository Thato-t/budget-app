import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: string, required: true}
})

const users = mongoose.model('Users', userSchema);
users.save()

module.exports = users;
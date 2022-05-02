const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    firstName: String,
    lastName: String,
    email: String,
    photo: String,
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'events'
        }
    ]
});

const User = mongoose.model('users', userSchema);

module.exports = User;
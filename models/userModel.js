const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { name: String, type: String },
    password: { name: String, type: String },
    roleId: { name: String, type: String } || undefined
});

module.exports = mongoose.model('User', userSchema, 'Users');
module.exports = userSchema;

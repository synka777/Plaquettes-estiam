const mongoose = require('mongoose');
const { Schema } = mongoose;
const permission = require('./permissionModel')

const roleSchema = new Schema({
    name: { name: String, type: String },
    permissionsId: [{ name: String, type: String }]
});

module.exports = mongoose.model('Role', roleSchema, 'Roles');
module.exports = roleSchema;
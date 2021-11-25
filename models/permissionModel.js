const mongoose = require('mongoose');
const { Schema } = mongoose;

const permission = new Schema({
    resourceName: { name: String, type: String },
    accessRight: { name: 'R', type: String }||{ name: 'W', type: String }
});

module.exports = mongoose.model('Permission', permission, 'Permissions');
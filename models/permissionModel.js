const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionSchema = new Schema({
    resourceName: { name: String, type: String },
    accessRight: { name: 'R', type: String }||{ name: 'W', type: String }
});

module.exports = mongoose.model('Permission', permissionSchema, 'Permissions');
module.exports = permissionSchema;
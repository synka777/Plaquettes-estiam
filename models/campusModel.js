const mongoose = require('mongoose');
const { Schema } = mongoose;

const campusSchema = new Schema({
    city: { name: String, type: String },
    description: { name: String, type: String },
    image: { name: String, type: String } || undefined
});

module.exports = mongoose.model('Campus', campusSchema, 'Campuses');
module.exports = campusSchema;

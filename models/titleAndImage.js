const mongoose = require('mongoose');
const { Schema } = mongoose;

const titleAndImageSchema = new Schema({
    name: { name: String, type: String },
    logo: { name: String, type: String }
});

module.exports = mongoose.model('Partner', titleAndImageSchema, 'Partners');
module.exports = mongoose.model('Technology', titleAndImageSchema, 'Technologies');
module.exports = mongoose.model('Certification', titleAndImageSchema, 'Certifications');
module.exports = titleAndImageSchema;

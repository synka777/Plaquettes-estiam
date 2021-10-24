const mongoose = require('mongoose');
const { Schema } = mongoose;

const PartnerSchema = new Schema({
    name: String,
    logo: String
});

module.exports = mongoose.model('Partner', PartnerSchema, 'Partners');




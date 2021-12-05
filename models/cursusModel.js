const mongoose = require('mongoose');
const { Schema } = mongoose;

const cursusSchema = new Schema({
    cursusName: { name: String, type: String },
    description: { name: String, type: String },
    courseNames: [{ name: String, type: String }],
    year: { name: 4, type: Number } || { name: 5, type: Number}
});

module.exports = mongoose.model('Cursus', cursusSchema, 'Cursuses');
module.exports = cursusSchema;

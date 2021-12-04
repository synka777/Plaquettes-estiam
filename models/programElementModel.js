const mongoose = require('mongoose');
const { Schema } = mongoose;

const programElementSchema = new Schema({
    name: { name: String, type: String },
    logo: { name: String, type: String }
});

module.exports = mongoose.model('ClassYearElem', programElementSchema, 'ClassYearElems');
module.exports = mongoose.model('BaseProgramElem', programElementSchema, 'BaseProgramElems');
module.exports = mongoose.model('SpecialtyElem', programElementSchema, 'SpecialtyElems');
module.exports = programElementSchema;

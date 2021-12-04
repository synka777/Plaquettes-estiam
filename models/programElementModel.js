const mongoose = require('mongoose');
const { Schema } = mongoose;

const programElementSchema = new Schema({
    mainName: { name: String, type: String },
    composition: [{
        title: { name: String, type: String },
        durations: [{
            durationName: { name: String, type: String },
            duration: { name: String, type: Number }
        }]
    }],
    year: { name: String, type: Number }
});

module.exports = mongoose.model('ClassYearElem', programElementSchema, 'ClassYearElems');
module.exports = mongoose.model('BaseProgramElem', programElementSchema, 'BaseProgramElems');
module.exports = mongoose.model('SpecialtyElem', programElementSchema, 'SpecialtyElems');
module.exports = programElementSchema;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const titleAndImageSchema = new Schema({
    name: { name: String, type: String },
    logo: { name: String, type: String }
});

/* Ce fichier ne sert qu'à définir les propriétés du modèle de document simple titleAndImage.
Les opérations de manipulation de ce modèle sont gérées par le controller associé,
présent dans le répertoire controllers */

module.exports = mongoose.model('Partner', titleAndImageSchema, 'Partners');
module.exports = mongoose.model('Technology', titleAndImageSchema, 'Technologies');
module.exports = mongoose.model('Certification', titleAndImageSchema, 'Certifications');
module.exports = titleAndImageSchema;

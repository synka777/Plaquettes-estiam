const mongoose = require('mongoose');
const { Schema } = mongoose;

const PartnerSchema = new Schema({
    id: null || String,
    name: String,
    logo: String
});

/* Ce fichier ne sert qu'à définir les propriétés du modèle partner.
Les opérations de manipulation de ce modèle sont gérées par le controller associé,
présent dans le répertoire controllers */

module.exports = mongoose.model('Partner', PartnerSchema, 'Partners');




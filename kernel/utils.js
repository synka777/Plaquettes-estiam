const mongoose = require('mongoose');
const PartnerModel = require("../models/partner")


module.exports.objectToPartner = function(partner, createId) {
    const newPartner = new PartnerModel();
    createId ? newPartner._id = (String((String(new mongoose.Types.ObjectId()).split('"')))) : partner._id
    newPartner.name = partner.name || undefined;
    newPartner.logo = partner.logo || undefined;
    return newPartner;
}
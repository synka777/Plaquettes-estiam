const mongoose = require('mongoose');
const PartnerModel = require("../models/partner")


module.exports.objectToPartner = function(partner, createId) {
    const newPartner = new PartnerModel();
    createId ? newPartner._id = new mongoose.Types.ObjectId() : undefined
    newPartner.name = partner.name || undefined;
    newPartner.logo = partner.logo || undefined;
    return newPartner;
}
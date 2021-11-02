const PartnerModel = require("../models/partner")



module.exports.objectToPartner = function(partner) {
    const newPartner = new PartnerModel();
    newPartner.name = partner.name || '';
    newPartner.logo = partner.logo || '';
    return newPartner;
}


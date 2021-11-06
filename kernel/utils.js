const PartnerModel = require("../models/partner")



module.exports.objectToPartner = function(partner) {
    const newPartner = new PartnerModel();
    newPartner.name = partner.name || undefined;
    newPartner.logo = partner.logo || undefined;
    return newPartner;
}

/* module.exports.objectToPartner = function(partner) {
    const newPartner = new PartnerModel();
    newPartner.name = partner.name || undefined;
    newPartner.logo = partner.logo || undefined;
    return newPartner;
} */
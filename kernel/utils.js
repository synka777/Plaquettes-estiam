const mongoose = require('mongoose');
const {PartnerModel, TechnologyModel, CertificationModel}  = require("../models/titleAndImage")


module.exports.objectToTitleAndImage = function(object, createId) {
    const newObject = {};
    //if(createId){newObject._id = (String((String(new mongoose.Types.ObjectId()).split('"'))))}
    if(object.name){
        createId ? newObject._id = (String((String(new mongoose.Types.ObjectId()).split('"')))) : object._id
        newObject.name = object.name || undefined;
        object.logo?newObject.logo = object.logo || undefined : undefined
    }
    return newObject;
    /* const newPartner = {};
    createId ? newPartner._id = (String((String(new mongoose.Types.ObjectId()).split('"')))) : object._id
    newPartner.name = object.name || undefined;
    newPartner.logo = object.logo || undefined;
    return newPartner; */
}

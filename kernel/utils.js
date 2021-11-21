const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const {PartnerModel, TechnologyModel, CertificationModel}  = require("../models/titleAndImage")

module.exports.jwtKey = 'my_secret_key'

module.exports.objectToTitleAndImage = function(object, createId) {
    const newObject = {};
    //if(createId){newObject._id = (String((String(new mongoose.Types.ObjectId()).split('"'))))}
    if(object.name){
        createId ? newObject._id = (String((String(new mongoose.Types.ObjectId()).split('"')))) : object._id
        newObject.name = object.name || undefined;
        object.logo ? newObject.logo = object.logo || undefined : undefined
    }
    return newObject;
    /* const newPartner = {};
    createId ? newPartner._id = (String((String(new mongoose.Types.ObjectId()).split('"')))) : object._id
    newPartner.name = object.name || undefined;
    newPartner.logo = object.logo || undefined;
    return newPartner; */
}

module.exports.verifyToken = (res, jwtKey, token) => {
    try {
        const payload = jwt.verify(token, jwtKey)
        return payload
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
    }
}
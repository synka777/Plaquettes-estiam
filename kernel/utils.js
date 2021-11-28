const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const {PartnerModel, TechnologyModel, CertificationModel}  = require("../models/titleAndImage")

module.exports.jwtKey = 'my_secret_key'

module.exports.verifyToken = (res, jwtKey, token) => {
    try {
        return jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
    }
}

module.exports.getModelProperties = (modelName, exclusions) => {
	const newModel = mongoose.model(modelName);
	let properties = [];
	newModel.schema.eachPath(property => properties.push(property))
	return properties.filter((value) => {
		return !exclusions.includes(value) ? value : undefined
	})
}

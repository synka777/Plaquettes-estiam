const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const {PartnerModel, TechnologyModel, CertificationModel}  = require("../models/titleAndImage")
const baseController = require('../controllers/baseController')

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

module.exports.accessGranted = async(token, resourceType) => {
	const decodedToken = jwt.verify(token, this.jwtKey)
	const userReq = { username: decodedToken.username }
	let permissionReq
	await baseController.readDocuments(userReq, 'User', ['password','__v']).then(resp => {
		if(resp.status==200 && resp.data.roleId!=''){ permissionReq = { _id: resp.data[0].roleId }}
	})
	let permissionId
	await baseController.readDocuments(permissionReq, 'Role', ['name','__v']).then(resp => {
		if(resp.status==200){
			resp.data[0].permissionsId.filter((permId)=>{ permissionId = { _id: permId }})
		}
	})
	return await baseController.readDocuments(permissionId, 'Permission', ['resourceName','accessRight','__v']).then(resp => {
		if(resp.status == 200 && resp.data[0].resourceName == resourceType){
			return resp.data[0].accessRight
		}
	})
}
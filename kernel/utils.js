const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const baseController = require('../controllers/baseController')

module.exports.jwtKey = 'my_secret_key'
module.exports.defaultAdmin = {
    admUsername: 'origin',
    admPasswd: 'h4xx0rz!'
}

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
	if(decodedToken.username == this.defaultAdmin.admUsername){
		return "W"
	}
	let permissionReq // Récupération de l'utilisateur par username
	await baseController.readDocuments(userReq, 'User', ['password','__v']).then(resp => {
		if(resp.status==200 && resp.data.roleId!=''){ permissionReq = { _id: resp.data[0].roleId }}
	})
	let permissionId // Récupération du rôle associé à l'utilisateur par son ID
	await baseController.readDocuments(permissionReq, 'Role', ['name','__v']).then(resp => {
		if(resp.status==200){
			resp.data[0].permissionsId.filter((permId)=>{ permissionId = { _id: permId }})
		}
	}) // Si le rôle comporte une permission All (Permission donnant accès à toute ressource), on return la valeur
	return await baseController.readDocuments(permissionId, 'permission', ['resourceName','accessRight','__v']).then(resp => {
		if(resp.status == 200 && resp.data[0].resourceName == "All"){
			return resp.data[0].accessRight
		}
	}) // Sinon si pas de permission all, voir si la permission donne accès à la ressource
	return await baseController.readDocuments(permissionId, 'Permission', ['resourceName','accessRight','__v']).then(resp => {
		if(resp.status == 200 && resp.data[0].resourceName == resourceType){
			return resp.data[0].accessRight
		}
	})
}
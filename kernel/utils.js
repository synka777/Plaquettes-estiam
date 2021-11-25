const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const {PartnerModel, TechnologyModel, CertificationModel}  = require("../models/titleAndImage")

module.exports.jwtKey = 'my_secret_key'

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
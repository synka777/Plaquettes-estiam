const express = require("express");
const router = express.Router();
const utils = require('../kernel/utils.js');
const baseController = require("../controllers/baseController");
const userSchema = require("../models/userModel")

router.get('/', (req, res) => {
    res.write('Users');
    res.write(`
        Pour tester l'API, utiliser Postman, Insomnia ou autre moyen
        permettant d'inclure un body avec les requetes HTTP.
    `);
    res.send();
})

router.post('/create', (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).end()
    const payload = utils.verifyToken(res, utils.jwtKey, token)
    if(payload.status){ 
        res.end()
        return payload.status 
    }
    baseController.createDocument(req.body, 'User', ['_id','__v'], titleAndImageSchema).then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

router.get('/read', (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).end()
    const payload = utils.verifyToken(res, utils.jwtKey, token)
    if(payload.status){ 
        res.end()
        return payload.status 
    }
    baseController.readDocuments(req.body, 'User', ['_id','__v']).then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

router.post('/update', (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).end()
    const payload = utils.verifyToken(res, utils.jwtKey, token)
    if(payload.status){ 
        res.end()
        return payload.status 
    }
    baseController.updateDocument(req.body, 'User').then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

router.post('/delete', (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).end()
    const payload = utils.verifyToken(res, utils.jwtKey, token)
    if(payload.status){ 
        res.end()
        return payload.status 
    }
    baseController.deleteDocuments(req.body, 'User').then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

module.exports = router;
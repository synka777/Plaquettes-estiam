const express = require("express");
const router = express.Router();
const utils = require('../kernel/utils.js');
const baseController = require("../controllers/baseController");
const roleSchema = require("../models/roleModel")

router.get('/', (req, res) => {
    res.write('Roles');
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
    baseController.createDocument(req.body, 'Role', ['logo','_id','__v'], roleSchema).then(resp => {
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
    baseController.readDocuments(req.body, 'Role', ['_id','__v']).then(resp => {
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
    baseController.updateDocument(req.body, 'Role').then(resp => {
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
    baseController.deleteDocuments(req.body, 'Role').then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

module.exports = router;
const express = require("express");
const router = express.Router();
const utils = require('../kernel/utils.js');
const baseController = require("../controllers/baseController");
const campusSchema = require("../models/campusModel")

const resource = 'Campus';  

router.get('/', (req, res) => {
    res.write('Campus');
    res.write(`
        Pour tester l'API, utiliser Postman, Insomnia ou autre moyen
        permettant d'inclure un body avec les requetes HTTP.
    `);
    res.send();
})

router.post('/create', async(req, res) => {
    const token = req.cookies.token
    try{
        const payload = utils.verifyToken(res, utils.jwtKey, token)
        if(payload.status){ 
            res.end()
            return payload.status 
        }
        const authorized = await utils.accessGranted(token, resource)
        if(!authorized||authorized==''||authorized=='R') return res.status(401).end()
    }catch(e){
        return res.status(401).end()
    }
    baseController.createDocument(req.body, resource, ['_id','__v'], campusSchema).then(resp => {
        if(resp.statusMessage){ res.statusMessage = resp.statusMessage }
        if(resp.data){(res.write(JSON.stringify(resp.data)))}
        res.status(Number(resp.status))
        res.send();
    })
});

router.get('/read', async(req, res) => {
    const token = req.cookies.token
    try{
        const payload = utils.verifyToken(res, utils.jwtKey, token)
        if(payload.status){ 
            res.end()
            return payload.status 
        }
        const authorized = await utils.accessGranted(token, resource)
        if(!authorized||authorized=='') return res.status(401).end()
    }catch(e){
        return res.status(401).end()
    }
    baseController.readDocuments(req.body, resource, ['description','image','_id','__v']).then(resp => {
        if(resp.statusMessage){ res.statusMessage = resp.statusMessage }
        if(resp.data){(res.write(JSON.stringify(resp.data)))}
        res.status(Number(resp.status))
        res.send();
    })
});

router.post('/update', async(req, res) => {
    const token = req.cookies.token
    try{
        const payload = utils.verifyToken(res, utils.jwtKey, token)
        if(payload.status){ 
            res.end()
            return payload.status 
        }
        const authorized = await utils.accessGranted(token, resource)
        if(!authorized||authorized==''||authorized=='R') return res.status(401).end()
    }catch(e){
        return res.status(401).end()
    }
    baseController.updateDocument(req.body, resource).then(resp => {
        if(resp.statusMessage){ res.statusMessage = resp.statusMessage }
        if(resp.data){(res.write(JSON.stringify(resp.data)))}
        res.status(Number(resp.status))
        res.send();
    })
});

router.post('/delete', async(req, res) => {
    const token = req.cookies.token
    try{
        const payload = utils.verifyToken(res, utils.jwtKey, token)
        if(payload.status){ 
            res.end()
            return payload.status 
        }
        const authorized = await utils.accessGranted(token, resource)
        if(!authorized||authorized==''||authorized=='R') return res.status(401).end()
    }catch(e){
        return res.status(401).end()
    }
    baseController.deleteDocument(req.body, resource, ['description','image','_id','__v']).then(resp => {
        if(resp.statusMessage){ res.statusMessage = resp.statusMessage }
        if(resp.data){(res.write(JSON.stringify(resp.data)))}
        res.status(Number(resp.status))
        res.send();
    })
});

module.exports = router;
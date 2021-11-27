const express = require("express");
const router = express.Router();
const utils = require('../kernel/utils.js');
const titleAndImageController = require("../controllers/titleAndImageController");
const titleAndImageSchema = require("../models/titleAndImage")

/* Ce fichier sert à appeler les contrôleurs du mpodèle partner et présenter la donnée en réponse 
aux requêtes entrantes. La gestion d'accès se fera en appelant une fonction de contrôle d'accès
depuis chaque route de ce fichier */

router.get('/', (req, res) => {
    res.write('Partenaires');
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
    //console.log(utils.getModelProperties(titleAndImageSchema))
    titleAndImageController.createDocument(req.body, 'Partner', ['logo','_id','__v'], titleAndImageSchema).then(resp => {
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
    titleAndImageController.readDocuments(req.body, 'Partner', ['_id','__v']).then(resp => {
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
    titleAndImageController.updateDocument(req.body, 'Partner').then(resp => {
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
    titleAndImageController.deleteDocuments(req.body, 'Partner').then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

module.exports = router;
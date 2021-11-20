const express = require("express");
const app = express();
const router = express.Router();

const titleAndImageController = require("../controllers/titleAndImageController");

/* Ce fichier sert à appeler les contrôleurs du mpodèle certification et présenter la donnée en réponse 
aux requêtes entrantes. La gestion d'accès se fera en appelant une fonction de contrôle d'accès
depuis chaque route de ce fichier */

router.get('/', (req, res) => {
    res.write('Certifications');
    res.write(`
        Pour tester l'API, utiliser Postman, Insomnia ou autre moyen
        permettant d'inclure un body avec les requetes HTTP.
    `);
    res.send();
})

router.post('/create', (req, res) => {
    titleAndImageController.insertMultipleDocuments(req.body, 'Certification').then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

router.get('/read', (req, res) => {
    titleAndImageController.readDocuments(req.body, 'Certification').then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

router.post('/update', (req, res) => {
    titleAndImageController.updateDocument(req.body, 'Certification').then(resp => {
        res.write(JSON.stringify(resp));
        res.send();
    })
});

router.post('/delete', (req, res) => {
    titleAndImageController.deleteDocuments(req.body, 'Certification').then(resp => {
        console.log('got',resp)
        res.write(JSON.stringify(resp));
        res.send();
    })
});

module.exports = router;